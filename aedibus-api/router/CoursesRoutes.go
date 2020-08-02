package router

import "github.com/go-chi/chi"

func (c *Config) coursesRoutes() *chi.Mux {
	router := chi.NewRouter()
	router.Use(verifyToken)

	// Create Course
	router.Post(pb(), c.handlers.CreateCourse)
	// Get Course
	router.Get(pb(), c.handlers.GetCourses)
	// Get Courses
	router.Get(pb(ID), c.handlers.GetCourse)

	return router
}
