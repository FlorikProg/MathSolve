package v1_http

import (
	"github.com/gin-gonic/gin"
	"math/internal/models"
	"math/internal/usecase"
	"net/http"
)

type UserHandler struct {
	usecase *usecase.UserUseCase
}

func NewUserHandler(uc *usecase.UserUseCase) *UserHandler {
	return &UserHandler{usecase: uc}
}

// CreateUserHandler godoc
// @Summary      Создать пользователя
// @Description  Создаёт нового пользователя
// @Tags         users
// @Accept       json
// @Produce      json
// @Success      200 {object} map[string]string
// @Router       /user/create_user [post]
func (h *UserHandler) CreateUserHandler(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	err := h.usecase.CreateUserUsecase(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "User created successfully", "user": user})
}
