package models

type Tasks struct {
	UUID        string `gorm:"type:uuid;default:uuid_generate_v4()" json:"uuid"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Solution    string `json:"solution"`
	Answer      string `json:"answer"`
	Source      string `json:"source"`
	CreatedBy   string `json:"created_by"`
	Photo       string `json:"photo"`
}
