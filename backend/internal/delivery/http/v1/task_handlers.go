package v1_http

import (
	"math/internal/usecase"
	"net/http"

	base_models "math/internal/models/base_models"

	"github.com/gin-gonic/gin"
)

type TaskHandler struct {
	Usecase usecase.TaskUsecase
}

func NewTaskHandler(uc *usecase.TaskUseCase) *TaskHandler {
	return &TaskHandler{Usecase: uc}
}

// CreateTaskHandler godoc
// @Summary      Создать задачу
// @Description  Создает новую задачу
// @Tags         user
// @Accept       json
// @Produce      json
// @Param        user  body      models.Tasks  true  "Данные задачи"
// @Success      201   {object}  models.Tasks
// @Failure      400   {object}  map[string]string
// @Router       /task/create_task [post]
func (h *TaskHandler) CreateTaskHandler(c *gin.Context) {
	var new_task base_models.Tasks
	err := c.ShouldBindJSON(&new_task)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid data"})
		return
	}

	err = h.Usecase.CreateTaskUsecase(&new_task)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "usecase error"})
		return
	}

}
