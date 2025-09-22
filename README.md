# 🍎 Apple Code Assistant

A powerful TypeScript command-line tool for macOS that generates code using Apple's Foundation Models. Built with modern CLI practices and designed for developers who want AI-powered code generation directly in their terminal.

## ✨ Features

- **🤖 AI-Powered Code Generation**: Uses Apple's Foundation Models for intelligent code generation
- **🎨 Syntax Highlighting**: Beautiful terminal output with syntax highlighting for 25+ languages
- **📁 File Operations**: Save, edit, and create files with generated code
- **📋 Clipboard Integration**: Copy generated code directly to clipboard
- **🔧 Interactive Mode**: User-friendly interactive interface for complex workflows
- **⚙️ Configuration Management**: Flexible configuration via environment variables or config files
- **🌐 Multi-Language Support**: Generate code in TypeScript, Python, JavaScript, Java, C++, Go, Rust, and more
- **🛡️ Error Handling**: Robust error handling with graceful fallbacks
- **📊 Progress Indicators**: Visual feedback during code generation
- **🔍 Language Auto-Detection**: Smart language detection from prompts and context

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/apple-code-assistant.git
cd apple-code-assistant

# Install dependencies
npm install

# Build the project
npm run build

# Install globally (optional)
npm install -g .
```

### Configuration

Set your Apple Foundation Models API key:

```bash
export APPLE_FOUNDATION_API_KEY="your-api-key-here"
```

Or create a config file at `~/.apple-code-assistant/config.json`:

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

### Basic Usage

```bash
# Interactive mode
apple-code -i

# Generate code directly
apple-code -p "create a React component for a todo list"

# Generate Python code
apple-code -p "implement quicksort algorithm" -l python

# Save to file
apple-code -p "create a REST API endpoint" -l typescript --save -o api.ts

# Copy to clipboard
apple-code -p "generate a utility function" --copy
```

## 📖 Usage Examples

### Interactive Mode

```bash
apple-code -i
```

Interactive mode provides a guided experience:

```
🍎 Apple Code Assistant - Interactive Mode

? What code would you like me to generate? create a data validation utility
? Select programming language: TypeScript
? Additional context (optional): for user registration form
? Maximum tokens (1-8000): 4000
? Temperature (0-2): 0.7

? What would you like to do with the generated code?
❯◉ Preview in terminal
 ◯ Copy to clipboard
 ◯ Save to file
```

### Direct Mode

```bash
# Generate TypeScript code
apple-code -p "create a class for managing HTTP requests" -l typescript

# Generate Python code with context
apple-code -p "implement authentication middleware" -l python --context "for FastAPI application"

# Generate and save to file
apple-code -p "create a database model" -l typescript --save -o models/user.ts

# Generate and copy to clipboard
apple-code -p "create a utility function for date formatting" --copy
```

### Configuration Commands

```bash
# Set configuration
apple-code config --set model=apple-foundation-model-v2
apple-code config --set defaultLanguage=python
apple-code config --set temperature=0.5

# Get configuration
apple-code config --get model
apple-code config --get defaultLanguage

# List all configuration
apple-code config --list

# Reset to defaults
apple-code config --reset
```

### Utility Commands

```bash
# List available models
apple-code models

# List supported languages
apple-code languages

# Test API connection
apple-code test
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `APPLE_FOUNDATION_API_KEY` | Apple Foundation Models API key | Required |
| `APPLE_FOUNDATION_MODEL` | Model to use | `apple-foundation-model-v1` |
| `APPLE_CODE_DEFAULT_LANGUAGE` | Default programming language | `typescript` |
| `APPLE_CODE_OUTPUT_FORMAT` | Default output format | `terminal` |
| `APPLE_CODE_THEME` | Terminal theme | `dark` |
| `APPLE_CODE_MAX_TOKENS` | Maximum tokens per request | `4000` |
| `APPLE_CODE_TEMPERATURE` | Generation temperature | `0.7` |

### Configuration File

The tool automatically creates a configuration file at `~/.apple-code-assistant/config.json`. You can edit this file directly or use the CLI commands.

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

## 🎨 Supported Languages

The tool supports syntax highlighting and code generation for:

- **Web**: TypeScript, JavaScript, HTML, CSS, SCSS
- **Backend**: Python, Java, C#, PHP, Ruby, Go, Rust
- **Mobile**: Swift, Kotlin
- **Systems**: C, C++
- **Data**: JSON, YAML, XML, SQL
- **Documentation**: Markdown
- **Scripts**: Bash, PowerShell
- **DevOps**: Dockerfile

## 🏗️ Architecture

The tool is built with a modular architecture:

```
src/
├── api/                 # Apple Foundation Models API client
├── cli/                 # CLI parsing and interactive interface
├── config/              # Configuration management
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
│   ├── language-detector.ts
│   ├── syntax-highlighter.ts
│   ├── file-operations.ts
│   ├── clipboard.ts
│   └── logger.ts
└── index.ts             # Main entry point
```

### Key Components

- **AppleFoundationClient**: Handles API communication with Apple's Foundation Models
- **CLIParser**: Parses command-line arguments using Commander.js
- **InteractiveCLI**: Provides interactive user interface using Inquirer
- **ConfigManager**: Manages configuration from files and environment variables
- **LanguageDetector**: Auto-detects programming languages from prompts and context
- **SyntaxHighlighter**: Provides syntax highlighting for terminal output
- **FileOperations**: Handles file I/O operations
- **ClipboardManager**: Manages clipboard operations on macOS

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- TypeScript 5+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/apple-code-assistant.git
cd apple-code-assistant

# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev
```

### Scripts

```bash
npm run build      # Build TypeScript to JavaScript
npm run dev        # Run with ts-node for development
npm run start      # Run built JavaScript
npm run clean      # Clean build directory
```

### Testing

```bash
# Test API connection
npm run dev -- test

# Test with sample prompt
npm run dev -- -p "create a hello world function" -l typescript
```

## 🔒 Security

- API keys are stored securely in user's home directory
- No code or prompts are logged or stored permanently
- All network requests use HTTPS
- Input validation prevents injection attacks

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests for any improvements.

### Development Guidelines

1. Follow TypeScript best practices
2. Add proper error handling
3. Include JSDoc comments for public APIs
4. Write tests for new features
5. Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: Report bugs and request features on GitHub Issues
- **Documentation**: Check the [docs](docs/) directory for detailed guides
- **API Reference**: See [API.md](docs/API.md) for detailed API documentation

## 🙏 Acknowledgments

- Built with [Commander.js](https://github.com/tj/commander.js) for CLI parsing
- Uses [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) for interactive prompts
- Syntax highlighting powered by [highlight.js](https://highlightjs.org/)
- Terminal styling with [Chalk](https://github.com/chalk/chalk)
- File operations with [fs-extra](https://github.com/jprichardson/node-fs-extra)

---

**Made with ❤️ for the Apple developer community**
