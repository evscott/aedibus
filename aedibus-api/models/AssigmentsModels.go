package models

type Assignments struct {
	ID       string `pg:"id",json:"id"`
	CourseId string `pg:"course_id",json:"courseId"`
	Title    string `pg:"title",title:"title"`
}

/** Create Assignment **/

type CreateAssignmentRequest struct {
	CourseId  string `json:"courseId"`
	Title     string `json:"title"`
	TestSuite []byte `json:"testSuite"`
	ReadMe    []byte `json:"readMe"`
}

type CreateAssignmentResponse struct {
	ID       string `pg:"id"`
	CourseId string `json:"courseId"`
	Title    string `json:"title"`
}

/** Get Assignment **/

type GetAssignmentResponse struct {
	ID       string `json:"id"`
	CourseId string `json:"courseId"`
	Title    string `json:"title"`
}

/** Get Assignment Participation **/

type AssignmentParticipation struct {
	SubmissionId string `pg:"submission_id",json:"submissionId"`
	UserId       string `pg:"user_id",json:"userId"`
	Name         string `pg:"user_name",json:"userName"`
	Submitted    bool   `pg:"submitted",json:"submitted"`
}
