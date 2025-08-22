package usecase

import (
	"errors"
	models "math/internal/models/base_models"
	"math/internal/repository"
	"strings"
)

type TaskUsecase interface {
	CreateTaskUsecase(task *models.Tasks) error
}

type TaskUseCase struct {
	repo repository.Task
}

func NewTaskUseCase(repo repository.Task) *TaskUseCase {
	return &TaskUseCase{repo: repo}
}

func (u TaskUseCase) CreateTaskUsecase(task *models.Tasks) error {
	if strings.TrimSpace(task.CreatedBy) == "" || strings.TrimSpace(task.Name) == "" ||
		strings.TrimSpace(task.Description) == "" || strings.TrimSpace(task.Photo) == "" ||
		strings.TrimSpace(task.Source) == "" || strings.TrimSpace(task.Solution) == "" || strings.TrimSpace(task.Answer) == "" {
		return errors.New("empty data")
	}

	return u.repo.CreateTask(task)
}
