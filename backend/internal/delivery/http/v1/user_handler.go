package v1_http

import (
	"math/internal/models"
	"math/internal/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	Usecase usecase.UserUsecase
}

func NewUserHandler(uc usecase.UserUsecase) *UserHandler {
	return &UserHandler{Usecase: uc}
}

// CreateUserHandler godoc
// @Summary      Создать пользователя
// @Description  Создаёт нового пользователя
// @Tags         user
// @Accept       json
// @Produce      json
// @Param        user  body      models.User  true  "Данные пользователя"
// @Success      201   {object}  models.User
// @Failure      400   {object}  map[string]string
// @Router       /user/create_user [post]
func (h *UserHandler) CreateUserHandler(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	err := h.Usecase.CreateUserUsecase(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "User created successfully", "user": user})
}

// DeleteUserHandler godoc
// @Summary      Удалить пользователя
// @Description  Удаляет пользователя по UUID
// @Tags         user
// @Accept       json
// @Produce      json
// @Param        user  body      models.User  true  "UUID пользователя"
// @Success      200   {object}  map[string]string
// @Failure      400   {object}  map[string]string
// @Router       /user/delete_user [delete]
func (h *UserHandler) DeleteUserHandler(c *gin.Context) {
	// TODO: сделать чтобы принималось только UUID, а не вся структура USER
	var user struct {
		UUID string `json:"uuid"`
	}
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	err := h.Usecase.DeleteUserUseCase(user.UUID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}
