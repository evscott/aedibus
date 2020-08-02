package models

type Courses struct {
	ID          string `pg:"id"`
	TeacherId   string `pg:"teacher_id"`
	Title       string `pg:"title"`
	Description string `pg:"description"`
}

/** Create Course **/

type CreateCourseRequest struct {
	Title       string   `json:"title"`
	Description string   `json:"description"`
	StudentList []string `json:"studentList"`
}

type CreateCourseResponse struct {
	ID          string   `json:"id"`
	TeacherName string   `json:"teacherName"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	StudentList []string `json:"studentList"`
}

/** Get Courses **/

type GetCoursesResponse struct {
	Courses []Courses `json:"courses"`
}

/** Get Course **/

type GetCourseResponse struct {
	ID          string        `json:"id"`
	TeacherId   string        `json:"teacher_id"`
	Title       string        `json:"title"`
	Description string        `json:"description"`
	Assignments []Assignments `json:"assignments"`
}
