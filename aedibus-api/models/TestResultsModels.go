package models

type TestResults struct {
	ID           string `pg:"id"`
	SubmissionId string `pg:"submission_id"`
	Name         string `pg:"name"`
	Time         string `pg:"time"`
	Message      string `pg:"message"`
	Success      bool   `pg:"success"`
}
