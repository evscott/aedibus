package handlers

import (
	"aedibus-api/dal"
	"aedibus-api/fal"
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
