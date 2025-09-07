package main

import (
	"log"
	"time"

	"github.com/gin-gonic/gin"

	_ "math/docs"
	v1http "math/internal/delivery/http/v1"
	"math/internal/middleware"
	"math/internal/repository/postgres"
	"math/internal/usecase"

	"github.com/gin-contrib/cors"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func main() {
	server := gin.Default()

	db, err := postgres.InitDatabase()
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	userRepo := postgres.NewUserRepo(db)
	taskRepo := postgres.NewTaskRepo(db)

	userUseCase := usecase.NewUserUseCase(userRepo)
	taskUseCase := usecase.NewTaskUseCase(taskRepo)

	userHandler := v1http.NewUserHandler(userUseCase)
	taskHandler := v1http.NewTaskHandler(taskUseCase)

	server.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	server.GET("/", func(c *gin.Context) {
		c.Redirect(302, "/swagger/index.html")
	})

	server.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:8080"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	authGroup := server.Group("/api/auth")
	{
		authGroup.POST("/login_user", userHandler.LoginUserHandler)
		authGroup.POST("/create_user", userHandler.CreateUserHandler)
		authGroup.POST("/refresh", userHandler.RefreshTokenHandler)
	}

	userGroup := server.Group("/api/user")
	userGroup.Use(middleware.MainMiddleware())
	{
		userGroup.DELETE("/delete_user", userHandler.DeleteUserHandler)
		userGroup.POST("/get_user", userHandler.GetUserHandler)
		userGroup.POST("/is_admin", userHandler.IsUserAdmin)
	}

	taskGroup := server.Group("/api/task")
	taskGroup.Use(middleware.MainMiddleware())
	{
		taskGroup.POST("/create_task", taskHandler.CreateTaskHandler)
		taskGroup.POST("/get_tasks", taskHandler.GetTasksHandler)
		taskGroup.POST("/get_info_about_task", taskHandler.GetFullInfoAboutTask)
		taskGroup.POST("/complete_task", taskHandler.CompleteTask)
		taskGroup.POST("/is_solved", taskHandler.IsTaskSolveByUser)
	}

	log.Println("⚡ Starting server on :8080")
	server.Run(":8081")
}
