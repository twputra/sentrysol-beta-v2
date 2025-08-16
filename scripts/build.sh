#!/bin/bash

# Custom Build Script for SentrySol
set -e

echo "🚀 Starting SentrySol custom build..."

# Check Node version
echo "📋 Checking Node.js version..."
node --version

# Install dependencies
echo "📦 Installing dependencies..."
if command -v pnpm &> /dev/null; then
    pnpm install
else
    npm install
fi

# Type checking
echo "🔍 Running TypeScript checks..."
npm run typecheck

# Build client
echo "🎨 Building client application..."
npm run build:client

# Build server
echo "⚙️ Building server application..."
npm run build:server

# Verify build output
echo "✅ Verifying build output..."
if [ -d "dist/spa" ] && [ -f "dist/server/node-build.mjs" ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Client output: dist/spa"
    echo "📁 Server output: dist/server"
else
    echo "❌ Build verification failed!"
    exit 1
fi

echo "🎉 Custom build completed!"
