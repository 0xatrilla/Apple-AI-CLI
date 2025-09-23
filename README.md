```
 █████╗ ██████╗ ██████╗ ██╗     ███████╗     ██████╗ ██████╗ ██████╗ ███████╗
██╔══██╗██╔══██╗██╔══██╗██║     ██╔════╝    ██╔════╝██╔═══██╗██╔══██╗██╔════╝
███████║██████╔╝██████╔╝██║     █████╗      ██║     ██║   ██║██║  ██║█████╗  
██╔══██║██╔═══╝ ██╔═══╝ ██║     ██╔══╝      ██║     ██║   ██║██║  ██║██╔══╝  
██║  ██║██║     ██║     ███████╗███████╗    ╚██████╗╚██████╔╝██████╔╝███████╗
╚═╝  ╚═╝╚═╝     ╚═╝     ╚══════╝╚══════╝     ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝
```

**A TypeScript CLI tool for code generation using Apple's Foundation Models**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

</div>

## ✨ Features

- **🍎 Apple Intelligence Integration** - Leverages on-device Apple AI models
- **🎨 Modern Terminal UI** - Professional CLI interface with ASCII art branding
- **💬 Conversation Management** - Persistent chat history and session management
- **🌐 Multi-Language Support** - Code generation for 25+ programming languages
- **📁 File Operations** - Save, edit, and manage generated code
- **🎯 Syntax Highlighting** - Beautiful code display with highlight.js
- **📋 Clipboard Integration** - Copy generated code to macOS clipboard
- **🔧 Professional CLI** - Built with Commander.js for robust command parsing
- **🛡️ Error Handling** - Comprehensive error handling with graceful fallbacks

## 🚀 Quick Start

### Prerequisites

- **macOS 15+** with Apple Intelligence support
- **Node.js 18+**
- **Apple Silicon Mac** (recommended for best performance)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/apple-code-assistant.git
cd apple-code-assistant

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
│   └── foundation-client.ts    # On-device AI client
├── cli/                    # Command-line interface
│   ├── handler.ts              # Main CLI logic
│   ├── interactive.ts          # Legacy interactive CLI
│   └── parser.ts               # Commander.js argument parsing
├── config/                 # Configuration management
│   └── index.ts                # Environment variables and config files
├── ui/                     # Modern terminal UI
│   ├── simple-terminal-ui.ts   # Main interactive UI
│   ├── conversation-manager.ts # Chat history and session management
│   ├── streaming-handler.ts    # Real-time streaming responses
│   └── file-tree.ts            # File tree navigation
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

## 🔒 Security & Privacy

- **On-Device Processing** - All AI processing happens locally on your Mac
- **No API Keys Required** - Uses Apple Intelligence directly
- **No Data Transmission** - Code and prompts stay on your device
- **Secure Configuration** - Config files stored in user's home directory
- **Input Validation** - Prevents injection attacks and malformed input

## 🛠️ Development

### Prerequisites
- Node.js 18+
- TypeScript 5+
- npm or yarn
- Swift (for on-device simulation)

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/apple-code-assistant.git
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
npm run clean      # Remove dist folder
```

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

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Inspired by** industry-leading CLI applications
- **Powered by** Apple Intelligence on-device models
- **Built with** TypeScript, Node.js, and modern CLI tools
- **Dependencies**:
  - [Commander.js](https://github.com/tj/commander.js) for CLI parsing
  - [Chalk](https://github.com/chalk/chalk) for terminal styling
  - [Figlet](https://github.com/patorjk/figlet.js) for ASCII art
  - [Highlight.js](https://highlightjs.org/) for syntax highlighting
  - [Readline](https://nodejs.org/api/readline.html) for interactive input

## 🔗 Links

- **Repository**: [https://github.com/yourusername/apple-code-assistant](https://github.com/yourusername/apple-code-assistant)
- **Issues**: [Report a bug](https://github.com/yourusername/apple-code-assistant/issues)

## 🚀 Roadmap

### Current Features ✅
- [x] On-device Apple Intelligence integration
- [x] Modern terminal UI with professional branding
- [x] Real-time streaming responses
- [x] Multi-language code generation
- [x] Conversation history and session management
- [x] File operations and clipboard integration
- [x] Syntax highlighting and error handling

