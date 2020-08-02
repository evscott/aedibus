package dal

import (
	"fmt"
	"marshaller/models"
)

func (d *Config) InsertTests(submissionId string, testCases models.TestCases) error {
	for _, t := range testCases {
		test := &models.Test{
			SubmissionId: submissionId,
			Name:        t.Name,
			Time:        t.Time,
		}
		if (models.Failure{}) != t.Failure {
			test.Failure = true
			test.Message = t.Failure.Message
		}
		fmt.Printf("inserting for %v\n", test)
		err := d.db.Insert(test)
		if err != nil {
			fmt.Printf("Error inserting: %v\n", err)
			return err
		}
	}
	return nil
}
