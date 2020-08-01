package dal

import "challenger-api/models"

func (d *Config) CreateUser(user *models.User) error {
	return d.db.Insert(user)
}

func (d *Config) GetUserByEmailAndPassword(user *models.User) error {
	return d.db.Model(user).
		Where("email = ?email").
		Where("password = ?password").
		Select()
}

func (d *Config) DeleteUser(user *models.User) error {
	_, err := d.db.Model(user).WherePK().Delete()
	return err
}
