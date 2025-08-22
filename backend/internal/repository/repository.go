// data repository package
package repository

import (
	models "math/internal/models/base_models"
)

type Users interface {
	DeleteUser(id string) error
	CreateUser(user *models.User) error
	GetUserByEmail(email string) (*models.User, error)
	GetUserIdByEmail(id string) (string, error)
	GetPasswordById(uuid string) (string, error)
	CheckExistsByEmail(email string) (bool, error)
	// GetUserByEmail(email string) (*models.User, error)
	// UpdateUser(user *models.User) error
}

type Task interface {
	CreateTask(*models.Tasks) error
}
