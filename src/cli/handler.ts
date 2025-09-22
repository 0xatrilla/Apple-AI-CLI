/**
 * Main CLI handler for Apple Code Assistant
 */

import { CLIArgs, CodeGenerationOptions, CodeResult } from '../types';
import { AppleFoundationClient } from '../api/foundation-client';
import { ConfigManager } from '../config';
import { LanguageDetector } from '../utils/language-detector';
import { SyntaxHighlighter } from '../utils/syntax-highlighter';
import { FileOperations } from '../utils/file-operations';
import { ClipboardManager } from '../utils/clipboard';
import { AppLogger } from '../utils/logger';
import { InteractiveCLI } from './interactive';
import { SimpleTerminalUI } from '../ui/simple-terminal-ui';
import { ConversationManager } from '../ui/conversation-manager';
import { StreamingHandler } from '../ui/streaming-handler';
import chalk from 'chalk';
import boxen from 'boxen';
import ora from 'ora';

export class CLIHandler {
  private configManager: ConfigManager;
  private logger: AppLogger;
  private client?: AppleFoundationClient;
  private conversationManager?: ConversationManager;
  private streamingHandler?: StreamingHandler;

  constructor() {
    this.configManager = new ConfigManager();
    this.logger = AppLogger.create('info', false);
  }

  /**
   * Handle CLI execution
   */
  public async handle(args: CLIArgs): Promise<void> {
    try {
      // Load configuration
      const config = await this.configManager.loadConfig();
      
      // Validate configuration
      const configErrors = this.configManager.validateConfig(config);
      if (configErrors.length > 0) {
        this.logger.error('Configuration errors:');
        configErrors.forEach(error => this.logger.error(`  - ${error}`));
        process.exit(1);
      }

      // Initialize Apple Intelligence client (no API key needed)
      this.client = new AppleFoundationClient(config.model!);
      
      // Initialize UI components
      this.conversationManager = new ConversationManager();
      this.streamingHandler = new StreamingHandler(this.client);
      
      // Set logger level
      if (args.debug) {
        this.logger.setDebugMode(true);
        this.logger.setLogLevel('debug');
      } else if (args.verbose) {
        this.logger.setLogLevel('info');
      }

      // Check if a subcommand was executed
      const rawArgs = process.argv.slice(2);
      const subcommands = ['config', 'models', 'languages', 'test'];
      const hasSubcommand = rawArgs.some(arg => subcommands.includes(arg));
      
      if (hasSubcommand) {
        // Subcommand was handled by Commander.js, exit
        return;
      }

      // Handle different command modes
      if (args.interactive) {
        await this.handleModernUI();
      } else if (args.prompt) {
        await this.handleDirectMode(args);
      } else {
        // Show help if no arguments provided
        this.showHelp();
      }
    } catch (error) {
      this.logger.error(`Execution failed: ${error}`);
      process.exit(1);
    }
  }

  /**
   * Handle modern UI mode (replaces old interactive mode)
   */
  private async handleModernUI(): Promise<void> {
    if (!this.client) {
      this.logger.error('Apple Intelligence client not initialized');
      return;
    }

    try {
      // Create new conversation session
      this.conversationManager!.createSession('Apple Code Assistant Session');
      
      // Initialize and start the modern terminal UI
      const ui = new SimpleTerminalUI(this.client);
      await ui.start();
      
    } catch (error) {
      this.logger.error(`Failed to start modern UI: ${error}`);
      // Fallback to old interactive mode
      await this.handleLegacyInteractiveMode();
    }
  }

  /**
   * Handle legacy interactive mode (fallback)
   */
  private async handleLegacyInteractiveMode(): Promise<void> {
    InteractiveCLI.showWelcome();
    
    while (true) {
      try {
        const { command } = await this.promptForCommand();
        
        switch (command.toLowerCase()) {
          case 'generate':
          case 'g':
            await this.handleGenerateCommand();
            break;
          case 'config':
          case 'c':
            await this.handleConfigCommand();
            break;
          case 'models':
          case 'm':
            await this.handleModelsCommand();
            break;
          case 'languages':
          case 'l':
            await this.handleLanguagesCommand();
            break;
          case 'test':
          case 't':
            await this.handleTestCommand();
            break;
          case 'help':
          case 'h':
            InteractiveCLI.showHelp();
            break;
          case 'exit':
          case 'quit':
            InteractiveCLI.showSuccess('Goodbye!');
            return;
          default:
            InteractiveCLI.showError(`Unknown command: ${command}`);
        }
      } catch (error) {
        InteractiveCLI.showError(`Command failed: ${error}`);
      }
    }
  }

