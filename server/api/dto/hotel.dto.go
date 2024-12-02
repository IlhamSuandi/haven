package dto

import "time"

type CreateBookingRequest struct {
	CustomerName      string    `json:"customer_name" validate:"required" example:"customer name"`
	Gender            string    `json:"gender" validate:"required" example:"male"`
	IdentityNumber    string    `json:"identity_number" validate:"required,min=16" example:"1234567890"`
	RoomType          string    `json:"room_type" validate:"required" example:"room type"`
	Price             float64   `json:"price" validate:"required" example:"100.00"`
	BookingDate       time.Time `json:"booking_date" validate:"required" example:"2022-01-01"`
	Duration          int       `json:"duration" validate:"required,number" example:"1"`
	IncludesBreakfast bool      `json:"includes_breakfast" validate:"boolean" example:"true"`
	TotalPrice        float64   `json:"total_price" validate:"required" example:"1000.00"`
}
