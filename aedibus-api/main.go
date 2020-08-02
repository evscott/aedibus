package main

import (
	"aedibus-api/router"
	"github.com/rs/cors"
	"log"
	"net/http"
)

func main() {
	routerConfig := router.Init()

	handler := cors.AllowAll().Handler(routerConfig.Routes)
	log.Fatal(http.ListenAndServe(":2020", handler))
}
