package postgres

import "gorm.io/gorm"

type User struct {
	ID    uint
	Name  string
	Email string
}

type UserRepo struct {
	db *gorm.DB
}

func NewUserRepo(db *gorm.DB) *UserRepo {
	return &UserRepo{db: db}
}

func (r *UserRepo) CreateUser(user User) error {
	return r.db.Create(&user).Error
}
