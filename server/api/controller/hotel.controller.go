package controller

import (
	"haven/api/dto"
	"haven/database/model"
	"haven/pkg/response"
	"haven/types"
	"haven/usecase"
	"haven/utils"
	"net/http"

	"github.com/sirupsen/logrus"
)

type HotelController struct {
	Logger       *logrus.Logger
	HotelUsecase usecase.HotelUsecase
}

func NewHotelController(hotelUsecase usecase.HotelUsecase) *HotelController {
	return &HotelController{
		Logger:       utils.Log,
		HotelUsecase: hotelUsecase,
	}
}

func (hc *HotelController) CreateBook(w http.ResponseWriter, r *http.Request) {
	var payload dto.CreateBookingRequest
	if err := utils.ParseJSON(r, &payload); err != nil {
		hc.Logger.Errorf("error parsing request body %s", err)
		response.WriteError(w, http.StatusBadRequest, types.ErrorResponse{
			Message: "Error request parsing body",
			Error:   err.Error(),
			Status:  http.StatusBadRequest,
		})
		return
	}

	var discount string
	if payload.Duration >= 3 {
		discount = "10%"
	} else {
    discount = "-"
  }

	booking := model.Booking{
		CustomerName:      payload.CustomerName,
		Gender:            payload.Gender,
		IdentityNumber:    payload.IdentityNumber,
		RoomType:          payload.RoomType,
		Price:             payload.Price,
		BookingDate:       payload.BookingDate,
		Duration:          payload.Duration,
		IncludesBreakfast: payload.IncludesBreakfast,
		TotalPrice:        payload.TotalPrice,
		Discount:          discount,
	}

	hc.HotelUsecase.CreateBooking(&booking)
	response.WriteJSON(w, http.StatusOK, types.Response{
		Message: "Successfully create booking",
		Status:  http.StatusOK,
	})
}
