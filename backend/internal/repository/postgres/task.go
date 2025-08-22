package postgres

import (
	"fmt"
	base_models "math/internal/models/base_models"

	"gorm.io/gorm"
)

type TaskRepo struct {
	db *gorm.DB
}

func NewTaskRepo(db *gorm.DB) *TaskRepo {
	return &TaskRepo{db: db}
}

func (r *TaskRepo) CreateTask(tasks *base_models.Tasks) error {
	err := r.db.Create(tasks).Error
	if err != nil {
		return fmt.Errorf("error create user")
	}

	return nil
}
