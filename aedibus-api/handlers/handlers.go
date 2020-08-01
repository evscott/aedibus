package handlers

import (
	"challenger-api/dal"
	"challenger-api/fal"
)

type Config struct {
	DAL *dal.Config
	FAL *fal.Config
}

func Init() *Config {
	handlers := &Config{
		DAL: dal.Init(),
		FAL: fal.Init(),
	}

	return handlers
}
