package dal

import (
	"aedibus-api/models"
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
