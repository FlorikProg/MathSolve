// data repository package
package repository

import (
	"math/internal/models"
)

type Users interface {
	DeleteUser(userID string) error
	CreateUser(user *models.User) error
	GetUserByID(userID string) (*models.User, error)
	// GetUserByEmail(email string) (*models.User, error)
	// UpdateUser(user *models.User) error
}