  /**
   * Handle direct mode (non-interactive)
   */
  private async handleDirectMode(args: CLIArgs): Promise<void> {
    const options: CodeGenerationOptions = {
      prompt: args.prompt!,
      language: args.language,
      context: args.context,
      maxTokens: args.maxTokens,
      temperature: args.temperature,
    };

    // Auto-detect language if not specified
    if (!options.language) {
      options.language = LanguageDetector.suggestLanguage(options.prompt, options.context);
    }

    const result = await this.generateCode(options);
    await this.handleOutput(result, args);
  }

  /**
   * Handle generate command in interactive mode
   */
  private async handleGenerateCommand(): Promise<void> {
    const options = await InteractiveCLI.startInteractive();
    const result = await this.generateCode(options);
    
    const outputOptions = await InteractiveCLI.promptForOutputOptions();
    await this.handleOutput(result, outputOptions);
  }

  /**
   * Handle config command
   */
  private async handleConfigCommand(): Promise<void> {
    const configAction = await InteractiveCLI.promptForConfiguration();
    
    switch (configAction.action) {
      case 'set':
        await this.configManager.saveConfig({ [configAction.key!]: configAction.value });
        InteractiveCLI.showSuccess(`Configuration set: ${configAction.key} = ${configAction.value}`);
        break;
      case 'get':
        const config = this.configManager.getConfig();
        const value = (config as any)[configAction.key!];
        console.log(chalk.blue(`${configAction.key}: ${value || 'not set'}`));
        break;
      case 'list':
        const allConfig = this.configManager.getConfig();
        console.log(chalk.blue('\nCurrent Configuration:'));
        Object.entries(allConfig).forEach(([key, value]) => {
          console.log(chalk.white(`  ${key}: ${value}`));
        });
        break;
      case 'reset':
        const confirmed = await InteractiveCLI.promptForConfirmation('Reset configuration to defaults?');
        if (confirmed) {
          await this.configManager.saveConfig({});
          InteractiveCLI.showSuccess('Configuration reset to defaults');
        }
        break;
    }
  }

  /**
   * Handle models command
   */
  private async handleModelsCommand(): Promise<void> {
    if (!this.client) {
      InteractiveCLI.showError('API client not initialized');
      return;
    }

    const spinner = ora('Fetching available models...').start();
    try {
      const models = await this.client.getAvailableModels();
      spinner.stop();
      
      console.log(chalk.blue('\nAvailable Apple Foundation Models:'));
      models.forEach(model => {
        console.log(chalk.white(`  - ${model}`));
      });
    } catch (error) {
      spinner.stop();
      InteractiveCLI.showError(`Failed to fetch models: ${error}`);
    }
  }

  /**
   * Handle languages command
   */
  private async handleLanguagesCommand(): Promise<void> {
    const languages = LanguageDetector.getSupportedLanguages();
    
    console.log(chalk.blue('\nSupported Programming Languages:'));
    languages.forEach(lang => {
      console.log(chalk.white(`  - ${lang.name} (${lang.extensions.join(', ')})`));
    });
  }

  /**
   * Handle test command
   */
  private async handleTestCommand(): Promise<void> {
    if (!this.client) {
      InteractiveCLI.showError('API client not initialized');
      return;
    }

    const spinner = ora('Testing API connection...').start();
    try {
      const isConnected = await this.client.testConnection();
      spinner.stop();
      
      if (isConnected) {
        InteractiveCLI.showSuccess('API connection successful!');
      } else {
        InteractiveCLI.showError('API connection failed');
      }
    } catch (error) {
      spinner.stop();
      InteractiveCLI.showError(`API test failed: ${error}`);
    }
  }

