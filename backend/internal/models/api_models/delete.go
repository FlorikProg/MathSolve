package models

type DeleteUser struct {
	Password string `json:"password" binding:"required"`
}
