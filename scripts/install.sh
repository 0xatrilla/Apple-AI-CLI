#!/bin/bash

# Apple Code Assistant Installation Script
# This script installs the tool globally and sets up the environment

set -e

echo "🍎 Installing Apple Code Assistant..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    echo "Please update Node.js: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Build the project
echo "Building project..."
npm install
npm run build

# Install globally
echo "Installing globally..."
npm install -g .

# Create config directory
echo "Creating config directory..."
mkdir -p ~/.apple-code-assistant

# Create example config if it doesn't exist
if [ ! -f ~/.apple-code-assistant/config.json ]; then
    echo "Creating example configuration..."
    cat > ~/.apple-code-assistant/config.json << EOF
{
  "apiKey": "",
  "model": "apple-foundation-model-v1",
  "defaultLanguage": "typescript",
  "outputFormat": "terminal",
  "theme": "dark",
  "maxTokens": 4000,
  "temperature": 0.7
}
EOF
fi

# Test installation
echo "Testing installation..."
if command -v apple-code &> /dev/null; then
    echo "✅ Installation successful!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Get your Apple Foundation Models API key from: https://developer.apple.com"
    echo "2. Set your API key:"
    echo "   export APPLE_FOUNDATION_API_KEY=\"your-api-key-here\""
    echo "   # or edit ~/.apple-code-assistant/config.json"
    echo ""
    echo "3. Test the installation:"
    echo "   apple-code test"
    echo ""
    echo "4. Start using the tool:"
    echo "   apple-code -i  # Interactive mode"
    echo "   apple-code -p \"create a hello world function\"  # Direct mode"
    echo ""
    echo "📚 Documentation: https://github.com/your-username/apple-code-assistant"
else
    echo "❌ Installation failed!"
    echo "Try running: npm install -g ."
    exit 1
fi
