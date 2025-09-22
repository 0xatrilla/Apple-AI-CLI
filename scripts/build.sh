#!/bin/bash

# Apple Code Assistant Build Script
# This script builds the TypeScript project and prepares it for distribution

set -e

echo "🍎 Building Apple Code Assistant..."

# Clean previous build
echo "Cleaning previous build..."
rm -rf dist/
rm -rf node_modules/.cache/

# Install dependencies
echo "Installing dependencies..."
npm install

# Build TypeScript
echo "Building TypeScript..."
npm run build

# Make the CLI executable
echo "Making CLI executable..."
chmod +x dist/index.js

# Verify build
echo "Verifying build..."
if [ -f "dist/index.js" ]; then
    echo "✅ Build successful!"
    echo "📁 Output directory: dist/"
    echo "🚀 Ready to run: node dist/index.js"
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🎉 Build complete!"
