package models

type CompleteTask struct {
	UUID     string `json:"uuid"`
	Attempts int    `json:"attempts"`
}
