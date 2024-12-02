package repository

import (
	"haven/database/model"

	"gorm.io/gorm"
)

type HotelRepository interface {
	CreateBooking(booking *model.Booking) error
}

type hotelRepository struct {
	db *gorm.DB
}

func NewHotelRepository(db *gorm.DB) HotelRepository {
	return &hotelRepository{
		db: db,
	}
}

func (hr *hotelRepository) CreateBooking(booking *model.Booking) error {
	result := hr.db.Create(&booking)
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return nil
	}

	return nil
}
