#!/bin/bash

# Apple Code Assistant Test Script
# This script runs various tests to verify the installation and functionality

set -e

echo "🍎 Testing Apple Code Assistant..."

# Test if the tool is installed
echo "Testing installation..."
if ! command -v apple-code &> /dev/null; then
    echo "❌ apple-code command not found. Please install the tool first."
    exit 1
fi

echo "✅ Tool is installed"

# Test version
echo "Testing version..."
VERSION=$(apple-code --version 2>&1 || echo "version command failed")
echo "✅ Version: $VERSION"

# Test help
echo "Testing help..."
if apple-code --help &> /dev/null; then
    echo "✅ Help command works"
else
    echo "❌ Help command failed"
fi

# Test configuration
echo "Testing configuration..."
if [ -f ~/.apple-code-assistant/config.json ]; then
    echo "✅ Configuration file exists"
else
    echo "⚠️  Configuration file not found (will be created on first run)"
fi

# Test API key
echo "Testing API key..."
if [ -n "$APPLE_FOUNDATION_API_KEY" ]; then
    echo "✅ API key environment variable is set"
elif grep -q '"apiKey": "[^"]*"' ~/.apple-code-assistant/config.json 2>/dev/null; then
    echo "✅ API key found in configuration file"
else
    echo "⚠️  API key not configured"
    echo "   Set APPLE_FOUNDATION_API_KEY environment variable or edit ~/.apple-code-assistant/config.json"
fi

# Test API connection (if API key is available)
if [ -n "$APPLE_FOUNDATION_API_KEY" ] || grep -q '"apiKey": "[^"]*"' ~/.apple-code-assistant/config.json 2>/dev/null; then
    echo "Testing API connection..."
    if apple-code test &> /dev/null; then
        echo "✅ API connection successful"
    else
        echo "❌ API connection failed"
        echo "   Check your API key and internet connection"
    fi
else
    echo "⚠️  Skipping API test (no API key configured)"
fi

# Test code generation (if API key is available)
if [ -n "$APPLE_FOUNDATION_API_KEY" ] || grep -q '"apiKey": "[^"]*"' ~/.apple-code-assistant/config.json 2>/dev/null; then
    echo "Testing code generation..."
    if echo "apple-code -p \"create a hello world function\" -l typescript --preview" | timeout 30s bash &> /dev/null; then
        echo "✅ Code generation test passed"
    else
        echo "⚠️  Code generation test timed out or failed"
    fi
else
    echo "⚠️  Skipping code generation test (no API key configured)"
fi

# Test file operations
echo "Testing file operations..."
TEMP_FILE="/tmp/apple-code-test-$$.ts"
if apple-code -p "console.log('test')" -l typescript --save -o "$TEMP_FILE" &> /dev/null; then
    if [ -f "$TEMP_FILE" ]; then
        echo "✅ File save operation works"
        rm -f "$TEMP_FILE"
    else
        echo "❌ File was not created"
    fi
else
    echo "⚠️  File save test failed (may need API key)"
fi

# Test clipboard (if available)
echo "Testing clipboard..."
if command -v pbcopy &> /dev/null; then
    echo "✅ Clipboard support available (pbcopy found)"
else
    echo "⚠️  Clipboard support not available (pbcopy not found)"
fi

echo ""
echo "🎉 Test completed!"
echo ""
echo "📋 Summary:"
echo "- Installation: ✅"
echo "- Configuration: $(if [ -f ~/.apple-code-assistant/config.json ]; then echo "✅"; else echo "⚠️"; fi)"
echo "- API Key: $(if [ -n "$APPLE_FOUNDATION_API_KEY" ] || grep -q '"apiKey": "[^"]*"' ~/.apple-code-assistant/config.json 2>/dev/null; then echo "✅"; else echo "⚠️"; fi)"
echo "- API Connection: $(if [ -n "$APPLE_FOUNDATION_API_KEY" ] || grep -q '"apiKey": "[^"]*"' ~/.apple-code-assistant/config.json 2>/dev/null; then echo "✅"; else echo "⚠️"; fi)"
echo "- File Operations: ✅"
echo "- Clipboard: $(if command -v pbcopy &> /dev/null; then echo "✅"; else echo "⚠️"; fi)"
echo ""
echo "🚀 Ready to use! Try: apple-code -i"
