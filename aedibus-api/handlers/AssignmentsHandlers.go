package handlers

import (
	"aedibus-api/models"
	"fmt"
	"github.com/go-chi/render"
	"net/http"
)

func (c *Config) CreateAssignment(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", "*")

	fmt.Println("Requesting CreateAssignment")

	createAssignmentResponse := &models.CreateAssignmentResponse{}

	render.JSON(w, r, createAssignmentResponse)
}

func (c *Config) GetAssignment(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", "*")

	fmt.Println("Requesting GetAssignment")

	getAssignmentRequest := &models.GetAssignmentRequest{}
	err := decodeRequestBody(getAssignmentRequest, r)
	if err != nil {
		fmt.Errorf("%v\n", err)
	}

	// TODO get assignment here

	getAssignmentResponse := &models.GetAssignmentResponse{}

	render.JSON(w, r, getAssignmentResponse)
}

func (c *Config) GetTestSuite(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", "*")

	fmt.Println("Requesting GetTestSuite")

	// getTestSuiteRequest := &models.GetTestSuiteRequest{}
	// TODO get test suite here

	render.JSON(w, r, nil)
}

func (c *Config) GetReadme(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", "*")

	fmt.Println("Requesting GetReadme")

	// getReadmeRequest := &models.GetReadmeRequest{}
	// TODO get Readme here

	render.JSON(w, r, nil)
}
