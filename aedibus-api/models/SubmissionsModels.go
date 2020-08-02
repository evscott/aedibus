package models

type Submissions struct {
	ID           string `pg:"id"`
	AssignmentId string `pg:"assignment_id"`
	StudentId    string `pg:"student_id"`
}

type CreateSubmissionResponse struct {
	ID           string `json:"id"`
	AssignmentId string `json:"assignment_id"`
	StudentId    string `json:"student_id"`
}

type GetSubmissionResponse struct {
	ID           string  `json:"id"`
	AssignmentId string  `json:"assignmentId"`
	StudentId    string  `json:"studentId"`
	TestResults  []Tests `json:"testResults"`
}
