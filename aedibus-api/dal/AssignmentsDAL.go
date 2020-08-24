package dal

import (
	"aedibus-api/models"
	"fmt"
)

/**
 * Creates an assignment record in Postgres.
 */
func (d *Config) CreateAssignment(assignment *models.Assignments) error {
	return d.db.Insert(assignment)
}

/**
 * Gets assignments by their course ID.
 */
func (d *Config) GetAssignments(courseId string) (*[]models.Assignments, error) {
	assignments := &[]models.Assignments{}
	return assignments, d.db.Model(assignments).
		Where("course_id = ?", courseId).
		Select()
}

/**
 * Gets an assignment by its ID.
 */
func (d *Config) GetAssignment(id string) (*models.Assignments, error) {
	assignment := &models.Assignments{}
	return assignment, d.db.Model(assignment).
		Where("id = ?", id).
		Select()
}

/**
 * Gets a participation list for an assignment.
 */
func (d *Config) GetAssignmentParticipation(assignmentId string) (*[]models.AssignmentParticipation, error) {
	assignmentParticipation := &[]models.AssignmentParticipation{}

	res, err := d.db.
		Query(assignmentParticipation,
			"SELECT submissions.id AS submission_id, users.id AS user_id, users.name AS user_name, CASE WHEN submissions.id IS NOT NULL THEN TRUE ELSE FALSE END AS submitted " +
			"FROM users " +
			"INNER JOIN enrollments ON users.id = enrollments.student_id " +
			"INNER JOIN assignments ON enrollments.course_id = assignments.course_id AND assignments.id = ? " +
			"LEFT JOIN submissions ON assignments.id = submissions.assignment_id AND submissions.student_id = users.id " +
			"WHERE users.teacher IS NOT TRUE " +
			"GROUP BY users.id, submissions.id", assignmentId)

	if res == nil {
		return nil, fmt.Errorf("unknown error getting assignment participtaion for: %s", assignmentId)
	}

	return assignmentParticipation, err
}
