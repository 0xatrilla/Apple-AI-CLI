# 🍎 Apple AI CLI

<div align="center">

**A professional command-line tool powered by Apple Intelligence for on-device code generation**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![macOS](https://img.shields.io/badge/macOS-15+-silver.svg)](https://www.apple.com/macos/)

*No API keys required • On-device AI • Professional CLI experience*

</div>

## ✨ Features

- **🍎 Apple Intelligence Integration** - Uses on-device AI models (no API keys required!)
- **🎨 Modern Terminal UI** - Beautiful interface inspired by Gemini CLI with ASCII art branding
- **⚡ Real-Time Streaming** - See code generated in real-time with streaming responses
- **🌐 Multi-Language Support** - 25+ programming languages with syntax highlighting
- **💬 Conversation Management** - Persistent chat history and session management
- **📁 File Operations** - Save, edit, and create files with generated code
- **🎯 Syntax Highlighting** - Beautiful code display with highlight.js
- **📋 Clipboard Integration** - Copy generated code to macOS clipboard
- **🔧 Professional CLI** - Industry-standard command interface with Commander.js
- **🛡️ Error Handling** - Robust error handling with graceful fallbacks
- **⚙️ Configuration Management** - Flexible configuration via environment variables

## 🚀 Quick Start

### Prerequisites

- **macOS 15+** with Apple Intelligence support
- **Node.js 18+**
- **Apple Silicon Mac** (recommended for best performance)
- **Swift** (for on-device code generation simulation)

### Installation

```bash
# Clone the repository
git clone https://github.com/0xatrilla/Apple-AI-CLI.git
cd Apple-AI-CLI

# Install dependencies
npm install

# Build the project
npm run build

# Install globally (optional)
npm install -g .
```

### Usage

```bash
# Interactive mode with modern UI
apple-code -i

# Direct code generation
apple-code -p "create a React component" -l typescript

# Save generated code to file
apple-code -p "implement quicksort" -l python --save -o sort.py

# Copy to clipboard
apple-code -p "create utility function" --copy
```

## 🎯 Examples

### Interactive Mode
```bash
apple-code -i
```

```
 █████╗ ██████╗ ██████╗ ██╗     ███████╗     ██████╗ ██████╗ ██████╗ ███████╗
██╔══██╗██╔══██╗██╔══██╗██║     ██╔════╝    ██╔════╝██╔═══██╗██╔══██╗██╔════╝
███████║██████╔╝██████╔╝██║     █████╗      ██║     ██║   ██║██║  ██║█████╗  
██╔══██║██╔═══╝ ██╔═══╝ ██║     ██╔══╝      ██║     ██║   ██║██║  ██║██╔══╝  
██║  ██║██║     ██║     ███████╗███████╗    ╚██████╗╚██████╔╝██████╔╝███████╗
╚═╝  ╚═╝╚═╝     ╚═╝     ╚══════╝╚══════╝     ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝
                                                                             
ASSISTANT

Powered by Apple Intelligence
┌─────────────────────────────────────────────────────────────┐
│  🍎 On-Device AI  │  ✅ Ready  │  v1.0.0  │
└─────────────────────────────────────────────────────────────┘

💬 You: Create a React component for a todo list
🤖 Assistant: [Generated TypeScript code with syntax highlighting]
```

### Direct Mode
```bash
# Generate TypeScript code
apple-code -p "create a user authentication service" -l typescript

# Generate Python code and save to file
apple-code -p "implement binary search" -l python --save -o binary_search.py

# Generate code with context
apple-code -p "create API endpoint" --context "for Express.js application"
```

## 🛠️ Commands

### Interactive Commands
- `/help` - Show available commands
- `/exit` - Exit the application
- `/clear` - Clear the screen
- `/history` - Show conversation history
- `/sessions` - Show all sessions
- `/models` - Show available models
- `/languages` - Show supported languages
- `/test` - Test Apple Intelligence connection

### CLI Options
- `-p, --prompt <prompt>` - Code generation prompt
- `-l, --language <language>` - Programming language
- `-o, --output <file>` - Output file path
- `-i, --interactive` - Interactive mode
- `--save` - Save to file
- `--copy` - Copy to clipboard
- `--preview` - Preview in terminal
- `--context <context>` - Additional context
- `--model <model>` - Apple Foundation Model to use
- `--temperature <number>` - Generation temperature (0-2)
- `--max-tokens <number>` - Maximum tokens to generate
- `--theme <theme>` - Terminal theme (light/dark)
- `--verbose` - Verbose output
- `--debug` - Debug mode

### Subcommands
```bash
# Configuration management
apple-code config --set model=apple-foundation-model
apple-code config --get defaultLanguage
apple-code config --list

# Utility commands
apple-code models          # List available models
apple-code languages       # List supported languages
apple-code test           # Test Apple Intelligence connection
```

## 🌐 Supported Languages

- **TypeScript/JavaScript** - React, Node.js, Express, Vue, Angular
- **Python** - Django, Flask, FastAPI, Pandas, NumPy
- **Java** - Spring Boot, Android, Maven, Gradle
- **C#/.NET** - ASP.NET, WPF, Entity Framework
- **C/C++** - System programming, embedded development
- **Go** - Web services, CLI tools, microservices
- **Rust** - Systems programming, web assembly
- **Swift** - iOS, macOS development, SwiftUI
- **Kotlin** - Android development, Spring
- **PHP** - Laravel, Symfony, WordPress
- **Ruby** - Rails, Sinatra, gems
- **HTML/CSS** - Web development, responsive design
- **SQL** - Database queries, stored procedures
- **Shell/Bash** - Scripting, automation
- **And more...**

## 🏗️ Architecture

```
src/
├── api/                    # Apple Intelligence integration
│   └── foundation-client.ts    # On-device AI client with Swift simulation
├── cli/                    # Command-line interface
│   ├── handler.ts              # Main CLI logic and command handling
│   ├── interactive.ts          # Legacy interactive CLI
│   └── parser.ts               # Commander.js argument parsing
├── config/                 # Configuration management
│   └── index.ts                # Environment variables and config files
├── ui/                     # Modern terminal UI
│   ├── simple-terminal-ui.ts   # Main interactive UI with ASCII art
│   ├── conversation-manager.ts # Chat history and session management
│   ├── streaming-handler.ts    # Real-time streaming responses
│   └── file-tree.ts            # File tree navigation (future feature)
├── utils/                  # Utility functions
│   ├── clipboard.ts            # macOS clipboard integration
│   ├── file-operations.ts      # File I/O operations
│   ├── language-detector.ts    # Auto-detect programming languages
│   ├── logger.ts               # Logging and error handling
│   └── syntax-highlighter.ts   # Code syntax highlighting
├── types/                  # TypeScript definitions
│   └── index.ts                # Interface definitions
└── index.ts                # Main entry point
```

### Key Components

- **AppleFoundationClient** - Handles on-device Apple Intelligence integration
- **SimpleTerminalUI** - Modern interactive UI with professional branding
- **StreamingHandler** - Real-time code generation with streaming responses
- **ConversationManager** - Persistent chat history and session management
- **CLIParser** - Command-line argument parsing with Commander.js
- **ConfigManager** - Configuration management from files and environment
- **LanguageDetector** - Auto-detects programming languages from prompts
- **SyntaxHighlighter** - Beautiful code display with highlight.js
- **FileOperations** - File I/O operations for saving and editing code
- **ClipboardManager** - macOS clipboard integration

## 🔧 Configuration

### Environment Variables

Create a `.env` file or set environment variables:

```bash
# Optional: Apple Foundation Model to use
APPLE_FOUNDATION_MODEL=apple-foundation-model

# Optional: Default programming language
APPLE_CODE_DEFAULT_LANGUAGE=typescript

# Optional: Default output format
APPLE_CODE_OUTPUT_FORMAT=terminal

# Optional: Terminal theme
APPLE_CODE_THEME=dark

# Optional: Maximum tokens per request (1-8000)
APPLE_CODE_MAX_TOKENS=4000

# Optional: Generation temperature (0-2)
APPLE_CODE_TEMPERATURE=0.7
```

### Configuration File

The tool automatically creates a configuration file at `~/.apple-code-assistant/config.yaml`:

```yaml
model: apple-foundation-model
defaultLanguage: typescript
outputFormat: terminal
theme: dark
maxTokens: 4000
temperature: 0.7
```

## 📚 Documentation

- [📖 Installation Guide](docs/INSTALLATION.md) - Detailed setup instructions
- [🔌 API Documentation](docs/API.md) - Complete API reference
- [❓ FAQ](docs/FAQ.md) - Frequently asked questions
- [🏗️ Project Structure](PROJECT_STRUCTURE.md) - Detailed architecture overview

## 🎨 UI Features

### Professional Terminal Interface
- **ASCII Art Branding** with gradient colors using figlet and gradient-string
- **Status Information Panel** with system indicators and version info
- **Real-time Streaming** responses with chunked output
- **Syntax Highlighting** for generated code using highlight.js
- **Conversation History** with session management and context

### Command System
- **Interactive Commands** with `/help`, `/exit`, `/clear`, etc.
- **Direct Mode** for scripting and automation
- **File Operations** with save, edit, and create functionality
- **Clipboard Integration** for macOS using clipboardy

## 🛠️ Development

### Prerequisites
- Node.js 18+
- TypeScript 5+
- npm or yarn
- Swift (for on-device simulation)

### Setup
```bash
# Clone the repository
git clone https://github.com/0xatrilla/Apple-AI-CLI.git
cd Apple-AI-CLI

# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev

# Test the demo UI
node demo-ui.js
```

### Scripts
```bash
npm run build      # Build TypeScript to JavaScript
npm run dev        # Run with ts-node for development
npm run start      # Run built JavaScript
npm run lint       # Run ESLint
npm run test       # Run tests
```

### Testing
```bash
# Test the demo UI
node demo-ui.js

# Test with sample prompt
npm run dev -- -p "create a hello world function" -l typescript

# Test interactive mode
npm run dev -- -i
```

## 🔒 Security & Privacy

- **On-Device Processing** - All AI processing happens locally on your Mac
- **No API Keys Required** - Uses Apple Intelligence directly
- **No Data Transmission** - Code and prompts stay on your device
- **Secure Configuration** - Config files stored in user's home directory
- **Input Validation** - Prevents injection attacks and malformed input

## 🤝 Contributing

We welcome contributions! Please read our contributing guidelines and submit pull requests for any improvements.

### Development Guidelines

1. **Follow TypeScript Best Practices** - Use strict typing and proper interfaces
2. **Add Proper Error Handling** - Include try-catch blocks and graceful fallbacks
3. **Include JSDoc Comments** - Document all public APIs and functions
4. **Write Tests** - Add unit tests for new features and bug fixes
5. **Update Documentation** - Keep README and docs up to date
6. **Follow Code Style** - Use Prettier and ESLint configurations

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Inspired by** [Gemini CLI](https://github.com/google-gemini/gemini-cli) for UI design
- **Powered by** Apple Intelligence on-device models
- **Built with** TypeScript, Node.js, and modern CLI tools
- **UI Design** inspired by industry-leading CLI applications
- **Dependencies**:
  - [Commander.js](https://github.com/tj/commander.js) for CLI parsing
  - [Chalk](https://github.com/chalk/chalk) for terminal styling
  - [Figlet](https://github.com/patorjk/figlet.js) for ASCII art
  - [Highlight.js](https://highlightjs.org/) for syntax highlighting
  - [Readline](https://nodejs.org/api/readline.html) for interactive input

## 🔗 Links

- **Repository**: [https://github.com/0xatrilla/Apple-AI-CLI](https://github.com/0xatrilla/Apple-AI-CLI)
- **Issues**: [Report a bug](https://github.com/0xatrilla/Apple-AI-CLI/issues)
- **Discussions**: [Join the conversation](https://github.com/0xatrilla/Apple-AI-CLI/discussions)
- **Releases**: [Latest releases](https://github.com/0xatrilla/Apple-AI-CLI/releases)

## 🚀 Roadmap

### Current Features ✅
- [x] On-device Apple Intelligence integration
- [x] Modern terminal UI with professional branding
- [x] Real-time streaming responses
- [x] Multi-language code generation
- [x] Conversation history and session management
- [x] File operations and clipboard integration
- [x] Syntax highlighting and error handling

### Planned Features 🔄
- [ ] Real Apple Intelligence API integration (when available)
- [ ] File tree navigation and code preview
- [ ] Plugin system for custom language support
- [ ] Team collaboration features
- [ ] VS Code extension
- [ ] Web interface
- [ ] Advanced code analysis and suggestions

### Future Enhancements 🔮
- [ ] Multi-model support (different AI models)
- [ ] Code review and optimization suggestions
- [ ] Integration with popular development tools
- [ ] Advanced conversation memory and context
- [ ] Custom prompt templates and workflows

---

<div align="center">

**🍎 Built with Apple Intelligence • Made for Developers**

*No API keys required • On-device AI • Professional CLI experience*

[⭐ Star this repository](https://github.com/0xatrilla/Apple-AI-CLI) • [🐛 Report Issues](https://github.com/0xatrilla/Apple-AI-CLI/issues) • [💬 Join Discussions](https://github.com/0xatrilla/Apple-AI-CLI/discussions)

</div>