#!/bin/bash

# Configuration
REPO_URL="https://github.com/shreshta-smg/website.git"
DEST_DIR="website"

echo "Starting Git clone for ${REPO_URL}..."

# Clone the repository
git clone "$REPO_URL" "$DEST_DIR"

# Check if clone was successful
if [ $? -eq 0 ]; then
    echo "Clone successful. Navigating to ${DEST_DIR} and running npm run dev..."
    cd "$DEST_DIR" || { echo "Failed to change directory. Exiting."; exit 1; }
    npm run dev
else
    echo "Git clone failed. Exiting."
    exit 1
fi