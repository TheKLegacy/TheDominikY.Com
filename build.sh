#!/bin/bash

# Find the PID of the Node.js process (could be app.js or app.ts via ts-node)
PID=$(ps aux | grep -E '[n]ode.*app\.(js|ts)|[t]s-node.*app\.ts' | awk '{print $2}')

# If the PID is found, kill the process
if [ ! -z "$PID" ]; then
    echo "Killing existing app process (PID: $PID)..."
    kill -9 $PID
else
    echo "No existing app process found."
fi

# Compile TypeScript to JavaScript
echo "Compiling TypeScript..."
npx tsc

# Check if compilation was successful
if [ $? -eq 0 ]; then
    echo "TypeScript compilation successful."
    
    # Start the compiled app.js process with nohup
    echo "Starting app.js with nohup..."
    nohup node dist/app.js > app.log 2>&1 &
    
    echo "API started with nohup, you can now disconnect safely."
    echo "Logs are being written to app.log"
else
    echo "TypeScript compilation failed. Please check for errors."
    exit 1
fi
