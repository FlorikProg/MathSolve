// data repository package
package repository

import (
	"math/internal/repository/postgres"

	"gorm.io/gorm"
)

type Users interface {
	CreateUser(db *gorm.DB, user postgres.User) error
	DeleteUser(db *gorm.DB, userID int) error
	GetUserByID(db *gorm.DB, userID int) (postgres.User, error)
	GetUserByEmail(db *gorm.DB, email string) (postgres.User, error)
	UpdateUser(db *gorm.DB, user postgres.User) error
	// GetAllUsers(db *gorm.DB) ([]postgres.User, error)
}