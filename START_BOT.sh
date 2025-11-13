#!/bin/bash

# Twitter News Bot Startup Script
# This starts your bot and keeps it running

cd "$(dirname "$0")"

echo "🤖 Starting Twitter News Bot..."
echo "================================"
echo ""
echo "✓ Bot will crawl news every 30 minutes"
echo "✓ Bot will post tweets every 5 minutes"
echo "✓ Press Ctrl+C to stop"
echo ""

# Start the bot
npm run dev
