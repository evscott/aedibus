package handlers

import (
	"aedibus-api/models"
	"fmt"
	"net/http"

	"github.com/go-chi/render"
)

func (c *Config) CreateCourse(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", "*")

	fmt.Println("Requesting CreateCourse")

	createCourseRequest := &models.CreateCourseRequest{}
	err := decodeRequestBody(createCourseRequest, r)
	if err != nil {
		fmt.Printf("%v\n", err)
	}

	// TODO create course here

	createCourseResponse := &models.CreateCourseResponse{}

	render.JSON(w, r, createCourseResponse)
}

func (c *Config) GetCourses(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", "*")

	fmt.Println("Requesting GetCourses")

	// TODO get courses here


	getCoursesResponse := &models.GetCoursesResponse{}

	render.JSON(w, r, getCoursesResponse)
}


func (c *Config) GetCourse(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", "*")

	fmt.Println("Requesting GetCourse")

	getCourseRequest := &models.GetCourseRequest{}
	err := decodeRequestBody(getCourseRequest, r)
	if err != nil {
		fmt.Printf("%v\n", err)
	}

	// TODO get course here
	// TODO get assignments for course here

	getCourseResponse := &models.GetCourseResponse{}

	render.JSON(w, r, getCourseResponse)
}