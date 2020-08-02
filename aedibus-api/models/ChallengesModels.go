package models

type Challenge struct {
	ID           string `json:"id",pg:"id"`
	ChallengerID string `json:"challengerID",pg:"challenger_id"`
	CreatorID    string `json:"creatorID",pg:"creator_id"`
	State        string `json:"state",pg:"state"`
}

type Challenges []Challenge

type ChallengeResults struct {
	ChallengeID string `pg:"challenge_id"`
	TestsRan    string `pg:"tests_ran"`
	TestsPassed string `pg:"tests_passed"`
}

type GetChallengesRes struct {
	Received *Challenges `json:"received"`
	Sent     *Challenges `json:"sent"`
}

type GetChallengeRes struct {
	ID           string `json:"id"`
	ChallengerID string `json:"challengerID"`
	CreatorID    string `json:"creatorID"`
	Tests        []byte `json:"tests"`
	README       []byte `json:"readme"`
}
