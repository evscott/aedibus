package jwt_helpers

import (
	"github.com/dgrijalva/jwt-go"
	"os"
	"time"
)

type Claims struct {
	jwt.StandardClaims
	UserID string `json:"userID"`
}

func IssueToken(userID string) (string, error) {
	claims := &Claims{
		UserID: userID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(24 * time.Hour).Unix(),
		},
	}

	rawToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return rawToken.SignedString([]byte(os.Getenv("PRIVATEKEY")))
}

func DecodeToken(token string) (*jwt.Token, *Claims, error) {
	claims := &Claims{}
	decodedToken, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("PRIVATEKEY")), nil
	})
	if err != nil {
		return nil, nil, err
	}

	return decodedToken, claims, nil
}
