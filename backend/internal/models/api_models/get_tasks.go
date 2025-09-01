package models

type GetTasks struct {
	Class   int    `json:"class"`
	Subject string `json:"subject"`
}
