package models

type Solved struct {
	UUID      string `gorm:"type:uuid;default:uuid_generate_v4()" json:"uuid"`
	TaskID    string `json:"task_id"`
	Is_solved bool   `json:"is_solved"`
	User_id   string `json:"user_id"`
}
