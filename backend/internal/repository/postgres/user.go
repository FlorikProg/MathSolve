package postgres

import (
	"math/internal/models"

	"gorm.io/gorm"
)

type UserRepo struct {
	db *gorm.DB
}

func NewUserRepo(db *gorm.DB) *UserRepo {
	return &UserRepo{db: db}
}

// Functions to implement the Users interface
func (r *UserRepo) CreateUser(user *models.User) error {
	err := r.db.Create(user).Error
	if err != nil {
		return err
	}
	if r.db.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (r *UserRepo) DeleteUser(id string) error {
	err := r.db.Delete(&models.User{}, id).Error
	if err != nil {
		return err
	}
	if r.db.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (r *UserRepo) UpdateUserDataById(id string, user *models.User) error {
	result := r.db.Model(&models.User{}).Where("uuid = ?", id).Updates(user)
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (r *UserRepo) GetUserByID(id string) (*models.User, error) {
	var user models.User
	err := r.db.First(&user, id).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}
