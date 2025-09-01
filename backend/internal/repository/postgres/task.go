package postgres

import (
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

func (r *TaskRepo) CreateTask(tasks *base_models.Task) error {
	err := r.db.Create(tasks).Error
	if err != nil {
		return fmt.Errorf("error create user")
	}

	return nil
}
func (r *TaskRepo) GetTasks(class int, subject string) ([]api_models.GetTaskInfo, error) {
	var tasks []api_models.GetTaskInfo
	userID := "e736e663-e5b7-40dc-9ecb-c7956dd2b25d"

	result := r.db.
		Table("tasks").
		Select("tasks.uuid, tasks.name, tasks.description, tasks.tag, tasks.complexity, COALESCE(solveds.is_solved, false) as is_solved").
		Joins("LEFT JOIN solveds ON solveds.task_id::uuid = tasks.uuid AND solveds.user_id::uuid = ?", userID).
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
		Select("description, answer, solution, answer, source, photo").
		Where("uuid = ?", uuid).
		Find(&tasks)

	if result.Error != nil {
		log.Println("error get tasks:", result.Error)
		return nil, result.Error
	}

	return tasks, nil
}

func (r TaskRepo) CompleteTask(solved *base_models.Solved) error {
	err := r.db.Create(solved).Error
	if err != nil {
		return fmt.Errorf("error create user")
	}

	return nil
}
