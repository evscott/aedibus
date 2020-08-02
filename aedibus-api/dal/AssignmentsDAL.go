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

/**
 * Gets an assignment by its ID.
 */
func (d *Config) GetAssignment(id string) (*models.Assignments, error) {
	assignment := &models.Assignments{}
	return assignment, d.db.Model(assignment).
		Where("id = ?", id).
		Select()
}
