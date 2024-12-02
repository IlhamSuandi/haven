run: build
	@./bin/api

air:
	@air

run-dev:
	@APP_ENV=development go run cmd/server/main.go

run-prod:
	@APP_ENV=production go run cmd/server/main.go

run-staging:
	@APP_ENV=staging go run cmd/server/main.go

build:
	@go build -C cmd/server/ -o ../../bin/api 
