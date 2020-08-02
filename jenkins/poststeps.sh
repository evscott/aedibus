cat target/surefire-reports/TEST-assignment.TestSuite.xml
curl -X POST -F "submissionId=${submissionId}" -F "TestResults=@target/surefire-reports/TEST-assignment.TestSuite.xml" marshaller:5050