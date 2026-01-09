#!/bin/bash

# Start script for FastAPI backend
# This script will be used on Oracle Cloud

# Set default values
HOST=${HOST:-0.0.0.0}
PORT=${PORT:-8000}

# Activate virtual environment if exists
if [ -d "venv" ]; then
    source venv/bin/activate
fi

# Install dependencies
pip install -r requirements.txt

# Start the server
echo "Starting FastAPI server on $HOST:$PORT"
uvicorn main:app --host $HOST --port $PORT --reload