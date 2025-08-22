package postgres

import (
	"fmt"
	models "math/internal/models/base_models"

	"gorm.io/gorm"
)

type UserRepo struct {
	db *gorm.DB
}

func NewUserRepo(db *gorm.DB) *UserRepo {
	return &UserRepo{db: db}
}

func (r *UserRepo) CreateUser(user *models.User) error {
	err := r.db.Create(user).Error
	if err != nil {
		return fmt.Errorf("failed to create user: %w", err)
	}
	return nil
}

func (r *UserRepo) DeleteUser(id string) error {
	result := r.db.Where("uuid = ?", id).Delete(&models.User{})
	if result.Error != nil {
		return fmt.Errorf("failed to delete user: %w", result.Error)
	}
	if result.RowsAffected == 0 {
		return fmt.Errorf("user with UUID %s not found", id)
	}
	return nil
}

// // Обновление данных пользователя по UUID
// func (r *UserRepo) UpdateUserDataById(id string, user *models.User) error {
// 	result := r.db.Model(&models.User{}).Where("uuid = ?", id).Updates(user)
// 	if result.Error != nil {
// 		return fmt.Errorf("failed to update user: %w", result.Error)
// 	}
// 	if result.RowsAffected == 0 {
// 		return gorm.ErrRecordNotFound
// 	}
// 	return nil
// }

func (r *UserRepo) GetUserByEmail(email string) (*models.User, error) {
	var user models.User
	if err := r.db.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, fmt.Errorf("user not found: %w", err)
	}
	return &user, nil
}

func (r *UserRepo) GetPasswordById(uuid string) (string, error) {
	var user models.User
	if err := r.db.Select("password").Where("uuid = ?", uuid).First(&user).Error; err != nil {
		return "", fmt.Errorf("failed to get password: %w", err)
	}
	if user.Password == "" {
		return "", fmt.Errorf("password not found for user with UUID: %s", uuid)
	}
	return user.Password, nil
}

func (r *UserRepo) GetUserIdByEmail(email string) (string, error) {
	var user models.User
	if err := r.db.Select("uuid").Where("email = ?", email).First(&user).Error; err != nil {
		return "", fmt.Errorf("user not found: %w", err)
	}
	return user.UUID, nil
}

func (r *UserRepo) CheckExistsByEmail(email string) (bool, error) {
	var user models.User
	err := r.db.Select("uuid").Where("email = ?", email).First(&user).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return false, nil
		}
		return false, fmt.Errorf("error checking user existence: %w", err)
	}
	return user.UUID != "", nil
}
