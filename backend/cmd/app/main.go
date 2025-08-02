//main file for the backend application

package main

import (
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	server := gin.Default()

	server.Use(gin.Recovery())

	userGroup := server.Group("/user")
	{
		userGroup.GET("/create_user", http.CreateUserHandler)
		userGroup.GET("/get_user", getUser)
		userGroup.GET("/get_all_users", getAllUsers)
		userGroup.GET("/delete_user", deleteUser)
	}

	taskGroup := server.Group("/task")
	{
		taskGroup.GET("/create_task", createTask)
		taskGroup.GET("/get_task", getTask)
		taskGroup.GET("/get_all_tasks", getAllTasks)
		taskGroup.GET("/delete_task", deleteTask)
	}

	log.Println("⚡ Starting server on :8080")
	server.Run(":8080")
}
