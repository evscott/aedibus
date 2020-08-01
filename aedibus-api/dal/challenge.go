package dal

import (
	"challenger-api/models"
	"fmt"
)

func (d *Config) CreateChallenge(challenge *models.Challenge) error {
	return d.db.Insert(challenge)
}

func (d *Config) DeleteChallenge(challenge *models.Challenge) error {
	_, err := d.db.Model(challenge).WherePK().Delete()
	return err
}

func (d *Config) GetChallenge(challenge *models.Challenge) error {
	return d.db.Model(challenge).
		WherePK().
		Select()
}

func (d *Config) GetReceivedChallenges(userID string) (*models.Challenges, error) {
	challenges := &models.Challenges{}
	return challenges, d.db.Model(challenges).
		Where("challenger_id = ?", userID).
		Select()
}

func (d *Config) GetSentChallenges(userID string) (*models.Challenges, error) {
	challenges := &models.Challenges{}
	return challenges, d.db.Model(challenges).
		Where("creator_id = ?", userID).
		Select()
}

func (d *Config) SetChallengeToRunning(challengeID string) error {
	res, err := d.db.Model(&models.Challenge{}).
		Set("state = running").
		Where("challenge_id = ?", challengeID).
		Update()
	if res.RowsAffected() == 0 {
		fmt.Printf("SetChallengeToRunning failed %v\n", res)
	}
	return err
}
