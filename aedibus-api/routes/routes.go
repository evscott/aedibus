package routes

import (
	"challenger-api/handlers"
	"challenger-api/jwt_helpers"
	"context"
	"fmt"
	"net/http"

	"github.com/go-chi/chi"
)

type Config struct {
	Handlers *handlers.Config
}

func Init() *Config {
	routes := &Config{
		Handlers: handlers.Init(),
	}

	return routes
}

func (c *Config) Open() *chi.Mux {
	router := chi.NewRouter()
	router.Post("/auth", c.Handlers.SignUp)
	router.Put("/auth", c.Handlers.SignIn)

	return router
}

func (c *Config) User() *chi.Mux {
	router := chi.NewRouter()
	router.Use(VerifyToken)

	router.Post("/challenges", c.Handlers.CreateChallenge)
	router.Get("/challenges", c.Handlers.GetChallenges)
	router.Get("/challenge/{id}/{fileType}", c.Handlers.GetChallengeFile)
	router.Delete("/challenges/{id}", c.Handlers.DeleteChallenge)
	router.Get("/challenges/{id}/results", c.Handlers.GetChallengeResults)
	router.Delete("/user", c.Handlers.DeleteUser)
	router.Post("/attempt", c.Handlers.AttemptChallenge)

	return router
}

/** Middlewares **/

func VerifyToken(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("ac-token")

		decodedToken, claims, err := jwt_helpers.DecodeToken(token)
		if err != nil {
			fmt.Printf("%v\n", err)
		}
		if !decodedToken.Valid {
			fmt.Printf("%v\n", err)
		}

		ctx := context.WithValue(r.Context(), "userID", claims.UserID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
