package handlers

import (
	"aedibus-api/fal"
	"aedibus-api/models"
	"fmt"
	"github.com/go-chi/render"
	"net/http"
)

func (c *Config) SubmitSolution(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", "*")

	fmt.Println("Requesting SubmitSolution")

	userID := r.Context().Value("userID").(string)
	assignmentId, err := decodeRequestFormText("assignmentId", r)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}
	solution, err := decodeRequestFormFile("Solution.java", r)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	// Create a record of the submission in Postgres, and store the solution file locally
	submission := &models.Submissions{
		AssignmentId: assignmentId,
		StudentId:    userID,
	}
	if err := c.DAL.CreateSubmission(submission); err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}
	if err := c.FAL.CreateSolution(assignmentId, submission.ID, solution); err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	// Get assignment TestSuite.java by its assignment ID
	testSuite, err := c.FAL.GetFile(fal.TestSuite, assignmentId)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	// Post the solution to Jenkins
	request, err := postSolutionToJenkins(submission.ID, solution, testSuite)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}
	client := &http.Client{}
	_, err = client.Do(request)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	submissionResponse := &models.CreateSubmissionResponse{
		ID:           submission.ID,
		AssignmentId: submission.AssignmentId,
		StudentId:    submission.StudentId,
	}

	render.JSON(w, r, submissionResponse)
}

func (c *Config) GetSubmissionResults(w http.ResponseWriter, r *http.Request) {

	fmt.Println("Requesting GetSubmissionResults")

	submissionId, err := getURLQuery("id", r)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	// Get submission and test results
	submission, err := c.DAL.GetSubmission(submissionId)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	testResults, err := c.DAL.GetTestResults(submission.ID)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	getSubmissionResponse := &models.GetSubmissionResponse{
		ID:           submission.ID,
		AssignmentId: submission.AssignmentId,
		StudentId:    submission.StudentId,
		TestResults:  *testResults,
	}

	render.JSON(w, r, getSubmissionResponse)
}
