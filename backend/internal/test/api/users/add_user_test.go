package users_test

import (

	// "math/internal/test/api/mocks"

	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	v1http "math/internal/delivery/http/v1"

	"math/internal/test/api/mocks"

	"github.com/gin-gonic/gin"
)

func TestCreateUserHandler(t *testing.T) {
	gin.SetMode(gin.TestMode)

	userUseCase := &mocks.NewMockUserUseCase{}
	userHandler := v1http.NewUserHandler(userUseCase)
	router := gin.Default()

	router.POST("/auth/create_user", userHandler.CreateUserHandler)

	tests := []struct {
		body         string
		expectedCode int
	}{
		{
			body:         `{"email": "test@gmail.com", "name": "test", "password": "RomanSuper"}`,
			expectedCode: 201,
		},
		{
			body:         `{"email": 0, "name": "test", "password": "RomanSuper"}`,
			expectedCode: 400,
		},
		{
			body:         `{"email": "test@gmail.com", "name": 0, "password": "RomanSuper"}`,
			expectedCode: 400,
		},
		{
			body:         `{"email": "test@gmail.com", "name": "test"}`,
			expectedCode: 400,
		},
	}

	for _, test := range tests {
		req, _ := http.NewRequest("POST", "/auth/create_user", strings.NewReader(test.body))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		router.ServeHTTP(w, req)

		if w.Code != test.expectedCode {
			t.Errorf("Expected status code %d, got %d", test.expectedCode, w.Code)
		} else {
			fmt.Println("\033[32mТест прошел ✅\033[0m")
		}
	}
}
