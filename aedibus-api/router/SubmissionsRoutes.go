package router

import "github.com/go-chi/chi"

func (c *Config) submissionsRoutes() *chi.Mux {
	router := chi.NewRouter()
	router.Use(verifyToken)


	// Get Submission
	router.Post(pb(), c.handlers.SubmitSolution)
	router.Get(pb(ID, RESULTS), c.handlers.GetSubmissionResults)

	return router
}
