package main

import (
	"haven/api"
	"haven/config"
	"haven/database"
	"haven/utils"
)

func main() {
	// Connect to DB
	log := utils.Log
	db, err := database.Connect(config.DB_HOST, config.DB_NAME)
	if err != nil {
		log.Fatal("failed to connect to database")
	}
	// Close DB Connection at the end of the program
	defer database.CloseDb(db)

	// AutoMigrate
	database.AutoMigrate(db)

	utils.RegisterValidator()
	server := api.NewApiServer(":5000", db)

	// Start the server in a goroutine
	server.Start()

	// Set up graceful shutdown
	server.GracefulShutdown()
}
