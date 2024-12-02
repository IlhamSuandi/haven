package model

import "time"

type Booking struct {
	ID                uint      `gorm:"primaryKey;autoIncrement"`
	CustomerName      string    `gorm:"type:varchar(255);not null"`
	Gender            string    `gorm:"type:varchar(50);not null"`
	IdentityNumber    string    `gorm:"type:varchar(255);not null"`
	RoomType          string    `gorm:"type:varchar(255);not null"`
	Price             float64   `gorm:"type:float;not null"`
	BookingDate       time.Time `gorm:"not null"`
	Duration          int       `gorm:"not null"`
	IncludesBreakfast bool      `gorm:"default:false;not null"`
	TotalPrice        float64   `gorm:"type:float;not null"`
	Discount          string    `gorm:"type:varchar(10);not null"`
	CreatedAt         time.Time `gorm:"autoCreateTime`
}
