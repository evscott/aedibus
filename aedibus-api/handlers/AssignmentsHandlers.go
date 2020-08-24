package handlers

import (
	"aedibus-api/fal"
	"aedibus-api/models"
	"fmt"
	"github.com/go-chi/render"
	"net/http"
)

func (c *Config) CreateAssignment(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", "*")

	fmt.Println("Requesting CreateAssignment")

	// Get request values
	courseId, err := decodeRequestFormText("courseId", r)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	title, err := decodeRequestFormText("title", r)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	testSuite, err := decodeRequestFormFile("TestSuite.java", r)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	readme, err := decodeRequestFormFile("README.md", r)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	// Create assignment record in Postgres
	assignment := &models.Assignments{
		CourseId: courseId,
		Title:    title,
	}
	if err := c.DAL.CreateAssignment(assignment); err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	// Store README and TestSuite.java file locally
	err = c.FAL.CreateFile(fal.README, assignment.ID, readme)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}
	fmt.Println("Stored README.md")
	err = c.FAL.CreateFile(fal.TestSuite, assignment.ID, testSuite)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}
	fmt.Println("Stored TestSuite.java")

	createAssignmentResponse := &models.CreateAssignmentResponse{
		ID:       assignment.ID,
		CourseId: assignment.CourseId,
		Title:    assignment.Title,
	}

	render.JSON(w, r, createAssignmentResponse)
}

func (c *Config) GetAssignment(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", "*")

	fmt.Println("Requesting GetAssignment")

	assignmentId, err := getURLQuery("id", r)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	assignment, err := c.DAL.GetAssignment(assignmentId)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	getAssignmentResponse := &models.GetAssignmentResponse{
		ID:       assignment.ID,
		CourseId: assignment.CourseId,
		Title:    assignment.Title,
	}

	render.JSON(w, r, getAssignmentResponse)
}

func (c *Config) GetTestSuite(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", "*")

	fmt.Println("Requesting GetTestSuite")

	assignmentId, err := getURLQuery("id", r)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	testSuite, err := c.FAL.GetFile(fal.TestSuite, assignmentId)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	render.Data(w, r, testSuite)
}

func (c *Config) GetReadme(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", "*")

	fmt.Println("Requesting GetReadme")

	assignmentId, err := getURLQuery("id", r)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	readme, err := c.FAL.GetFile(fal.README, assignmentId)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	render.Data(w, r, readme)
}

func (c *Config) GetParticipationList(w http.ResponseWriter, r *http.Request) {

	fmt.Println("Requesting GetParticipationList")

	assignmentId, err := getURLQuery("id", r)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	participationList, err := c.DAL.GetAssignmentParticipation(assignmentId)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	render.JSON(w, r, participationList)
}
