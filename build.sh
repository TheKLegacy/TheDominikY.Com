#!/bin/bash

# Find the PID of the Node.js app.js process
PID=$(ps aux | grep '[n]ode app.js' | awk '{print $2}')

# If the PID is found, kill the process
if [ ! -z "$PID" ]; then
    echo "Killing existing app.js process (PID: $PID)..."
    kill -9 $PID
else
    echo "No existing app.js process found."
fi

# Start the app.js process with nohup
echo "Starting app.js with nohup..."
nohup node app.js &

echo "app.js started with nohup, you can now disconnect safely."
