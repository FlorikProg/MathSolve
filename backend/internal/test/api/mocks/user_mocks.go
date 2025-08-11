package mocks

import "math/internal/models"

type MockUserUsecase struct {
	Err error
}

func (m *MockUserUsecase) CreateUserUsecase(user *models.User) error {
	return m.Err
}

func (m *MockUserUsecase) DeleteUserUseCase(id string) error {
	return m.Err
}
