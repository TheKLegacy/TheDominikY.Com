#!/bin/bash

# Find the PID of the Node.js dist/app.js process
PID=$(ps aux | grep '[n]ode dist/app.js' | awk '{print $2}')

# If the PID is found, kill the process
if [ ! -z "$PID" ]; then
    echo "Killing existing dist/app.js process (PID: $PID)..."
    kill -9 $PID
else
    echo "No existing dist/app.js process found."
fi

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

# Start the dist/app.js process with nohup
echo "Starting dist/app.js with nohup..."
nohup node dist/app.js &

echo "dist/app.js started with nohup, you can now disconnect safely."
