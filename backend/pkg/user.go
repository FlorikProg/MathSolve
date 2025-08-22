package usecase

import (
	"errors"
	models "math/internal/models/base_models"
	"math/internal/repository"
	"regexp"
	"strings"

	"github.com/google/uuid"

	hash "math/pkg/auth/hash"
	"math/pkg/auth/tokens"
)

type UserUsecase interface {
	CreateUserUsecase(user *models.User) error
	DeleteUserUseCase(id string) error
	LoginUserUseCase(email, password string) (string, string, error)
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

	user.UUID = uuid.New().String()

	hashed_password, err := hash.HashPassword(user.Password)
	if err != nil {
		return err
	}

	user.Password = hashed_password

	return u.repo.CreateUser(user)
}

func (u *UserUseCase) DeleteUserUseCase(id, password string) error {
	if id == "" {
		return errors.New("user ID must not be empty")
	}

	r := regexp.MustCompile(`^[a-fA-F0-9]{8}\-[a-fA-F0-9]{4}\-[1-5][a-fA-F0-9]{3}\-[89abAB][a-fA-F0-9]{3}\-[a-fA-F0-9]{12}$`)
	if !r.MatchString(id) {
		return errors.New("invalid user ID format")
	}

	password_hash, err := u.repo.GetPasswordById(id)
	if err != nil {
		return errors.New("user not found")
	}

	if !hash.CheckPasswordHash(password, password_hash) {
		return errors.New("incorrect password")
	}

	return u.repo.DeleteUser(id)
}

func (u *UserUseCase) LoginUserUseCase(email, password string) (string, string, error) {
	if strings.TrimSpace(email) == "" || strings.TrimSpace(password) == "" {
		return "", "", errors.New("email and password must not be empty")
	}

	user, err := u.repo.GetUserByEmail(email)
	if err != nil {
		return "", "", err
	}

	if !hash.CheckPasswordHash(password, user.Password) {
		return "", "", errors.New("invalid email or password")
	}

	accessToken, err := tokens.GenerateAccessToken("your_secret_key", user.UUID)
	if err != nil {
		return "", "", err
	}

	refreshToken, err := tokens.GenerateRefreshToken("your_secret_key", user.UUID)
	if err != nil {
		return "", "", err
	}

	return accessToken, refreshToken, nil
}
