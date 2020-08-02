package models

type Submissions struct {
	ID           string `pg:"id"`
	AssignmentId string `pg:"assignment_id"`
	StudentId    string `pg:"student_id"`
}
