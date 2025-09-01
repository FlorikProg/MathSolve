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
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	authGroup := server.Group("/auth")
	{
		authGroup.POST("/login_user", userHandler.LoginUserHandler)
		authGroup.POST("/create_user", userHandler.CreateUserHandler)
	}

	userGroup := server.Group("/user")
	userGroup.Use(middleware.MainMiddleware())
	{
		userGroup.DELETE("/delete_user", userHandler.DeleteUserHandler) // todo: сделать раздекодирование на беке а не на фронте
		userGroup.POST("/refresh", userHandler.RefreshTokenHandler)
	}

	taskGroup := server.Group("/task")
	taskGroup.Use(middleware.MainMiddleware())
	{
		taskGroup.POST("/create_task", taskHandler.CreateTaskHandler)
		taskGroup.POST("/get_tasks", taskHandler.GetTasksHandler)
		taskGroup.POST("/get_info_about_task", taskHandler.GetFullInfoAboutTask)
		taskGroup.POST("/complete_task", taskHandler.CompleteTask)
	}

	log.Println("⚡ Starting server on :8080")
	server.Run(":8080")
}
