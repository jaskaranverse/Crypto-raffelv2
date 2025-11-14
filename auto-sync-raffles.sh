#!/bin/bash

# Auto-sync raffles to GitHub
# This script automatically commits and pushes raffle changes

echo "🔄 Auto-syncing raffles to GitHub..."

# Add the raffles data file
git add data/raffles.json

# Check if there are changes
if git diff --staged --quiet; then
    echo "✅ No changes to sync"
    exit 0
fi

# Commit with timestamp
git commit -m "Update raffles - $(date '+%Y-%m-%d %H:%M:%S')"

# Push to GitHub
git push origin main

echo "✅ Raffles synced! All users will see the updates."