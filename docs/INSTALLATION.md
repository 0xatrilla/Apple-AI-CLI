# Installation Guide

## Prerequisites

Before installing Apple Code Assistant, ensure you have the following:

- **macOS**: macOS 10.15 (Catalina) or later
- **Node.js**: Version 18.0.0 or later
- **npm**: Version 8.0.0 or later (comes with Node.js)
- **Apple Developer Account**: For API access to Apple Foundation Models

## Installation Methods

### Method 1: Install from Source (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/apple-code-assistant.git
   cd apple-code-assistant
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

4. **Install globally (optional):**
   ```bash
   npm install -g .
   ```

### Method 2: Install via npm (when published)

```bash
npm install -g apple-code-assistant
```

### Method 3: Development Installation

For development and testing:

```bash
# Clone and install
git clone https://github.com/your-username/apple-code-assistant.git
cd apple-code-assistant
npm install

# Run in development mode
npm run dev
```

## Configuration

### 1. Get Apple Foundation Models API Key

1. Visit [Apple Developer Console](https://developer.apple.com)
2. Navigate to Foundation Models section
3. Create a new API key
4. Copy the API key for configuration

### 2. Set Environment Variables

Create a `.env` file in the project root or set environment variables:

```bash
# Required
export APPLE_FOUNDATION_API_KEY="your-api-key-here"

# Optional
export APPLE_FOUNDATION_MODEL="apple-foundation-model-v1"
export APPLE_CODE_DEFAULT_LANGUAGE="typescript"
export APPLE_CODE_OUTPUT_FORMAT="terminal"
export APPLE_CODE_THEME="dark"
export APPLE_CODE_MAX_TOKENS="4000"
export APPLE_CODE_TEMPERATURE="0.7"
```

### 3. Create Configuration File

The tool will automatically create a configuration file at `~/.apple-code-assistant/config.json` on first run, or you can create it manually:

```json
{
  "apiKey": "your-api-key-here",
  "model": "apple-foundation-model-v1",
  "defaultLanguage": "typescript",
  "outputFormat": "terminal",
  "theme": "dark",
  "maxTokens": 4000,
  "temperature": 0.7
}
```

## Verification

### Test Installation

1. **Check if the tool is installed:**
   ```bash
   apple-code --version
   ```

2. **Test API connection:**
   ```bash
   apple-code test
   ```

3. **Run a simple test:**
   ```bash
   apple-code -p "create a hello world function" -l typescript
   ```

### Troubleshooting

#### Common Issues

1. **"Command not found" error:**
   - Ensure the tool is installed globally: `npm install -g .`
   - Check your PATH includes npm global bin directory
   - Try running with `npx apple-code` instead

2. **API key not found:**
   - Verify environment variable is set: `echo $APPLE_FOUNDATION_API_KEY`
   - Check configuration file exists and has correct API key
   - Ensure API key is valid and has proper permissions

3. **Permission errors:**
   - Run with `sudo` if needed for global installation
   - Check file permissions in project directory
   - Ensure write access to home directory for config files

4. **Node.js version issues:**
   - Update Node.js to version 18 or later
   - Use nvm to manage Node.js versions: `nvm install 18 && nvm use 18`

#### Debug Mode

Run with debug mode for detailed error information:

```bash
apple-code --debug -p "test prompt"
```

#### Verbose Output

Enable verbose logging:

```bash
apple-code --verbose -p "test prompt"
```

## Uninstallation

### Remove Global Installation

```bash
npm uninstall -g apple-code-assistant
```

### Remove Configuration

```bash
rm -rf ~/.apple-code-assistant
```

### Remove from Source Installation

```bash
cd /path/to/apple-code-assistant
npm uninstall -g .
```

## System Requirements

### Minimum Requirements

- **macOS**: 10.15 (Catalina)
- **Node.js**: 18.0.0
- **RAM**: 512 MB
- **Disk Space**: 100 MB

### Recommended Requirements

- **macOS**: 12.0 (Monterey) or later
- **Node.js**: 20.0.0 or later
- **RAM**: 1 GB
- **Disk Space**: 200 MB

### Apple Silicon Compatibility

The tool is fully compatible with Apple Silicon (M1/M2/M3) Macs and includes optimizations for ARM64 architecture.

## Security Considerations

- API keys are stored in your home directory with restricted permissions
- No code or prompts are logged or transmitted except to Apple's API
- All network communication uses HTTPS encryption
- Configuration files are created with secure permissions

## Support

If you encounter issues during installation:

1. Check the [troubleshooting section](#troubleshooting)
2. Review the [FAQ](FAQ.md)
3. Open an issue on [GitHub](https://github.com/your-username/apple-code-assistant/issues)
4. Check the [API documentation](API.md) for advanced configuration
