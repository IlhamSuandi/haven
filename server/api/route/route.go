package route

import (
	"net/http"
	"gorm.io/gorm"
)

func RegisterRoutes(db *gorm.DB) *http.ServeMux {
	// Router Config
	router := http.NewServeMux()

	HotelRoutes(router, db)

	return router
}
