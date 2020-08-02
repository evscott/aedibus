package handlers

import (
	"aedibus-api/jwt_helpers"
	"aedibus-api/models"
	"fmt"
	"net/http"

	"github.com/go-chi/render"
)

func (c *Config) SignUp(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Requesting SignUp")

	signUpRequest := &models.SignUpRequest{}
	err := decodeRequestBody(signUpRequest, r)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	user := &models.User{
		Name:     signUpRequest.Name,
		Email:    signUpRequest.Email,
		Password: signUpRequest.Password,
	}

	err = c.DAL.CreateUser(user)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	token, err := jwt_helpers.IssueToken(user.ID)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	res := &models.SignUpResponse{
		ID:    user.ID,
		Name:  user.Name,
		Email: user.Email,
		Token: token,
		Teacher: user.Teacher,
		Admin: user.Admin,
	}

	render.JSON(w, r, res)
}

func (c *Config) SignIn(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Requesting SignIn")

	signInRequest := &models.SignInRequest{}
	err := decodeRequestBody(signInRequest, r)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	user := &models.User{
		Email:    signInRequest.Email,
		Password: signInRequest.Password,
	}

	err = c.DAL.GetUserByEmailAndPassword(user)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	token, err := jwt_helpers.IssueToken(user.ID)
	if err != nil {
		render.Status(r, 500)
		render.JSON(w, r, err)
		return
	}

	res := &models.SignInResponse{
		ID:    user.ID,
		Name:  user.Name,
		Email: user.Email,
		Token: token,
		Teacher: user.Teacher,
		Admin: user.Admin,
	}

	render.JSON(w, r, res)
}
