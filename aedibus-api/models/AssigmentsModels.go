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

type GetAssignmentRequest struct {
	ID string `json:"id"`
}

type GetAssignmentResponse struct {
	ID       string `json:"id"`
	CourseId string `json:"courseId"`
	Title    string `json:"title"`
}

/** Get Test Suite **/

type GetTestSuiteRequest struct {
	ID string `pg:"id"`
}

/** Get Readme **/

type GetReadmeRequest struct {
	ID string `pg:"id"`
}
