// data repository package
package repository

import (
	api_models "math/internal/models/api_models"
	models "math/internal/models/base_models"
)

type Users interface {
	DeleteUser(id string) error
	CreateUser(user *models.User) error
	GetUserByEmail(email string) (*models.User, error)
	GetUserIdByEmail(id string) (string, error)
	GetPasswordById(uuid string) (string, error)
	CheckExistsByEmail(email string) (bool, error)
	GetBaseInfoAboutUser(user_id string) ([]api_models.GetBaseInfoAboutUser, error)
	IsUserAdmin(user_id string) (bool, error)
	// GetUserByEmail(email string) (*models.User, error)
	// UpdateUser(user *models.User) error
}

type Task interface {
	CreateTask(task *models.Task, user_id string) error
	GetTasks(class int, subject, user_id string) ([]api_models.GetTaskInfo, error)
	GetFullTaskInfo(uuid string) ([]models.Task, error)
	CompleteTask(*models.Solved) error
	IsTaskSolved(user_is, uuid string) (bool, error)
}
