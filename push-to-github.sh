#!/bin/bash

echo "🚀 Pushing to GitHub: Crypto-raffelv2"
echo "======================================"

# Make sure we're in the right directory
cd /Users/Swapblok/Desktop/crypto-raffle-demo

# Show current status
echo ""
echo "📊 Current Status:"
git status

# Add all files
echo ""
echo "📦 Adding all files..."
git add .

# Commit
echo ""
echo "💾 Committing changes..."
git commit -m "Complete crypto raffle with admin panel and security"

# Set remote
echo ""
echo "🔗 Setting remote to Crypto-raffelv2..."
git remote set-url origin https://github.com/jaskaranverse/Crypto-raffelv2.git

# Push
echo ""
echo "⬆️ Pushing to GitHub..."
git push origin main --force

echo ""
echo "✅ Done! Check https://github.com/jaskaranverse/Crypto-raffelv2"