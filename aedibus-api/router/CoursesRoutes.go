package router

import "github.com/go-chi/chi"

func (c *Config) coursesRoutes() *chi.Mux {
	router := chi.NewRouter()
	router.Use(verifyToken)

	// Create Course
	router.Post(pb(), c.handlers.CreateCourse)
	// Get Taught Courses
	router.Get(pb(TAUGHT), c.handlers.GetTaughtCourses)
	// Get Enrolled Courses
	router.Get(pb(ENROLLED), c.handlers.GetEnrolledCourses)
	// Get Courses
	router.Get(pb(ID), c.handlers.GetCourse)

	return router
}
