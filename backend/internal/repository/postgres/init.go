package postgres

import (
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"math/internal/models"
	"github.com/joho/godotenv"
	"log"

)

func InitDatabase() (*gorm.DB, error) {
	err := godotenv.Load()
    if err != nil {
        log.Println("No .env file found")
    }
	host := os.Getenv("HOST")
	user := os.Getenv("USER")
	password := os.Getenv("PASSWORD")
	dbname := os.Getenv("DB_NAME")
	port := os.Getenv("PORT")
	sslmode := os.Getenv("sslmode")

	fmt.Println(host, user, password, dbname, port, sslmode)

	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
		host, user, password, dbname, port, sslmode,
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	err = db.AutoMigrate(&models.User{})

	return db, nil
}
