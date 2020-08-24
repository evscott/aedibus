package router

import "github.com/go-chi/chi"

func (c *Config) assignmentsRoutes() *chi.Mux {
	router := chi.NewRouter()
	router.Use(verifyToken)

	// Create Assignment
	router.Post(pb(), c.handlers.CreateAssignment)
	// Get Assignment
	router.Get(pb(ID), c.handlers.GetAssignment)
	// Get Assignment Test Suite
	router.Get(pb(ID, TEST_SUITE), c.handlers.GetTestSuite)
	// Get Assignment Readme
	router.Get(pb(ID, README), c.handlers.GetReadme)
	// Get Assignment Participation
	router.Get(pb(ID, PARTICIPATION), c.handlers.GetParticipationList)

	return router
}
