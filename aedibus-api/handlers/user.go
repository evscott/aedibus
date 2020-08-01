package handlers

import (
	"challenger-api/jwt_helpers"
	"challenger-api/models"
	"fmt"
	"net/http"

	"github.com/go-chi/render"
)

func (c *Config) SignUp(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("Hitting signup\n")

	user := &models.User{}
	err := decodeRequestBody(user, r)
	if err != nil {
		fmt.Printf("%v\n", err)
	}

	fmt.Printf("user stuff %v %v\n", user, err)

	err = c.DAL.CreateUser(user)
	if err != nil {
		fmt.Printf("%v\n", err)
	}

	token, err := jwt_helpers.IssueToken(user.ID)
	if err != nil {
		fmt.Printf("%v\n", err)
	}

	res := &models.SignupRes{
		ID:    user.ID,
		Name:  user.Name,
		Email: user.Email,
		Token: token,
	}

	render.JSON(w, r, res)
}

func (c *Config) SignIn(w http.ResponseWriter, r *http.Request) {
	user := &models.User{}
	err := decodeRequestBody(user, r)
	if err != nil {
		fmt.Printf("%v\n", err)
	}

	err = c.DAL.GetUserByEmailAndPassword(user)
	if err != nil {
		fmt.Printf("%v\n", err)
	}

	token, err := jwt_helpers.IssueToken(user.ID)
	if err != nil {
		fmt.Printf("%v\n", err)
	}

	res := &models.SignInRes{
		ID:    user.ID,
		Name:  user.Name,
		Email: user.Email,
		Token: token,
	}

	render.JSON(w, r, res)
}

func (c *Config) DeleteUser(w http.ResponseWriter, r *http.Request) {
	user := &models.User{
		ID: r.Context().Value("userID").(string),
	}

	err := c.DAL.DeleteUser(user)
	if err != nil {
		fmt.Printf("%v\n", err)
	}

	render.JSON(w, r, nil)
}
