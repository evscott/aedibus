package dal

import (
	"aedibus-api/models"
)

/**
 * Creates an assignment record in Postgres.
 */
func (d *Config) CreateSubmission(submission *models.Submissions) error {
	return d.db.Insert(submission)
}

/**
 * Gets a submission from Postgres.
 */
func (d *Config) GetSubmission(submissionId string) (*models.Submissions, error) {
	submission := &models.Submissions{}
	return submission, d.db.Model(submission).
		Where("id = ?", submissionId).
		Select()
}

/**
 * Gets a submission from Postgres by assignment ID.
 */
func (d *Config) GetSubmissionByAssignmentId(assignmentId, studentId string) (*models.Submissions, error) {
	submission := &models.Submissions{}
	return submission, d.db.Model(submission).
		Where("assignment_id = ?", assignmentId).
		Where("student_id = ?", studentId).
		Select()
}

/**
 * Gets test results from Postgres
 */
func (d *Config) GetTestResults(submissionId string) (*[]models.Tests, error) {
	testResults := &[]models.Tests{}
	return testResults, d.db.Model(testResults).
		Where("submission_id = ?", submissionId).
		Select()
}
