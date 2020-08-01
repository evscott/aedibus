package main

import (
	"encoding/xml"
	"fmt"
	"log"
	"marshaller/dal"
	"marshaller/models"
	"net/http"

	"github.com/gorilla/mux"
)

type Config struct {
	DAL    *dal.Config
	Router *mux.Router
}

func main() {
	c := &Config{
		DAL:    dal.Init(),
		Router: mux.NewRouter(),
	}
	c.Router.
		Path("/").
		Methods("POST").
		HandlerFunc(c.SaveJavaTests)

	fmt.Println("Starting...")
	log.Fatal(http.ListenAndServe(":5050", c.Router))
}

func (c *Config) SaveJavaTests(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", "*")

	err := r.ParseForm()
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}

	file, headers, err := r.FormFile("ChallengeResults.xml")
	defer file.Close()
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}

	challengeID := r.FormValue("challengeID")

	bytes := make([]byte, headers.Size)

	_, err = file.Read(bytes)
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}

	var results models.TestSuite
	xml.Unmarshal(bytes, &results)

	err = c.DAL.InsertTests(challengeID, results.TestCases)
	if err != nil {
		fmt.Print(err)
		return
	}

	w.Write([]byte("ok"))
}
