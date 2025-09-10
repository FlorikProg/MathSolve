package postgres

import (
	"errors"
	"fmt"
	"log"
	api_models "math/internal/models/api_models"
	base_models "math/internal/models/base_models"

	"gorm.io/gorm"
)

type TaskRepo struct {
	db *gorm.DB
}

func NewTaskRepo(db *gorm.DB) *TaskRepo {
	return &TaskRepo{db: db}
}

func (r *TaskRepo) CreateTask(task *base_models.Task, user_id string) error {
	var existing base_models.Task
	err := r.db.Where("description = ?", task.Description).First(&existing).Error
	if err == nil {
		return fmt.Errorf("task with uuid %s already exists", task.UUID)
	}
	if err != gorm.ErrRecordNotFound {
		return err
	}

	var isAdmin bool
	err = r.db.
		Table("users").
		Select("is_admin").
		Where("uuid = ?", user_id).
		Scan(&isAdmin).Error
	if err != nil {
		return err
	}

	if err := r.db.Create(task).Error; err != nil {
		return fmt.Errorf("error create task: %w", err)
	}
	return nil
}

func (r *TaskRepo) GetTasks(class int, subject, user_id string) ([]api_models.GetTaskInfo, error) {
	var tasks []api_models.GetTaskInfo

	result := r.db.
		Table("tasks").
		Select("tasks.uuid, tasks.name, tasks.description, tasks.tag, tasks.complexity, COALESCE(solveds.is_solved, false) as is_solved").
		Joins("LEFT JOIN solveds ON solveds.task_id::uuid = tasks.uuid AND solveds.user_id::uuid = ?", user_id).
		Where("tasks.school_class = ? AND tasks.subject = ?", class, subject).
		Scan(&tasks)

	if result.Error != nil {
		log.Println("error get tasks:", result.Error)
		return nil, result.Error
	}

	return tasks, nil
}

func (r TaskRepo) GetFullTaskInfo(uuid string) ([]base_models.Task, error) {
	var tasks []base_models.Task
	result := r.db.
		Select("description, answer, solution, source, photo, school_class, subject").
		Where("uuid = ?", uuid).
		Find(&tasks)

	if result.Error != nil {
		log.Println("error get tasks:", result.Error)
		return nil, result.Error
	}

	return tasks, nil
}

func (r TaskRepo) CompleteTask(solved *base_models.Solved) error {
	var existing base_models.Solved
	err := r.db.Where("task_id = ? AND user_id = ?", solved.TaskID, solved.User_id).First(&existing).Error
	if err == nil {
		return fmt.Errorf("user %s already solved task %s", solved.User_id, solved.TaskID)
	}
	if err != gorm.ErrRecordNotFound {
		return err
	}

	if err := r.db.Create(solved).Error; err != nil {
		return fmt.Errorf("error create solved: %w", err)
	}
	return nil
}

func (r TaskRepo) IsTaskSolved(userID, uuid string) (bool, error) {
	var task base_models.Solved
	result := r.db.
		Select("is_solved").
		Where("task_id = ? AND user_id = ?", uuid, userID).
		First(&task)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return false, nil
		}
		log.Println("error get task:", result.Error)
		return false, result.Error
	}

	return task.Is_solved, nil
}
