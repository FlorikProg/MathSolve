package users_test

import (
	v1_http "math/internal/delivery/http/v1"
	"math/internal/test/api/mocks"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestCreateUserHandler(t *testing.T) {
	gin.SetMode(gin.TestMode)

	mockUsecase := &mocks.MockUserUsecase{Err: nil}

	handler := v1_http.NewUserHandler(mockUsecase)

	router := gin.Default()
	router.POST("/user/create_user", handler.CreateUserHandler)

	reqBody := `{"name":"Pupsik","email":"pupsik@example.com"}`
	req, _ := http.NewRequest(http.MethodPost, "/user/create_user", strings.NewReader(reqBody))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusCreated {
		t.Fatalf("expected status 201, got %d", w.Code)
	}
}
