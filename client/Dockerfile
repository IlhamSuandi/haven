# Base image with Bun installed
FROM oven/bun:latest AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json, bun.lockb, and other configuration files
COPY package.json bun.lockb ./

# Install dependencies using Bun
RUN bun install

# Copy the rest of the application code
COPY . .

# Build the Next.js app for production
RUN bun run build

# Create the production image
FROM oven/bun:latest AS production

# Set the working directory inside the container
WORKDIR /app

# Copy the built application from the build stage
COPY --from=build /app ./

# Expose the port that the app will run on
EXPOSE 3000

# Run the application in production mode
CMD ["bun", "run", "start"]
