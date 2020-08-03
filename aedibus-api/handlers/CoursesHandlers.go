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

	userID := r.Context().Value("userID").(string)

	fmt.Printf("Got userID %v, %v\n", userID, r.Body)

	createCourseRequest := &models.CreateCourseRequest{}
	if err := decodeRequestBody(createCourseRequest, r); err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	fmt.Printf("Got request: %v\n", createCourseRequest)

	course := &models.Courses{
		TeacherId:   userID,
		Title:       createCourseRequest.Title,
		Description: createCourseRequest.Description,
	}

	// Create the course and enroll every student
	// from the list provided
	if err := c.DAL.CreateCourse(course); err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	fmt.Printf("Created course: %v", createCourseRequest)

	// If a student is successfully enrolled, add to list of enrolled students
	// that is included in the response
	var enrolledStudents []string
	for _, student := range createCourseRequest.StudentList {
		if err := c.DAL.CreateEnrollment(course.ID, student); err != nil {
			fmt.Println(err)
		} else {
			enrolledStudents = append(enrolledStudents, student)
		}
	}

	createCourseResponse := &models.CreateCourseResponse{
		ID:          course.ID,
		TeacherName: course.TeacherId,
		Title:       course.Title,
		Description: course.Description,
		StudentList: enrolledStudents,
	}

	render.JSON(w, r, createCourseResponse)
}

func (c *Config) GetTaughtCourses(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", "*")

	fmt.Println("Requesting GetEnrolledCourses")
	userID := r.Context().Value("userID").(string)

	taughtCourses, err := c.DAL.GetTaughtCourses(userID)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	getCoursesResponse := &models.GetCoursesResponse{
		Courses: *taughtCourses,
	}

	render.JSON(w, r, getCoursesResponse)
}

func (c *Config) GetEnrolledCourses(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", "*")

	fmt.Println("Requesting GetEnrolledCourses")
	userID := r.Context().Value("userID").(string)

	enrolledCourses, err := c.DAL.GetEnrolledCourses(userID)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	getCoursesResponse := &models.GetCoursesResponse{
		Courses: *enrolledCourses,
	}

	render.JSON(w, r, getCoursesResponse)
}

func (c *Config) GetCourse(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", "*")

	fmt.Println("Requesting GetCourse")

	courseId, err := getURLQuery("id", r)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	course := &models.Courses{
		ID: courseId,
	}
	if err := c.DAL.GetCourse(course); err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	assignments, err := c.DAL.GetAssignments(course.ID)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	getCourseResponse := &models.GetCourseResponse{
		ID:          course.ID,
		TeacherId:   course.TeacherId,
		Title:       course.Title,
		Description: course.Description,
		Assignments: *assignments,
	}

	render.JSON(w, r, getCourseResponse)
}
