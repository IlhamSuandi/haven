package database

import (
	"fmt"
	"haven/config"
	"haven/utils"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func Connect(host string, dbname string) (*gorm.DB, error) {
	user := config.DB_USER
	password := config.DB_PASSWORD
	port := config.DB_PORT

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", user, password, host, port, dbname)
	db, err := gorm.Open(mysql.New(mysql.Config{
		DSN: dsn,
	}), &gorm.Config{
		Logger:      logger.Default.LogMode(logger.Silent),
		PrepareStmt: true,
	})
	if err != nil {
		return nil, err
	}

	defer utils.Log.Info("Database connection established")
	return db, nil
}

func CloseDb(db *gorm.DB) {
	sqlDB, err := db.DB()
	if err != nil {
		utils.Log.Errorf("error getting database instance %s", err)
		return
	}
	if err := sqlDB.Close(); err != nil {
		utils.Log.Errorf("error closing database instance %s", err)
		return
	}
	utils.Log.Info("Database connection closed")
}
