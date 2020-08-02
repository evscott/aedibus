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
		HandlerFunc(c.MarshallJavaTestResults)

	fmt.Println("Listening...")
	log.Fatal(http.ListenAndServe(":5050", c.Router))
}

func (c *Config) MarshallJavaTestResults(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", "*")

	fmt.Println("Marshalling Java test results")

	err := r.ParseForm()
	if err != nil {
		fmt.Printf("Failed to parse form: err %v\n", err)
		w.Write([]byte(err.Error()))
		return
	} else {
		fmt.Println("Parsed form")
	}

	file, headers, err := r.FormFile("TestResults")
	defer file.Close()
	if err != nil {
		fmt.Printf("Failed to get TestResults: err: %v\n", err)
		w.Write([]byte(err.Error()))
		return
	}  else {
		fmt.Println("Got Tests")
	}

	submissionId := r.FormValue("submissionId")
	if len(submissionId) == 0 {
		fmt.Println("Failed to get submissionId")
		w.Write(nil)
		return
	}

	bytes := make([]byte, headers.Size)
	_, err = file.Read(bytes)
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}

	var results models.TestSuite
	xml.Unmarshal(bytes, &results)

	fmt.Printf("Printing results: %v\n", results)

	err = c.DAL.InsertTests(submissionId, results.TestCases)
	if err != nil {
		fmt.Print(err)
		return
	}

	w.Write([]byte("ok"))
}
