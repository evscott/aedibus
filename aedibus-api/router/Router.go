package router

import (
	"aedibus-api/handlers"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/render"
	"log"
	"net/http"
)

type Config struct {
	Routes   *chi.Mux
	handlers *handlers.Config
}

func Init() *Config {
	c := &Config{
		Routes:   chi.NewRouter(),
		handlers: handlers.Init(),
	}

	c.Routes.Use(
		render.SetContentType(render.ContentTypeJSON),
		middleware.Logger,
		middleware.Recoverer,
	)

	c.Routes.Mount("/auth", c.authRoutes())
	c.Routes.Mount("/courses", c.coursesRoutes())
	c.Routes.Mount("/assignments", c.assignmentsRoutes())
	c.Routes.Mount("/submissions", c.submissionsRoutes())

	printRoutes(c.Routes)

	return c
}

func printRoutes(router *chi.Mux) {
	walkFunc := func(method string, route string, handler http.Handler, middlewares ...func(http.Handler) http.Handler) error {
		log.Printf("%s %s\n", method, route)
		return nil
	}
	if err := chi.Walk(router, walkFunc); err != nil {
		log.Panicf("Logging err: %s\n", err.Error())
	}
}
