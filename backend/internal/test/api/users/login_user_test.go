package users

import (
	"fmt"
	v1http "math/internal/delivery/http/v1"
	"math/internal/test/api/mocks"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestLoginUserHandler(t *testing.T) {
	gin.SetMode(gin.TestMode)

	userUseCase := &mocks.NewMockUserUseCase{}
	userHandler := v1http.NewUserHandler(userUseCase)

	router := gin.Default()

	router.POST("/auth/login_user", userHandler.LoginUserHandler)

	tests := []struct {
		body         string
		expectedCode int
	}{
		{
			body:         `{"email": "test@gmail.com", "password": "RomanSuper"}`,
			expectedCode: 200,
		},
	}

	for _, test := range tests {
		req, _ := http.NewRequest("POST", "/auth/login_user", strings.NewReader(test.body))
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
