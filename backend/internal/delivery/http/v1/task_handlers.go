package v1_http

import (
	"fmt"
	"math/internal/usecase"
	"net/http"

	base_models "math/internal/models/base_models"

	api_models "math/internal/models/api_models"

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
// @Tags         task
// @Accept       json
// @Produce      json
// @Param        user  body      models.Task  true  "Данные задачи"
// @Success      201   {object}  models.Task
// @Failure      400   {object}  map[string]string
// @Router       /task/create_task [post]
func (h *TaskHandler) CreateTaskHandler(c *gin.Context) {
	var new_task base_models.Task
	err := c.ShouldBindJSON(&new_task)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid data"})
		return
	}

	fmt.Println(new_task)

	var user_id string
	val, exists := c.Get("userID")
	if exists {
		myVal := val.(string)
		user_id = myVal
	}

	err = h.Usecase.CreateTaskUsecase(&new_task, user_id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "usecase error"})
		return
	}

}

// GetTaskHandler godoc
// @Summary      Получить все задачи
// @Description  Получает задачу
// @Tags         tasks
// @Accept       json
// @Produce      json
// @Param        user  body      models.GetTasks  true  "Предмет и класс"
// @Success      200   {object}  models.GetTasks
// @Failure      400   {object}  map[string]string
// @Router       /task/get_tasks [post]
func (h *TaskHandler) GetTasksHandler(c *gin.Context) {
	var getTasks api_models.GetTasks
	err := c.ShouldBindJSON(&getTasks)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid data"})
		return
	}

	var user_id string

	val, exists := c.Get("userID")
	if exists {
		myVal := val.(string)
		user_id = myVal
	}

	tasks, err := h.Usecase.GetTaskUsecase(getTasks.Class, getTasks.Subject, user_id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "usecase error"})
		return
	}

	c.JSON(http.StatusOK, tasks)
}

func (h *TaskHandler) GetFullInfoAboutTask(c *gin.Context) {
	var getUuidForTask api_models.GetUuid
	err := c.ShouldBindJSON(&getUuidForTask)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid data"})
		return
	}

	tasks, err := h.Usecase.GetFullInfoAboutTaskUsecase(getUuidForTask.UUID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "usecase error"})
		return
	}

	c.JSON(http.StatusOK, tasks)
}

func (h *TaskHandler) CompleteTask(c *gin.Context) {
	var getUuidForTask api_models.CompleteTask
	err := c.ShouldBindJSON(&getUuidForTask)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid data"})
		return
	}

	var complete_task base_models.Solved
	fmt.Println(getUuidForTask.UUID)
	complete_task.TaskID = getUuidForTask.UUID
	complete_task.Attempts = getUuidForTask.Attempts

	val, exists := c.Get("userID")
	if exists {
		myVal := val.(string)
		complete_task.User_id = myVal
	}

	complete_task.Is_solved = true

	fmt.Println(complete_task)
	err = h.Usecase.CompleteTaskUsecase(&complete_task)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "usecase error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}

func (h *TaskHandler) IsTaskSolveByUser(c *gin.Context) {
	var getUuidForTask api_models.GetUuid
	err := c.ShouldBindJSON(&getUuidForTask)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid data"})
		return
	}

	var user_id string
	val, exists := c.Get("userID")
	if exists {
		myVal := val.(string)
		user_id = myVal
	}

	is_solved, err := h.Usecase.IsTaskSolvedUsecase(user_id, getUuidForTask.UUID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "usecase error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"is_solved": is_solved})

}
