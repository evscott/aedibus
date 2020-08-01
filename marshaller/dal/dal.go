package dal

import (
	"fmt"
	"os"

	"github.com/go-pg/pg/v9"
)

type Config struct {
	db *pg.DB
}

func Init() *Config {

	fmt.Printf("Connecting to database...\n")

	dal := &Config{
		db: pg.Connect(&pg.Options{
			Addr:     fmt.Sprintf("%s:%s", os.Getenv("PGHOST"), os.Getenv("PGPORT")),
			User:     os.Getenv("PGUSER"),
			Password: os.Getenv("PGPASSWORD"),
			Database: os.Getenv("PGDATABASE"),
		}),
	}

	if _, err := dal.db.Exec("SELECT 1"); err != nil {
		fmt.Errorf("%v\n", err)
	}

	fmt.Printf("Connected to database at %s:%s\n", os.Getenv("PGHOST"), os.Getenv("PGPORT"))

	return dal
}
