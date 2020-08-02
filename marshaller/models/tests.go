package models

import "encoding/xml"

type TestSuite struct {
	XMLName   xml.Name   `xml:"testsuite"`
	Time      float32    `xml:"time,attr"`
	Tests     int        `xml:"tests,attr"`
	Failures  int        `xml:"failures,attr"`
	TestCases []TestCase `xml:"testcase"`
}

type TestCases []TestCase

type TestCase struct {
	XMLName xml.Name `xml:"testcase"`
	Name    string   `xml:"name,attr"`
	Time    float32  `xml:"time,attr"`
	Failure Failure  `xml:"failure"`
}

type Failure struct {
	XMLName xml.Name `xml:"failure"`
	Message string   `xml:"message,attr"`
}

type Test struct {
	SubmissionId string  `pg:"submission_id"`
	Name         string  `pg:"name"`
	Time         float32 `pg:"time"`
	Message      string  `pg:"message"`
	Failure      bool    `pg:"failure"`
}
