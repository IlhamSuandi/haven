package config

import (
	"fmt"
	"haven/utils"
	"os"

	"github.com/joho/godotenv"
)

var (
	APP_ENV        string
	DB_HOST        string
	DB_USER        string
	DB_PASSWORD    string
	DB_NAME        string
	DB_PORT        string
	ALLOWED_ORIGIN string
	BASE_URL       string
	URL            string
	CLIENT_URL     string
)

func init() {
	loadEnv()

	APP_ENV = GetEnv("APP_ENV", "development")
	DB_HOST = GetEnv("DB_HOST", "localhost")
	DB_USER = GetEnv("DB_USER", "root")
	DB_PASSWORD = GetEnv("DB_PASSWORD", "")
	DB_NAME = GetEnv("DB_NAME", "haven")
	DB_PORT = GetEnv("DB_PORT", "5432")
	ALLOWED_ORIGIN = GetEnv("ALLOWED_ORIGIN", "")
	BASE_URL = GetEnv("BASE_URL", "http://localhost:5000")
	URL = GetEnv("URL", "http://localhost:5000/api/v1")
	CLIENT_URL = GetEnv("CLIENT_URL", "http://localhost:3000")
}

func GetEnv(key string, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

func loadEnv() {
	APP_ENV = os.Getenv("APP_ENV")
	var env string

	switch APP_ENV {
	case "development":
		env = ".env"
	case "production":
		env = ".env.production"
	case "staging":
		env = ".env.staging"
	default:
		env = ".env"
	}

	// Check if the file exists
	if _, err := os.Stat(env); os.IsNotExist(err) {
		fmt.Printf("Environment file %s not found, defaulting to .env\n", env)
		env = ".env"
	}

	// Define possible paths for the .env file
	configPaths := []string{
		fmt.Sprintf("./%s", env), // For app in current directory
	}

	// Iterate over the possible paths
	for _, path := range configPaths {
		// Attempt to load .env file
		if err := godotenv.Load(path); err == nil {
			utils.Log.Infof("loaded env from %s", path)
			return
		}
	}

	utils.Log.Infof("failed to load env from any of: %v", configPaths)
}
