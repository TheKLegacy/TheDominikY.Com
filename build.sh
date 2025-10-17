#!/bin/bash

echo "Building and starting the API..."

# Function to kill existing Node processes on Windows/Unix
kill_existing_processes() {
    if command -v taskkill &> /dev/null; then
        # Windows - kill Node processes running app.js or app.ts
        echo "Stopping existing Node processes (Windows)..."
        taskkill //F //IM node.exe //FI "WINDOWTITLE eq *app*" 2>/dev/null || true
        taskkill //F //IM node.exe //FI "COMMANDLINE eq *app.js*" 2>/dev/null || true
        taskkill //F //IM node.exe //FI "COMMANDLINE eq *app.ts*" 2>/dev/null || true
    else
        # Unix/Linux - find and kill Node processes
        echo "Stopping existing Node processes (Unix/Linux)..."
        PID=$(ps aux | grep -E '[n]ode.*app\.(js|ts)|[t]s-node.*app\.ts' | awk '{print $2}' | head -1)
        if [ ! -z "$PID" ]; then
            echo "Killing existing app process (PID: $PID)..."
            kill -9 $PID 2>/dev/null || true
        else
            echo "No existing app process found."
        fi
    fi
}

# Kill any existing processes
kill_existing_processes

# Clean and create dist directory
echo "Cleaning build directory..."
rm -rf dist
mkdir -p dist

# Compile TypeScript to JavaScript
echo "Compiling TypeScript..."
npx tsc
COMPILE_STATUS=$?

# Check if compilation was successful
if [ $COMPILE_STATUS -eq 0 ]; then
    echo "TypeScript compilation successful."
    
    # Check if we're on Windows (Git Bash/WSL) or Unix
    if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" || "$OSTYPE" == "cygwin" ]]; then
        # Windows - start in background
        echo "Starting app.js (Windows background)..."
        node dist/app.js > app.log 2>&1 &
        echo "API started in background. Logs are being written to app.log"
        echo "Use 'tasklist | findstr node' to see running processes"
    else
        # Unix/Linux - use nohup
        echo "Starting app.js with nohup..."
        nohup node dist/app.js > app.log 2>&1 &
        echo "API started with nohup, you can now disconnect safely."
        echo "Logs are being written to app.log"
    fi
    
    echo "Build and deployment complete!"
    echo "API should be running on http://localhost:3000"
    
else
    echo "TypeScript compilation failed. Please check for errors."
    exit 1
fi
