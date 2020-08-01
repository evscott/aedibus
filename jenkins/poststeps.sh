cat target/surefire-reports/TEST-challenges.TestChallenge.xml
curl -X POST -F "SimpleTest=@target/surefire-reports/TEST-challenges.TestChallenge.xml" marshaller:5050