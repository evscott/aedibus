package models

type Assignments struct {
	ID       string `pg:"id"`
	CourseId string `pg:"course_id"`
	Title    string `pg:"title"`
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