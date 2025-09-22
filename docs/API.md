# API Reference

## AppleFoundationClient

The main client for interacting with Apple's Foundation Models API.

### Constructor

```typescript
new AppleFoundationClient(apiKey: string, model?: string)
```

**Parameters:**
- `apiKey` (string): Your Apple Foundation Models API key
- `model` (string, optional): Model to use (default: 'apple-foundation-model-v1')

### Methods

#### generateCode(options: CodeGenerationOptions): Promise<CodeResult>

Generates code using Apple Foundation Models.

**Parameters:**
- `options` (CodeGenerationOptions): Configuration for code generation

**Returns:** Promise<CodeResult>

**Example:**
```typescript
const client = new AppleFoundationClient(apiKey);
const result = await client.generateCode({
  prompt: "create a React component",
  language: "typescript",
  maxTokens: 4000,
  temperature: 0.7
});
```

#### testConnection(): Promise<boolean>

Tests the API connection.

**Returns:** Promise<boolean>

#### getAvailableModels(): Promise<string[]>

Gets list of available models.

**Returns:** Promise<string[]>

## ConfigManager

Manages configuration for the application.

### Constructor

```typescript
new ConfigManager()
```

### Methods

#### loadConfig(): Promise<Config>

Loads configuration from file and environment variables.

**Returns:** Promise<Config>

#### saveConfig(config: Partial<Config>): Promise<void>

Saves configuration to file.

**Parameters:**
- `config` (Partial<Config>): Configuration to save

#### getConfig(): Config

Gets current configuration.

**Returns:** Config

#### validateConfig(config: Config): string[]

Validates configuration and returns any errors.

**Parameters:**
- `config` (Config): Configuration to validate

**Returns:** string[]

## LanguageDetector

Utility for detecting and managing programming languages.

### Static Methods

#### detectFromExtension(filename: string): string | null

Detects language from file extension.

**Parameters:**
- `filename` (string): File name with extension

**Returns:** string | null

#### detectFromContent(content: string): string | null

Detects language from file content.

**Parameters:**
- `content` (string): File content

**Returns:** string | null

#### suggestLanguage(prompt: string, context?: string): string

Suggests language based on prompt and context.

**Parameters:**
- `prompt` (string): Code generation prompt
- `context` (string, optional): Additional context

**Returns:** string

#### getSupportedLanguages(): SupportedLanguage[]

Gets list of all supported languages.

**Returns:** SupportedLanguage[]

## SyntaxHighlighter

Utility for syntax highlighting in terminal.

### Static Methods

#### highlight(code: string, language: string, theme?: 'light' | 'dark'): string

Highlights code with syntax highlighting.

**Parameters:**
- `code` (string): Code to highlight
- `language` (string): Programming language
- `theme` ('light' | 'dark', optional): Theme (default: 'dark')

**Returns:** string

#### formatWithLineNumbers(code: string, startLine?: number): string

Formats code with line numbers.

**Parameters:**
- `code` (string): Code to format
- `startLine` (number, optional): Starting line number (default: 1)

**Returns:** string

#### createCodeBlock(code: string, language: string, theme?: 'light' | 'dark'): string

Creates a formatted code block.

**Parameters:**
- `code` (string): Code content
- `language` (string): Programming language
- `theme` ('light' | 'dark', optional): Theme (default: 'dark')

**Returns:** string

## FileOperations

Utility for file system operations.

### Static Methods

#### saveToFile(filePath: string, content: string, backup?: boolean): Promise<void>

Saves content to file.

**Parameters:**
- `filePath` (string): File path
- `content` (string): Content to save
- `backup` (boolean, optional): Create backup if file exists

#### readFile(filePath: string): Promise<string>

Reads file content.

**Parameters:**
- `filePath` (string): File path

**Returns:** Promise<string>

#### fileExists(filePath: string): Promise<boolean>

Checks if file exists.

**Parameters:**
- `filePath` (string): File path

**Returns:** Promise<boolean>

#### createTempFile(content: string, extension?: string): Promise<string>

Creates temporary file.

**Parameters:**
- `content` (string): File content
- `extension` (string, optional): File extension (default: '.tmp')

**Returns:** Promise<string>

## ClipboardManager

Utility for clipboard operations on macOS.

### Static Methods

#### copyToClipboard(text: string): Promise<void>

Copies text to clipboard.

**Parameters:**
- `text` (string): Text to copy

#### readFromClipboard(): Promise<string>

Reads text from clipboard.

**Returns:** Promise<string>

#### isAvailable(): Promise<boolean>

Checks if clipboard is available.

**Returns:** Promise<boolean>

#### copyWithConfirmation(text: string, message?: string): Promise<void>

Copies text with confirmation message.

**Parameters:**
- `text` (string): Text to copy
- `message` (string, optional): Confirmation message

## AppLogger

Logger utility for the application.

### Constructor

```typescript
new AppLogger(logLevel?: LogLevel, debugMode?: boolean)
```

**Parameters:**
- `logLevel` (LogLevel, optional): Log level (default: 'info')
- `debugMode` (boolean, optional): Debug mode (default: false)

### Methods

#### debug(message: string, ...args: any[]): void

Logs debug message.

#### info(message: string, ...args: any[]): void

Logs info message.

#### warn(message: string, ...args: any[]): void

Logs warning message.

#### error(message: string, ...args: any[]): void

Logs error message.

#### success(message: string, ...args: any[]): void

Logs success message.

#### failure(message: string, ...args: any[]): void

Logs failure message.

#### setLogLevel(level: LogLevel): void

Sets log level.

**Parameters:**
- `level` (LogLevel): New log level

#### setDebugMode(enabled: boolean): void

Sets debug mode.

**Parameters:**
- `enabled` (boolean): Enable debug mode

## Types

### Config

```typescript
interface Config {
  apiKey?: string;
  model?: string;
  defaultLanguage?: string;
  outputFormat?: 'terminal' | 'file' | 'clipboard';
  theme?: 'light' | 'dark';
  maxTokens?: number;
  temperature?: number;
}
```

### CodeGenerationOptions

```typescript
interface CodeGenerationOptions {
  prompt: string;
  language?: string;
  context?: string;
  maxTokens?: number;
  temperature?: number;
}
```

### CodeResult

```typescript
interface CodeResult {
  code: string;
  language: string;
  metadata?: {
    tokensUsed: number;
    model: string;
    timestamp: Date;
  };
}
```

### CLIArgs

```typescript
interface CLIArgs {
  prompt?: string;
  language?: string;
  output?: string;
  interactive?: boolean;
  config?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  save?: boolean;
  copy?: boolean;
  preview?: boolean;
  edit?: string;
  context?: string;
}
```

### SupportedLanguage

```typescript
interface SupportedLanguage {
  name: string;
  extensions: string[];
  highlightAlias: string;
}
```

### LogLevel

```typescript
type LogLevel = 'debug' | 'info' | 'warn' | 'error';
```
