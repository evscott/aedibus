package models

type Courses struct {
	ID          string `pg:"id",json:"id"`
	TeacherId   string `pg:"teacher_id",json:"teacherId"`
	Title       string `pg:"title",json:"title"`
	Description string `pg:"description",json:"description"`
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
