package models

import "time"

type User struct {
	UUID                   string    `json:"uuid"`
	Name                   string    `json:"name"`
	Email                  string    `json:"email"`
	Password               string    `json:"password"`
	RegistrationDate       time.Time `json:"registration_date"`
	IsActive               bool      `json:"is_active"`
	IsAdmin                bool      `json:"is_admin"`
	LeftSubDate            *time.Time `json:"left_sub_date,omitempty"`
	CompletedMathTasks     int       `json:"completed_math_tasks"`
	CompletedPhysicsTasks  int       `json:"completed_physics_tasks"`
	CompletedInformaticsTasks int    `json:"completed_informatics_tasks"`
	CompletedRussianTasks  int       `json:"completed_russian_tasks"`
}
