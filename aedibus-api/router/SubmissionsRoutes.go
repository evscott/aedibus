package router

import "github.com/go-chi/chi"

func (c *Config) submissionsRoutes() *chi.Mux {
	router := chi.NewRouter()
	router.Use(verifyToken)


	// Get Submission
	router.Post(pb(), c.handlers.SubmitSolution)
	router.Get(pb(ID, INSTRUCTOR), c.handlers.GetSubmissionForTeacher)
	router.Get(pb(ID), c.handlers.GetSubmissionByAssignmentID)
	router.Get(pb(ID, RESULTS), c.handlers.GetSubmissionResults)
	router.Get(pb(ID, SOLUTION), c.handlers.GetSubmissionSolution)

	return router
}
