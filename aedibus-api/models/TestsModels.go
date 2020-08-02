package models

type Tests struct {
	ID           string `pg:"id"`
	SubmissionId string `pg:"submission_id"`
	Name         string `pg:"name"`
	Time         string `pg:"time"`
	Message      string `pg:"message"`
	Failure      bool   `pg:"failure"`
}
