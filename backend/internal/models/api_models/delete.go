package models

type DeleteUser struct {
	UUID     string `json:"uuid" binding:"required"`
	Password string `json:"password" binding:"required"`
}
