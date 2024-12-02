package database

import (
	"haven/database/model"
	"haven/utils"

	"gorm.io/gorm"
)

func AutoMigrate(db *gorm.DB) {
	log := utils.Log
	log.Info("Auto Migrating Database...")
	if err := db.AutoMigrate(
		&model.Booking{},
	); err != nil {
		log.Error(err)
	}

	defer log.Info("successfully migrated")
}
