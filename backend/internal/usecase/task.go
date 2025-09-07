package usecase

import (
	"errors"
	api_models "math/internal/models/api_models"
	models "math/internal/models/base_models"
	"math/internal/repository"
	"strings"
)

type TaskUsecase interface {
	CreateTaskUsecase(task *models.Task, user_id string) error
	GetTaskUsecase(class int, subject, user_id string) ([]api_models.GetTaskInfo, error)
	GetFullInfoAboutTaskUsecase(uuid string) ([]models.Task, error)
	CompleteTaskUsecase(solved *models.Solved) error
	IsTaskSolvedUsecase(user_id, uuid string) (bool, error)
}

type TaskUseCase struct {
	repo repository.Task
}

func NewTaskUseCase(repo repository.Task) *TaskUseCase {
	return &TaskUseCase{repo: repo}
}

func (u TaskUseCase) CreateTaskUsecase(task *models.Task, user_id string) error {
	if strings.TrimSpace(task.CreatedBy) == "" || strings.TrimSpace(task.Name) == "" ||
		strings.TrimSpace(task.Description) == "" || strings.TrimSpace(task.Photo) == "" ||
		strings.TrimSpace(task.Source) == "" || strings.TrimSpace(task.Solution) == "" || strings.TrimSpace(task.Answer) == "" {
		return errors.New("empty data")
	}

	return u.repo.CreateTask(task, user_id)
}

func (u TaskUseCase) GetTaskUsecase(class int, subject, user_id string) ([]api_models.GetTaskInfo, error) {
	if class == 0 || subject == "" {
		return []api_models.GetTaskInfo{}, errors.New("empty data")
	}

	if class > 11 || class < 1 {
		return []api_models.GetTaskInfo{}, errors.New("class error")
	}

	return u.repo.GetTasks(class, subject, user_id)
}

func (u TaskUseCase) GetFullInfoAboutTaskUsecase(uuid string) ([]models.Task, error) {
	if uuid == "" {
		return []models.Task{}, errors.New("empty data")
	}

	return u.repo.GetFullTaskInfo(uuid)
}

func (u TaskUseCase) CompleteTaskUsecase(solved *models.Solved) error {
	if solved.User_id == "" {
		return errors.New("empty data")
	}

	if solved.TaskID == "" {
		return errors.New("empty data")
	}

	return u.repo.CompleteTask(solved)
}

func (u TaskUseCase) IsTaskSolvedUsecase(user_id, uuid string) (bool, error) {
	if user_id == "" {
		return false, errors.New("empty data")
	}

	if uuid == "" {
		return false, errors.New("empty data")
	}

	is_solved, err := u.repo.IsTaskSolved(user_id, uuid)
	if err != nil {
		return false, errors.New("db is_solved error")
	}

	return is_solved, nil
}
