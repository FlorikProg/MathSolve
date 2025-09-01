package users_test

// import (
// 	"fmt"
// 	v1http "math/internal/delivery/http/v1"
// 	"math/internal/test/api/mocks"
// 	"net/http"
// 	"net/http/httptest"
// 	"strings"
// 	"testing"

// 	"github.com/gin-gonic/gin"
// )

// func TestDeleteUserHandler(t *testing.T) {
// 	gin.SetMode(gin.TestMode)

// 	userUseCase := &mocks.NewMockUserUseCase{}
// 	userHandler := v1http.NewUserHandler(userUseCase)
// 	router := gin.Default()

// 	router.DELETE("/user/delete_user", userHandler.DeleteUserHandler)

// 	tests := []struct {
// 		body         string
// 		expectedCode int
// 	}{
// 		{
// 			body:         `{"uuid": "5df84daa-8a2e-4130-b167-31bf311fd024", "password": "RomanSuper"}`,
// 			expectedCode: 200,
// 		},
// 		{
// 			body:         `{"uuid": "", "password": "RomanSuper"}`,
// 			expectedCode: 400,
// 		},
// 		{
// 			body:         `{"uuid": "5df84daa-8a2e-4130-b167-31bf311fd024", "password": 0}`,
// 			expectedCode: 400,
// 		},
// 		{
// 			body:         `{"uuid": "5df84daa-8a2e-4130-b167-31bf311fd024", "passord": ""}`,
// 			expectedCode: 400,
// 		},
// 	}

// 	for _, test := range tests {
// 		req, _ := http.NewRequest("DELETE", "/user/delete_user", strings.NewReader(test.body))
// 		req.Header.Set("Content-Type", "application/json")
// 		w := httptest.NewRecorder()

// 		router.ServeHTTP(w, req)

// 		if w.Code != test.expectedCode {
// 			t.Errorf("Expected status code %d, got %d", test.expectedCode, w.Code)
// 		} else {
// 			fmt.Println("\033[32mТест прошел ✅\033[0m")
// 		}
// 	}
// }
