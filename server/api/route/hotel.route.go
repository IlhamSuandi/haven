package route

import (
	"haven/api/controller"
	"haven/repository"
	"haven/usecase"
	"net/http"

	"gorm.io/gorm"
)

func HotelRoutes(router *http.ServeMux, db *gorm.DB) {
	hotelRepo := repository.NewHotelRepository(db)
	hotelUsecase := usecase.NewHotelUsecase(hotelRepo)
  controller := controller.NewHotelController(hotelUsecase)

	router.HandleFunc("POST /booking", controller.CreateBook)
}
