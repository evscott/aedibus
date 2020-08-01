package fal

import (
	"context"
	"fmt"

	"code.sajari.com/storage"
)

type FileType string

const (
	README FileType = "README.md"
	Tests  FileType = "Tests.java"
)

type Config struct{}

func Init() *Config {
	return &Config{}
}

func (c *Config) GetFile(ft FileType, cid string) ([]byte, error) {
	ctx := context.Background()

	local := storage.Local(fmt.Sprintf("./challenges/%s", cid))
	f, err := local.Open(ctx, string(ft))
	if err != nil {
		return nil, err
	}

	readme := make([]byte, f.Size)
	_, err = f.Read(readme)
	if err != nil {
		return nil, err
	}

	err = f.Close()
	if err != nil {
		return nil, err
	}

	return readme, nil
}

func (c *Config) CreateFile(ft FileType, cid string, file []byte) error {
	ctx := context.Background()

	local := storage.Local(fmt.Sprintf("./challenges/%s", cid))
	f, err := local.Create(ctx, string(ft))
	if err != nil {
		return err
	}

	_, err = f.Write(file)
	if err != nil {
		return err
	}

	err = f.Close()
	if err != nil {
		return err
	}

	return nil
}

func (c *Config) DeleteFile(ft FileType, cid string) error {
	ctx := context.Background()

	local := storage.Local(fmt.Sprintf("./%s", cid))
	err := local.Delete(ctx, string(ft))
	if err != nil {
		return err
	}

	return nil
}
