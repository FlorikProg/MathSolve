package models

type Tasks struct {
	Uuid          int    `json:"uuid"`
	Name          string `json:"name"`
	Description   string `json:"description"`
	Email		  string `json:"email"`
}