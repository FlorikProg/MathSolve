package main

import (
	"log"

	"github.com/gin-gonic/gin"

	_ "math/docs"
	v1http "math/internal/delivery/http/v1"
	"math/internal/repository/postgres"
	"math/internal/usecase"

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
	userUseCase := usecase.NewUserUseCase(userRepo)   // создаём usecase из репозитория
	userHandler := v1http.NewUserHandler(userUseCase) // передаём usecase в хендлер

	userGroup := server.Group("/user")
	{
		userGroup.POST("/create_user", userHandler.CreateUserHandler)
		userGroup.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
		// Тут можешь добавить остальные эндпоинты, например:
		// userGroup.GET("/get_user", userHandler.GetUserHandler)
		// userGroup.GET("/get_all_users", userHandler.GetAllUsersHandler)
		userGroup.POST("/delete_user", userHandler.DeleteUserHandler)
	}

	log.Println("⚡ Starting server on :8080")
	server.Run(":8080")
}
