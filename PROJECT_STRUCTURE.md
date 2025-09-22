# Project Structure

```
apple-code-assistant/
├── src/                          # Source code
│   ├── api/                      # API client
│   │   └── foundation-client.ts  # Apple Foundation Models API client
│   ├── cli/                      # CLI interface
│   │   ├── handler.ts            # Main CLI handler
│   │   ├── interactive.ts        # Interactive mode interface
│   │   └── parser.ts             # Command-line argument parser
│   ├── config/                   # Configuration management
│   │   └── index.ts              # Config manager
│   ├── types/                    # TypeScript type definitions
│   │   └── index.ts              # All type definitions
│   ├── utils/                    # Utility functions
│   │   ├── clipboard.ts          # Clipboard operations
│   │   ├── file-operations.ts    # File system operations
│   │   ├── language-detector.ts  # Language detection
│   │   ├── logger.ts             # Logging utility
│   │   └── syntax-highlighter.ts # Syntax highlighting
│   └── index.ts                  # Main entry point
├── docs/                         # Documentation
│   ├── API.md                    # API reference
│   ├── FAQ.md                    # Frequently asked questions
│   └── INSTALLATION.md           # Installation guide
├── scripts/                      # Build and utility scripts
│   ├── build.sh                  # Build script
│   ├── install.sh                # Installation script
│   └── test.sh                   # Test script
├── .gitignore                    # Git ignore rules
├── LICENSE                       # MIT license
├── README.md                     # Main documentation
├── env.example                   # Environment variables example
├── package.json                  # Node.js package configuration
├── PROJECT_STRUCTURE.md          # This file
└── tsconfig.json                 # TypeScript configuration
```

## Key Components

### Core Modules

1. **AppleFoundationClient** (`src/api/foundation-client.ts`)
   - Handles communication with Apple's Foundation Models API
   - Manages authentication and request/response handling
   - Provides code generation functionality

2. **CLIHandler** (`src/cli/handler.ts`)
   - Main CLI orchestration
   - Handles both interactive and direct modes
   - Manages output options (save, copy, preview)

3. **ConfigManager** (`src/config/index.ts`)
   - Manages configuration from files and environment variables
   - Validates configuration settings
   - Provides default values

4. **LanguageDetector** (`src/utils/language-detector.ts`)
   - Auto-detects programming languages from prompts and context
   - Supports 25+ programming languages
   - Provides language suggestions

5. **SyntaxHighlighter** (`src/utils/syntax-highlighter.ts`)
   - Provides syntax highlighting for terminal output
   - Supports light and dark themes
   - Uses highlight.js for language support

### Utility Modules

- **FileOperations** (`src/utils/file-operations.ts`): File system operations
- **ClipboardManager** (`src/utils/clipboard.ts`): macOS clipboard integration
- **AppLogger** (`src/utils/logger.ts`): Logging and output formatting
- **CLIParser** (`src/cli/parser.ts`): Command-line argument parsing
- **InteractiveCLI** (`src/cli/interactive.ts`): Interactive user interface

### Type Definitions

All TypeScript interfaces and types are defined in `src/types/index.ts`:
- `Config`: Configuration interface
- `CodeGenerationOptions`: Code generation parameters
- `CodeResult`: Generated code result
- `CLIArgs`: Command-line arguments
- `SupportedLanguage`: Language information
- `Logger`: Logging interface

## Build Process

1. **Development**: `npm run dev` - Run with ts-node
2. **Build**: `npm run build` - Compile TypeScript to JavaScript
3. **Install**: `npm install -g .` - Install globally
4. **Test**: `npm run test` - Run tests

## Configuration

- **Environment Variables**: Set via shell or `.env` file
- **Config File**: `~/.apple-code-assistant/config.json`
- **Default Values**: Built into ConfigManager

## Dependencies

### Production Dependencies
- `commander`: CLI argument parsing
- `inquirer`: Interactive prompts
- `chalk`: Terminal colors
- `highlight.js`: Syntax highlighting
- `clipboardy`: Clipboard operations
- `fs-extra`: Enhanced file operations
- `dotenv`: Environment variable loading
- `ora`: Loading spinners
- `boxen`: Terminal boxes

### Development Dependencies
- `typescript`: TypeScript compiler
- `ts-node`: TypeScript execution
- `@types/*`: TypeScript type definitions

## Features Implemented

✅ **Core Functionality**
- Apple Foundation Models API integration
- Code generation with multiple languages
- Interactive and direct CLI modes
- Configuration management
- Error handling and validation

✅ **User Experience**
- Syntax highlighting in terminal
- Progress indicators and loading states
- Interactive prompts and menus
- Help system and documentation
- Colored output and formatting

✅ **File Operations**
- Save generated code to files
- Edit existing files
- Create new files
- Backup functionality
- File validation

✅ **Integration**
- Clipboard support for macOS
- Environment variable configuration
- Config file management
- Global installation support

✅ **Developer Experience**
- TypeScript with strict typing
- Modular architecture
- Comprehensive error handling
- Extensive documentation
- Build and test scripts

## Usage Examples

```bash
# Interactive mode
apple-code -i

# Direct code generation
apple-code -p "create a React component" -l typescript

# Save to file
apple-code -p "implement sorting algorithm" -l python --save -o sort.py

# Copy to clipboard
apple-code -p "create utility function" --copy

# With context
apple-code -p "create API endpoint" --context "for Express.js application"
```

## Architecture Benefits

1. **Modularity**: Each component has a single responsibility
2. **Extensibility**: Easy to add new languages, features, or output formats
3. **Maintainability**: Clear separation of concerns and TypeScript typing
4. **Testability**: Components can be tested independently
5. **User-Friendly**: Interactive mode and comprehensive help system
6. **Cross-Platform**: Designed for macOS with Apple Silicon support
