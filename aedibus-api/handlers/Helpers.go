package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"os"

	"github.com/go-chi/chi"
)

func getURLQuery(key string, r *http.Request) (string, error) {
	value := chi.URLParam(r, key)
	if len(value) < 1 {
		return "", fmt.Errorf(fmt.Sprintf("Url key %s was missing\n", key))
	}
	return value, nil
}

func decodeRequestFormText(key string, r *http.Request) (string, error) {
	value := r.FormValue(key)
	if value == "" {
		return value, fmt.Errorf(fmt.Sprintf("No form value found for key: %s %s\n", key, value))
	}

	return value, nil
}

func decodeRequestFormFile(fileName string, r *http.Request) ([]byte, error) {
	err := r.ParseForm()
	if err != nil {
		return nil, err
	}

	file, header, err := r.FormFile(fileName)
	defer file.Close()
	if err != nil {
		return nil, err
	}

	bytes := make([]byte, header.Size)
	_, err = file.Read(bytes)
	if err != nil {
		return nil, err
	}

	return bytes, nil
}

func decodeRequestBody(body interface{}, r *http.Request) error {
	buffer, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		return err
	}
	return json.Unmarshal(buffer, body)
}

func encodeResponseBody(body interface{}, w http.ResponseWriter) error {
	w.Header().Set("Content-Type", "application/json")
	return json.NewEncoder(w).Encode(body)
}

func postSolutionToJenkins(submissionId string, attemptContents, testsContents []byte) (*http.Request, error) {

	// Get pom.xml contents
	pomFile, err := os.Open("./assignments/pom.xml")
	if err != nil {
		return nil, err
	}
	pomContents, err := ioutil.ReadAll(pomFile)
	if err != nil {
		return nil, err
	}
	_, err = pomFile.Stat()
	if err != nil {
		return nil, err
	}
	pomFile.Close()

	// Auth new multipart form-data writer
	body := new(bytes.Buffer)
	writer := multipart.NewWriter(body)

	// Write pom.xml, Tests.java, and Attempt.java contents to multipart form-data
	pomForm, err := writer.CreateFormFile("pom.xml", "pom.xml")
	if err != nil {
		return nil, err
	}
	pomForm.Write(pomContents)

	testsForm, err := writer.CreateFormFile("TestSuite.java", "TestSuite.java")
	if err != nil {
		return nil, err
	}
	testsForm.Write(testsContents)

	attemptForm, err := writer.CreateFormFile("Solution.java", "Solution.java")
	if err != nil {
		return nil, err
	}
	attemptForm.Write(attemptContents)

	if err := writer.WriteField("submissionId", submissionId); err != nil {
		return nil, err
	}

	// Close multipart form-data writer
	err = writer.Close()
	if err != nil {
		return nil, err
	}

	// Return request
	request, err := http.NewRequest("POST", "http://admin:11afc514a7f5d8be4a638e5dfac9929c83@jenkins:8080/job/java-jobs/buildWithParameters/?token=abc", body)
	if err != nil {
		return nil, err
	}
	request.Header.Add("Content-Type", writer.FormDataContentType())

	return request, nil
}
