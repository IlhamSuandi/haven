# Base image for Go
FROM golang:1.23.1 AS base

# Set the working directory
WORKDIR /app

# Install dependencies and Make
RUN apt-get update && apt-get install -y make

# Copy Go module files and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the Makefile and the source code
COPY Makefile ./
COPY . .

# Build the application using Make
RUN make build

# Expose application port
EXPOSE 8080

# Run the application in production mode using Make
CMD make run-prod
