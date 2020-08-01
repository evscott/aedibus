package handlers

import (
	"challenger-api/fal"
	"challenger-api/models"
	"fmt"
	"net/http"

	"github.com/go-chi/render"
)

func (c *Config) CreateChallenge(w http.ResponseWriter, r *http.Request) {
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	userID := r.Context().Value("userID").(string)
	fmt.Printf("User: %v\n", userID)

	challengerID, err := decodeRequestFormText("challengerID", r)
	if err != nil {
		fmt.Printf("%v\n", err)
	}

	challenge := &models.Challenge{
		CreatorID:    userID,
		ChallengerID: challengerID,
	}

	readme, err := decodeRequestFormFile("README.md", r)
	if err != nil {
		fmt.Printf("%v\n", err)
	}
	tests, err := decodeRequestFormFile("tests.java", r)
	if err != nil {
		fmt.Printf("%v\n", err)
	}

	err = c.DAL.CreateChallenge(challenge)
	if err != nil {
		fmt.Printf("%v\n", err)
	}
	err = c.FAL.CreateFile(fal.README, challenge.ID, readme)
	if err != nil {
		fmt.Printf("%v\n", err)
	}
	err = c.FAL.CreateFile(fal.Tests, challenge.ID, tests)
	if err != nil {
		fmt.Printf("%v\n", err)
	}

	render.JSON(w, r, challenge)
}

func (c *Config) GetChallenges(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("userID").(string)

	getReceivedChallengesRes, err := c.DAL.GetReceivedChallenges(userID)
	if err != nil {
		fmt.Printf("%v\n", err)
	}

	getSentChallengesRes, err := c.DAL.GetSentChallenges(userID)
	if err != nil {
		fmt.Printf("%v\n", err)
	}

	getChallengesRes := &models.GetChallengesRes{
		Received: getReceivedChallengesRes,
		Sent:     getSentChallengesRes,
	}

	render.JSON(w, r, getChallengesRes)
}

func (c *Config) GetChallengeFile(w http.ResponseWriter, r *http.Request) {
	challengeID, err := getURLQuery("id", r)
	if err != nil {
		fmt.Printf("%v\n", err)
	}

	val, err := getURLQuery("fileType", r)
	if err != nil {
		fmt.Printf("%v\n", err)
	}

	fileType := fal.FileType(val)
	if fileType != fal.Tests || fileType != fal.README {
		fmt.Printf("Invalid file type\n")
	}

	challenge := &models.Challenge{
		ID: challengeID,
	}

	err = c.DAL.GetChallenge(challenge)
	if err != nil {
		fmt.Printf("%v\n", err)
	}

	readme, err := c.FAL.GetFile(fileType, challenge.ID)
	if err != nil {
		fmt.Printf("%v\n", err)
	}

	render.Data(w, r, readme)
}

func (c *Config) DeleteChallenge(w http.ResponseWriter, r *http.Request) {
	response := make(map[string]string)
	render.JSON(w, r, response)
}

func (c *Config) GetChallengeResults(w http.ResponseWriter, r *http.Request) {
	challengeResults := models.ChallengeResults{}
	render.JSON(w, r, challengeResults)
}

func (c *Config) AttemptChallenge(w http.ResponseWriter, r *http.Request) {

	// Decode incoming request form data
	challengeID, err := decodeRequestFormText("challengeID", r)
	if err != nil {
		fmt.Printf("%v\n", err)
	}
	attemptContents, err := decodeRequestFormFile("Attempt.java", r)
	if err != nil {
		fmt.Printf("%v\n", err)
	}

	// Retrieve challenge tests contents
	testsContents, err := c.FAL.GetFile(fal.Tests, challengeID)
	if err != nil {
		fmt.Printf("%v\n", err)
	}

	// Send challenge request to Jenkins
	request, err := encodeChallengeFormData("http://admin:118b1cf6081be7f5c9ea7e059fce2da332@jenkins:8080/job/java-jobs/buildWithParameters/?token=abc", challengeID, attemptContents, testsContents)
	if err != nil {
		fmt.Print(err)
	}
	client := &http.Client{}
	_, err = client.Do(request)
	if err != nil {
		fmt.Print(err)
	}

	// Set challenge state to 'running'
	if err := c.DAL.SetChallengeToRunning(challengeID); err != nil {
		fmt.Print(err)
	}

	render.JSON(w, r, nil)
}
