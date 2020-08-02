package models

type User struct {
	ID       string `pg:"id"`
	Name     string `pg:"name"`
	Email    string `pg:"email"`
	Password string `pg:"password"`
	Teacher  bool   `pg:"teacher"`
	Admin    bool   `pg:"admin"`
}
