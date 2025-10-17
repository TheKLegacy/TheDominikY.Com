#!/bin/bash

echo "Building and starting the API..."

# Kill existing Node processes
echo "Stopping existing Node processes..."
pkill -f "node.*app" || echo "No existing processes found"

# Clean and create dist directory
echo "Cleaning build directory..."
rm -rf dist
mkdir -p dist

# Install dependencies
echo "Installing dependencies..."
npm install

# Compile TypeScript to JavaScript
echo "Compiling TypeScript..."
npx tsc

echo "TypeScript compilation complete."

# Start with nohup
echo "Starting app.js with nohup..."
nohup node dist/app.js > app.log 2>&1 &

echo "Build and deployment complete!"
echo "API started with nohup - logs in app.log"
echo "API should be running on http://localhost:3000"
