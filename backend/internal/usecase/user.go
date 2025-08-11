package usecase

import (
	"errors"
	"math/internal/models"
	"math/internal/repository"
	"regexp"
	"strings"

	"github.com/google/uuid"
)

type UserUsecase interface {
	CreateUserUsecase(user *models.User) error
	DeleteUserUseCase(id string) error
}
type UserUseCase struct {
	repo repository.Users
}

func NewUserUseCase(repo repository.Users) *UserUseCase {
	return &UserUseCase{repo: repo}
}

func (u *UserUseCase) CreateUserUsecase(user *models.User) error {
	if strings.TrimSpace(user.Name) == "" || strings.TrimSpace(user.Email) == "" {
		return errors.New("invalid user data: name and email must be non-empty")
	}
	if strings.TrimSpace(user.UUID) != "" {
		return errors.New("user UUID must be empty")
	}

	user.UUID = uuid.New().String() // Генерируем новый UUID для пользователя

	return u.repo.CreateUser(user)
}

func (u *UserUseCase) DeleteUserUseCase(id string) error {
	if id == "" {
		return errors.New("user ID must not be empty")
	}

	r := regexp.MustCompile(`^[a-fA-F0-9]{8}\-[a-fA-F0-9]{4}\-[1-5][a-fA-F0-9]{3}\-[89abAB][a-fA-F0-9]{3}\-[a-fA-F0-9]{12}$`)
	if !r.MatchString(id) {
		return errors.New("invalid user ID format")
	}

	return u.repo.DeleteUser(id)
}
