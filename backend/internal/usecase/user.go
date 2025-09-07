package usecase

import (
	"errors"
	"log"
	api_models "math/internal/models/api_models"
	models "math/internal/models/base_models"
	"math/internal/repository"
	"os"
	"regexp"
	"strings"
	"time"

	"github.com/google/uuid"

	already "math/cmd/app/errors"
	valid_tokens "math/internal/middleware"
	hash "math/pkg/auth/hash"
	"math/pkg/auth/tokens"
)

type UserUsecase interface {
	CreateUserUseCase(user *models.User) error
	DeleteUserUseCase(id, password string) error
	LoginUserUseCase(email, password string) (string, string, error)
	RefreshAccessTokenUseCase(refreshToken string) (string, error)
	GetInfoAboutUserUseCase(user_id string) ([]api_models.GetBaseInfoAboutUser, error)
	IsUserAdminUsecase(user_id string) (bool, error)
}

type UserUseCase struct {
	repo repository.Users
}

func NewUserUseCase(repo repository.Users) *UserUseCase {
	return &UserUseCase{repo: repo}
}

func (u *UserUseCase) CreateUserUseCase(user *models.User) error {
	if strings.TrimSpace(user.Name) == "" || strings.TrimSpace(user.Email) == "" {
		return errors.New("invalid user data: name and email must be non-empty")
	}
	if strings.TrimSpace(user.UUID) != "" {
		return errors.New("user UUID must be empty")
	}

	if len(user.Name) < 8 || len(user.Password) < 8 {
		return errors.New("name and password must be at least 8 characters long")
	}

	isExists, err := u.repo.CheckExistsByEmail(user.Email)
	if err != nil {
		return errors.New("error with checking email existence")
	}

	if isExists {
		return already.ErrUserAlreadyExists
	}

	user.UUID = uuid.New().String()

	hashed_password, err := hash.HashPassword(user.Password)
	if err != nil {
		return err
	}

	user.Password = hashed_password
	user.RegistrationDate = time.Now().In(time.FixedZone("MSK", 3*60*60))

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

	log.Println("Retrieved password for UUID:", id, "Password:", password)

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

	secret_key := os.Getenv("JWT_SECRET_KEY")

	accessToken, err := tokens.GenerateAccessToken(secret_key, user.UUID)
	if err != nil {
		return "", "", err
	}

	refreshToken, err := tokens.GenerateRefreshToken(secret_key, user.UUID)
	if err != nil {
		return "", "", err
	}

	return accessToken, refreshToken, nil
}

func (u *UserUseCase) RefreshAccessTokenUseCase(refreshToken string) (string, error) {
	err := valid_tokens.CheckTokenValid(refreshToken)
	if err != nil {
		return "", err
	}

	secretKey := os.Getenv("JWT_SECRET_KEY")

	sub, err := tokens.GetSubFromToken(refreshToken, secretKey)
	if err != nil {
		return "", err
	}

	accessToken, err := tokens.GenerateAccessToken(secretKey, sub)
	if err != nil {
		return "", err
	}

	return accessToken, nil
}

func (u *UserUseCase) GetInfoAboutUserUseCase(user_id string) ([]api_models.GetBaseInfoAboutUser, error) {
	if user_id == "" {
		return []api_models.GetBaseInfoAboutUser{}, errors.New("empty user_id")
	}

	info, err := u.repo.GetBaseInfoAboutUser(user_id)
	if err != nil {
		return []api_models.GetBaseInfoAboutUser{}, err
	}

	return info, nil
}

func (u *UserUseCase) IsUserAdminUsecase(user_id string) (bool, error) {
	if user_id == "" {
		return false, errors.New("empty data")
	}

	is_admin, err := u.repo.IsUserAdmin(user_id)
	if err != nil {
		return false, errors.New("empty data")
	}
	return is_admin, nil

}
