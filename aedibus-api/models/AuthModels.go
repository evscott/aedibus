package models

/** Sign Up **/

type SignUpRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type SignUpResponse struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Token    string `json:"token"`
	Teacher  bool   `json:"teacher"`
	Admin    bool   `json:"admin"`
}

/** Sign In **/

type SignInRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type SignInResponse struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Token    string `json:"token"`
	Teacher  bool   `json:"teacher"`
	Admin    bool   `json:"admin"`
}