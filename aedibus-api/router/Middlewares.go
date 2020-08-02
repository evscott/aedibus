package router

import (
	"aedibus-api/jwt_helpers"
	"context"
	"fmt"
	"github.com/go-chi/render"
	"net/http"
)

func verifyToken(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("aedibus-api-token")
		if len(token) == 0 {
			fmt.Println("Token not provided")
			render.Status(r, 400)
			render.JSON(w, r, nil)
			return
		}

		decodedToken, claims, err := jwt_helpers.DecodeToken(token)
		if err != nil {
			fmt.Printf("%v\n", err)
			render.Status(r, 400)
			render.JSON(w, r, nil)
			return
		}
		if !decodedToken.Valid {
			fmt.Printf("%v\n", err)
			render.Status(r, 400)
			render.JSON(w, r, nil)
			return
		}

		ctx := context.WithValue(r.Context(), "userID", claims.UserID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
