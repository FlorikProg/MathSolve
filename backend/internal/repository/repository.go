package repository

import (
	"math/internal/repository/postgres"

	"gorm.io/gorm"
)

type Users interface {
	CreateUser(db *gorm.DB, user postgres.User) error
}
