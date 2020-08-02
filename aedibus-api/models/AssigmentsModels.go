package models

type Assignments struct {
	ID       string `pg:"id"`
	CourseId string `pg:"course_id"`
	Name     string `pg:"name"`
}

/** Create Assignment **/

type CreateAssignmentRequest struct {
	CourseId  string `json:"courseId"`
	Name      string `json:"name"`
	TestSuite []byte `json:"testSuite"`
	ReadMe    []byte `json:"readMe"`
}

type CreateAssignmentResponse struct {
	ID       string `pg:"id"`
	CourseId string `json:"courseId"`
	Name     string `json:"name"`
}

/** Get Assignment **/

type GetAssignmentRequest struct {
	ID string `json:"id"`
}

type GetAssignmentResponse struct {
	ID       string `json:"id"`
	CourseId string `json:"courseId"`
	Name     string `json:"name"`
}

/** Get Test Suite **/

type GetTestSuiteRequest struct {
	ID string `pg:"id"`
}

/** Get Readme **/

type GetReadmeRequest struct {
	ID string `pg:"id"`
}
