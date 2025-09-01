package models

type GetTaskInfo struct {
	UUID        string `gorm:"type:uuid;default:uuid_generate_v4()" json:"uuid"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Source      string `json:"source"`
	CreatedBy   string `json:"created_by"`
	SchoolClass int    `json:"school_class"`
	Subject     string `json:"subject"`
	IsSolve     string `json:"is_solve"`
	Tag         string `json:"tag"`
	Complexity  string `json:"complex"`
}
