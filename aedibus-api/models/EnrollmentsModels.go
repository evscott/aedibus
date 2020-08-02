package models

type Enrollments struct {
	CourseId  string `pg:"course_id"`
	StudentId string `pg:"student_id"`
}
