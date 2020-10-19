package dal

import "aedibus-api/models"

func (d *Config) CreateUser(user *models.User) error {
	return d.db.Insert(user)
}

func (d *Config) EmailIsTaken(email string) (bool, error) {
	count, err := d.db.Model(&models.User{}).
		Where("email = ?", email).
		Count()
	return count != 0, err
}

func (d *Config) GetUserByEmailAndPassword(user *models.User) error {
	return d.db.Model(user).
		Where("email = ?email").
		Where("password = ?password").
		Select()
}

func (d *Config) GetUserById(id string) (*models.User, error) {
	user := &models.User{}
	return user, d.db.Model(user).
		Where("id = ?", id).
		Select()
}

func (d *Config) DeleteUser(user *models.User) error {
	_, err := d.db.Model(user).WherePK().Delete()
	return err
}
