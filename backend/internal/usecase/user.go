package usecase

import (
	"errors"
	"strings"
	"math/internal/models"
)

type UserRepo interface {
	CreateUser(user *models.User) error
}

type UserUseCase struct {
	repo UserRepo
}

func NewUserUseCase(repo UserRepo) *UserUseCase {
	return &UserUseCase{repo: repo}
}
func (u *UserUseCase) CreateUserUsecase(user *models.User) error {
	if strings.TrimSpace(user.Name) == "" || strings.TrimSpace(user.Email) == "" {
		return errors.New("invalid user data: name and email must be non-empty")
	}
	if strings.TrimSpace(user.UUID) != "" {
		return errors.New("user UUID must be empty")
	}

	return u.repo.CreateUser(user)
}