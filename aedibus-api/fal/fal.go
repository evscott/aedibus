package fal

import (
	"context"
	"fmt"

	"code.sajari.com/storage"
)

type FileType string

const (
	README    FileType = "README.md"
	TestSuite FileType = "TestSuite.java"
	Solution  FileType = "Solution.java"
)

type Config struct{}

func Init() *Config {
	return &Config{}
}

func (c *Config) GetFile(fileType FileType, assignmentId string) ([]byte, error) {
	ctx := context.Background()

	local := storage.Local(fmt.Sprintf("./assignments/%s", assignmentId))
	f, err := local.Open(ctx, string(fileType))
	if err != nil {
		fmt.Printf("error opening file")
		return nil, err
	}

	file := make([]byte, f.Size)
	_, err = f.Read(file)
	if err != nil {
		fmt.Printf("error reading the file")
		return nil, err
	}

	err = f.Close()
	if err != nil {
		fmt.Printf("error closing the file")
		return nil, err
	}

	return file, nil
}

func (c *Config) GetSolution(submissionId, assignmentId string) ([]byte, error) {
	ctx := context.Background()

	fmt.Printf("Gonna open ./assignments/%s/%s.java\n", assignmentId, submissionId);

	local := storage.Local(fmt.Sprintf("./assignments/%s", assignmentId))
	f, err := local.Open(ctx, fmt.Sprintf("%s.java", submissionId))
	if err != nil {
		fmt.Printf("error opening file")
		return nil, err
	}

	file := make([]byte, f.Size)
	_, err = f.Read(file)
	if err != nil {
		fmt.Printf("error reading the file")
		return nil, err
	}

	err = f.Close()
	if err != nil {
		fmt.Printf("error closing the file")
		return nil, err
	}

	return file, nil
}

func (c *Config) CreateFile(fileType FileType, assignmentId string, file []byte) error {
	ctx := context.Background()

	local := storage.Local(fmt.Sprintf("./assignments/%s", assignmentId))
	f, err := local.Create(ctx, string(fileType))
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

func (c *Config) CreateSolution(assignmentId, submissionsId string, file []byte) error {
	ctx := context.Background()

	local := storage.Local(fmt.Sprintf("./assignments/%s", assignmentId))
	f, err := local.Create(ctx, fmt.Sprintf("%s.java", submissionsId))
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

func (c *Config) DeleteFile(fileType FileType, assignmentId string) error {
	ctx := context.Background()

	local := storage.Local(fmt.Sprintf("./assignments/%s", assignmentId))
	err := local.Delete(ctx, string(fileType))
	if err != nil {
		return err
	}

	return nil
}
