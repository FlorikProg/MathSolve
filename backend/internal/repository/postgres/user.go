package postgres

import (
	"gorm.io/gorm"
	"math/internal/models"
)

type UserRepo struct {
	db *gorm.DB
}

func NewUserRepo(db *gorm.DB) *UserRepo {
	return &UserRepo{db: db}
}

// Functions to implement the Users interface
func (r *UserRepo) CreateUser(user *models.User) error {
	return r.db.Create(user).Error
}
func (r *UserRepo) DeleteUserByID(id uint) error {
	return r.db.Delete(&models.User{}, id).Error
}
func (r *UserRepo) UpdateUserDataById(id string, user *models.User) error {
    return r.db.Model(&models.User{}).Where("uuid = ?", id).Updates(user).Error
}