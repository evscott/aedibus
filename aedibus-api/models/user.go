package models

type User struct {
	ID       string `json:"id",pg:"id"`
	Name     string `json:"name",pg:"name"`
	Email    string `json:"email",pg:"email"`
	Password string `json:"password",pg:"password"`
}