  /**
   * Generate code using Apple Foundation Models
   */
  private async generateCode(options: CodeGenerationOptions): Promise<CodeResult> {
    if (!this.client) {
      throw new Error('API client not initialized');
    }

    const spinner = ora('Generating code...').start();
    try {
      const result = await this.client.generateCode(options);
      spinner.stop();
      
      this.logger.debug(`Code generated successfully. Tokens used: ${result.metadata?.tokensUsed}`);
      return result;
    } catch (error) {
      spinner.stop();
      throw new Error(`Code generation failed: ${error}`);
    }
  }

  /**
   * Handle output options (save, copy, preview)
   */
  private async handleOutput(result: CodeResult, options: any): Promise<void> {
    const { save, copy, preview, outputFile } = options;

    if (preview) {
      this.previewCode(result);
    }

    if (copy) {
      await ClipboardManager.copyWithConfirmation(result.code, 'Code copied to clipboard');
    }

    if (save) {
      const filePath = outputFile || this.generateDefaultFileName(result.language);
      await FileOperations.saveToFile(filePath, result.code);
    }
  }

  /**
   * Preview code in terminal with syntax highlighting
   */
  private previewCode(result: CodeResult): void {
    const config = this.configManager.getConfig();
    const highlighted = SyntaxHighlighter.highlight(result.code, result.language, config.theme);
    
    const box = boxen(highlighted, {
      title: `${result.language.toUpperCase()} Code`,
      titleAlignment: 'center',
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'blue',
    });
    
    console.log(box);
    
    if (result.metadata) {
      console.log(chalk.gray(`\nGenerated using ${result.metadata.model} (${result.metadata.tokensUsed} tokens)`));
    }
  }

  /**
   * Generate default file name based on language
   */
  private generateDefaultFileName(language: string): string {
    const extensions: { [key: string]: string } = {
      typescript: '.ts',
      javascript: '.js',
      python: '.py',
      java: '.java',
      csharp: '.cs',
      cpp: '.cpp',
      c: '.c',
      go: '.go',
      rust: '.rs',
      swift: '.swift',
      kotlin: '.kt',
      php: '.php',
      ruby: '.rb',
      html: '.html',
      css: '.css',
      scss: '.scss',
      json: '.json',
      yaml: '.yml',
      xml: '.xml',
      markdown: '.md',
      bash: '.sh',
      powershell: '.ps1',
      sql: '.sql',
      dockerfile: 'Dockerfile',
    };

    const extension = extensions[language] || '.txt';
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return `generated-code-${timestamp}${extension}`;
  }

  /**
   * Prompt for command in interactive mode
   */
  private async promptForCommand(): Promise<{ command: string }> {
    const { command } = await require('inquirer').prompt([
      {
        type: 'input',
        name: 'command',
        message: 'apple-code>',
        validate: (input: string) => {
          if (!input.trim()) {
            return 'Please enter a command';
          }
          return true;
        },
      },
    ]);

    return { command: command.trim() };
  }

  /**
   * Show help message
   */
  private showHelp(): void {
    console.log(chalk.blue.bold('\n🍎 Apple Code Assistant\n'));
    console.log(chalk.white('Generate code using Apple Foundation Models\n'));
    console.log(chalk.yellow('Usage:'));
    console.log(chalk.white('  apple-code [options]'));
    console.log(chalk.white('  apple-code -i                    # Interactive mode'));
    console.log(chalk.white('  apple-code -p "create a React component"'));
    console.log(chalk.white('  apple-code -p "sort array" -l python --save\n'));
    console.log(chalk.yellow('Options:'));
    console.log(chalk.white('  -p, --prompt <prompt>           Code generation prompt'));
    console.log(chalk.white('  -l, --language <language>       Programming language'));
    console.log(chalk.white('  -o, --output <file>             Output file path'));
    console.log(chalk.white('  -i, --interactive               Interactive mode'));
    console.log(chalk.white('  --save                          Save to file'));
    console.log(chalk.white('  --copy                          Copy to clipboard'));
    console.log(chalk.white('  --preview                       Preview in terminal'));
    console.log(chalk.white('  --help                          Show help\n'));
  }
}
