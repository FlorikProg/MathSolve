package mocks

import (
	api_models "math/internal/models/api_models"
	models "math/internal/models/base_models"
)

type NewMockUserUseCase struct{}

func (m *NewMockUserUseCase) CreateUserUseCase(user *models.User) error {
	return nil
}

func (m *NewMockUserUseCase) DeleteUserUseCase(id, password string) error {
	return nil
}

func (m *NewMockUserUseCase) LoginUserUseCase(email, password string) (string, string, error) {
	return "mock-token", "mock-refresh-token", nil
}

func (m *NewMockUserUseCase) RefreshAccessTokenUseCase(refreshToken string) (string, error) {
	return "", nil
}

func (m *NewMockUserUseCase) GetInfoAboutUserUseCase(user_id string) ([]api_models.GetBaseInfoAboutUser, error) {
	return []api_models.GetBaseInfoAboutUser{}, nil
}

func (m *NewMockUserUseCase) IsUserAdminUsecase(user_id string) (bool, error) {
	return false, nil
}
