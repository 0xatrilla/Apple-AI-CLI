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

- **🍎 Apple Intelligence Integration** - Uses on-device AI models (no API keys!)
- **🎨 Modern Terminal UI** - Beautiful interface inspired by Gemini CLI
- **⚡ Real-Time Streaming** - See code generated in real-time
- **🌐 Multi-Language Support** - 25+ programming languages
- **💬 Conversation Management** - Persistent chat history and sessions
- **📁 File Operations** - Save, edit, and create files
- **🎯 Syntax Highlighting** - Beautiful code display
- **📋 Clipboard Integration** - Copy to macOS clipboard
- **🔧 Professional CLI** - Industry-standard command interface

## 🚀 Quick Start

### Prerequisites

- **macOS 15+** with Apple Intelligence support
- **Node.js 18+**
- **Apple Silicon Mac** (recommended for best performance)

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

## 🌐 Supported Languages

- **TypeScript/JavaScript** - React, Node.js, Express
- **Python** - Django, Flask, FastAPI
- **Java** - Spring Boot, Android
- **C#/.NET** - ASP.NET, WPF
- **C/C++** - System programming
- **Go** - Web services, CLI tools
- **Rust** - Systems programming
- **Swift** - iOS, macOS development
- **Kotlin** - Android development
- **PHP** - Laravel, Symfony
- **Ruby** - Rails, Sinatra
- **HTML/CSS** - Web development
- **SQL** - Database queries
- **And more...**

## 🏗️ Architecture

```
src/
├── api/                 # Apple Intelligence integration
│   └── foundation-client.ts
├── cli/                 # Command-line interface
│   ├── handler.ts
│   ├── interactive.ts
│   └── parser.ts
├── config/              # Configuration management
│   └── index.ts
├── ui/                  # Modern terminal UI
│   ├── simple-terminal-ui.ts
│   ├── conversation-manager.ts
│   ├── streaming-handler.ts
│   └── file-tree.ts
├── utils/               # Utility functions
│   ├── clipboard.ts
│   ├── file-operations.ts
│   ├── language-detector.ts
│   ├── logger.ts
│   └── syntax-highlighter.ts
└── types/               # TypeScript definitions
    └── index.ts
```

## 🔧 Configuration

Create a `.env` file or use environment variables:

```bash
# Optional: Apple Foundation Model to use
APPLE_FOUNDATION_MODEL=apple-foundation-model

# Optional: Default programming language
APPLE_CODE_DEFAULT_LANGUAGE=typescript

# Optional: Default output format
APPLE_CODE_OUTPUT_FORMAT=terminal

# Optional: Terminal theme
APPLE_CODE_THEME=dark

# Optional: Maximum tokens
APPLE_CODE_MAX_TOKENS=4000

# Optional: Temperature
APPLE_CODE_TEMPERATURE=0.7
```

## 📚 Documentation

- [📖 Installation Guide](docs/INSTALLATION.md)
- [🔌 API Documentation](docs/API.md)
- [❓ FAQ](docs/FAQ.md)
- [🏗️ Project Structure](PROJECT_STRUCTURE.md)

## 🎨 UI Features

### Professional Terminal Interface
- **ASCII Art Branding** with gradient colors
- **Status Information Panel** with system indicators
- **Real-time Streaming** responses
- **Syntax Highlighting** for generated code
- **Conversation History** with session management

### Command System
- **Interactive Commands** with `/help`, `/exit`, etc.
- **Direct Mode** for scripting and automation
- **File Operations** with save, edit, and create
- **Clipboard Integration** for macOS

## 🤝 Contributing

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

- **Inspired by** [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- **Powered by** Apple Intelligence on-device models
- **Built with** TypeScript, Node.js, and modern CLI tools
- **UI Design** inspired by industry-leading CLI applications

## 🔗 Links

- **Repository**: [https://github.com/0xatrilla/Apple-AI-CLI](https://github.com/0xatrilla/Apple-AI-CLI)
- **Issues**: [Report a bug](https://github.com/0xatrilla/Apple-AI-CLI/issues)
- **Discussions**: [Join the conversation](https://github.com/0xatrilla/Apple-AI-CLI/discussions)

---

<div align="center">

**🍎 Built with Apple Intelligence • Made for Developers**

*No API keys required • On-device AI • Professional CLI experience*

</div>