package usecase

import (
	"haven/database/model"
	"haven/repository"
	"haven/utils"

	"github.com/sirupsen/logrus"
)

type HotelUsecase interface {
	CreateBooking(booking *model.Booking) error
}

type hotelUsecase struct {
	Logger          *logrus.Logger
	hotelRepository repository.HotelRepository
}

func NewHotelUsecase(hotelRepository repository.HotelRepository) HotelUsecase {
	return &hotelUsecase{
		Logger:          utils.Log,
		hotelRepository: hotelRepository,
	}
}

func (eu *hotelUsecase) CreateBooking(booking *model.Booking) error {
	return eu.hotelRepository.CreateBooking(booking)
}
