package v1_http

import (
	"errors"
	"log"
	models "math/internal/models/api_models"
	base_models "math/internal/models/base_models"
	"math/internal/usecase"
	"net/http"

	already "math/cmd/app/errors"

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
// @Param        user  body      models.AddUser  true  "Данные пользователя"
// @Success      201   {object}  models.AddUser
// @Failure      400   {object}  map[string]string
// @Router       /user/create_user [post]
func (h *UserHandler) CreateUserHandler(c *gin.Context) {
	var user models.AddUser
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		log.Println("Error binding JSON:", err)
		return
	}

	var userModel base_models.User

	userModel.Name = user.Name
	userModel.Email = user.Email
	userModel.Password = user.Password

	err := h.Usecase.CreateUserUseCase(&userModel)
	if err != nil {
		if errors.Is(err, already.ErrUserAlreadyExists) {
			c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
			return
		}
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
// @Param        user  body      models.DeleteUser  true  "UUID пользователя"
// @Success      200   {object}  map[string]string
// @Failure      400   {object}  map[string]string
// @Router       /user/delete_user [delete]
func (h *UserHandler) DeleteUserHandler(c *gin.Context) {
	// TODO: сделать чтобы принималось только UUID, а не вся структура USER
	var user models.DeleteUser
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	err := h.Usecase.DeleteUserUseCase(user.UUID, user.Password)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}

// LoginUserHandler godoc
// @Summary      Вход пользователя
// @Description  Позволяет пользователю войти в систему
// @Tags         user
// @Accept       json
// @Produce      json
// @Param        user  body      models.AuthUser  true  "Данные для входа"
// @Success      200   {object}  models.AuthUser
// @Failure      400   {object}  map[string]string
// @Failure      401   {object}  map[string]string
// @Router       /user/login_user [post]
func (h *UserHandler) LoginUserHandler(c *gin.Context) {
	var user models.AuthUser
	err := c.ShouldBindJSON(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	accessToken, refreshToken, err := h.Usecase.LoginUserUseCase(user.Email, user.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.SetCookie(
		"refresh_token", // имя куки
		refreshToken,    // значение
		30*24*60*60,     // maxAge
		"/",             // path
		"",              // domain
		false,           // secure //todo: убрать!!!!!!
		true,            // httpOnly
	)

	c.JSON(http.StatusOK, gin.H{
		"message":      "Login successful",
		"access_token": accessToken,
	})
}

func (h *UserHandler) RefreshTokenHandler(c *gin.Context) {
	refreshCookie, err := c.Cookie("refresh_token")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No refresh token"})
		return
	}

	newAccessToken, err := h.Usecase.RefreshAccessTokenUseCase(refreshCookie)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid refresh token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"access_token": newAccessToken,
	})
}
