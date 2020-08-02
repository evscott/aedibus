package router

import "github.com/go-chi/chi"

func (c *Config) authRoutes() *chi.Mux {
	router := chi.NewRouter()

	/** Sign Up **/
	router.Post("/", c.handlers.SignUp)
	/** Sign In **/
	router.Put("/", c.handlers.SignIn)
	return router
}
