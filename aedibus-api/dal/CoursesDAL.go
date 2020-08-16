package dal

import (
	"aedibus-api/models"
	"fmt"
)

/**
 * Creates a course record in Postgres.
 */
func (d *Config) CreateCourse(course *models.Courses) error {
	return d.db.Insert(course)
}

/**
 * Creates an enrollment record in Postgres.
 */
func (d *Config) CreateEnrollment(courseId, studentEmail string) error {
	res, err := d.db.
		Query(&models.Enrollments{},
			"INSERT INTO Enrollments(course_id, student_id) "+
				"SELECT ?0, student.id "+
				"FROM Users AS student "+
				"WHERE student.email = ?1", courseId, studentEmail)

	if res == nil {
		return fmt.Errorf("unknown error creating enrollment (%s,%s)", courseId, studentEmail)
	}
	if res.RowsAffected() != 1 {
		return fmt.Errorf("failed to create enrollment: (%s,%s)", courseId, studentEmail)
	}

	return err
}

/**
 * Gets a course by its ID
 */
func (d *Config) GetCourse(courseId string) (*models.GetCourseModel, error) {
	getCourseModel := &models.GetCourseModel{}
	res, err := d.db.
		Query(getCourseModel,
		"SELECT c.id, u.name as teacher_name, c.title, c.description " +
			"FROM courses AS c, users AS u " +
			"WHERE c.id = ? " +
			"AND u.id = c.teacher_id ", courseId)

	fmt.Printf("GetCourse result: %v\n%v\n%v\n", getCourseModel, res, err)

	if res == nil {
		return nil, fmt.Errorf("unknown error getting course %s", courseId)
	}

	return getCourseModel, err
}

/**
 * Gets courses that a user is teaching.
 */
func (d *Config) GetTaughtCourses(userId string) (*[]models.Courses, error) {
	taughtCourses := &[]models.Courses{}
	return taughtCourses, d.db.Model(taughtCourses).
		Where("teacher_id = ?", userId).
		Select()
}

/**
 * Gets courses that a user is teaching.
 */
func (d *Config) GetEnrolledCourses(userId string) (*[]models.Courses, error) {
	enrolledCourses := &[]models.Courses{}
	res, err := d.db.
		Query(enrolledCourses,
			"SELECT * "+
				"FROM courses AS course "+
				"WHERE course.id IN "+
				"(SELECT course_id "+
				"FROM enrollments AS enrollment "+
				"WHERE enrollment.student_id = ?)", userId)

	if res == nil {
		return nil, fmt.Errorf("unknown error getting enrolled courses for: %s", userId)
	}

	return enrolledCourses, err
}
