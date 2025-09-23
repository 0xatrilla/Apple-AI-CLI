/**
 * CLI argument parser using Commander.js
 */

import { Command } from 'commander';
import { CLIArgs } from '../types';

export class CLIParser {
  private program: Command;

  constructor() {
    this.program = new Command();
    this.setupCommands();
  }

  /**
   * Setup CLI commands and options
   */
  private setupCommands(): void {
    this.program
      .name('apple-code')
      .description('Apple Code Assistant - Generate code using Apple Foundation Models')
      .version('1.0.0')
      .allowUnknownOption() // Allow unknown options to prevent help from showing
      .exitOverride() // Override default exit behavior
      .option('-p, --prompt <prompt>', 'Code generation prompt')
      .option('-l, --language <language>', 'Programming language (typescript, javascript, python, etc.)')
      .option('-o, --output <file>', 'Output file path')
      .option('-i, --interactive', 'Interactive mode (default when no prompt provided)')
      .option('-c, --config <file>', 'Configuration file path')
      .option('-m, --model <model>', 'Apple Foundation Model to use')
      .option('-t, --temperature <number>', 'Temperature for code generation (0-2)', '0.7')
      .option('--max-tokens <number>', 'Maximum tokens to generate', '4000')
      .option('-s, --save', 'Save generated code to file')
      .option('--copy', 'Copy generated code to clipboard')
      .option('--preview', 'Preview generated code in terminal')
      .option('-e, --edit <file>', 'Edit existing file with generated code')
      .option('--context <context>', 'Additional context for code generation')
      .option('--theme <theme>', 'Terminal theme (light/dark)', 'dark')
      .option('--no-color', 'Disable colored output')
      .option('--verbose', 'Verbose output')
      .option('--debug', 'Debug mode');

    // Add subcommands
    this.program
      .command('config')
      .description('Manage configuration')
      .option('--set <key=value>', 'Set configuration value')
      .option('--get <key>', 'Get configuration value')
      .option('--list', 'List all configuration values')
      .option('--reset', 'Reset configuration to defaults')
      .action(this.handleConfigCommand.bind(this));

    this.program
      .command('models')
      .description('List available Apple Foundation Models')
      .action(this.handleModelsCommand.bind(this));

    this.program
      .command('languages')
      .description('List supported programming languages')
      .action(this.handleLanguagesCommand.bind(this));

    this.program
      .command('test')
      .description('Test API connection')
      .action(this.handleTestCommand.bind(this));
  }

  /**
   * Parse CLI arguments
   */
  public parse(args: string[]): CLIArgs {
    // Check for interactive mode cases first
    if (args.length === 0 || (args.length === 1 && (args[0] === '-i' || args[0] === '--interactive'))) {
      // Return default args for interactive mode
      return {
        prompt: undefined,
        language: undefined,
        output: undefined,
        interactive: true,
        config: undefined,
        model: undefined,
        temperature: 0.7,
        maxTokens: 4000,
        save: false,
        copy: false,
        preview: undefined,
        edit: undefined,
        context: undefined,
        debug: false,
        verbose: false,
      };
    }
    
    // Check if this is a subcommand
    const subcommands = ['config', 'models', 'languages', 'test'];
    const hasSubcommand = args.some(arg => subcommands.includes(arg));
    
    if (hasSubcommand) {
      // Let Commander.js handle subcommands
      this.program.parse(args, { from: 'node' });
      // Return empty args since subcommand was handled
      return {
        prompt: undefined,
        language: undefined,
        output: undefined,
        interactive: false,
        config: undefined,
        model: undefined,
        temperature: 0.7,
        maxTokens: 4000,
        save: false,
        copy: false,
        preview: undefined,
        edit: undefined,
        context: undefined,
        debug: false,
        verbose: false,
      };
    }
    
    // For direct mode, use manual parsing to avoid Commander.js help issues
    const manualOptions = this.parseOptionsManually(args);
    if (manualOptions.prompt) {
      return manualOptions;
    }
    
    // If no prompt found, return default interactive mode
    return {
      prompt: undefined,
      language: undefined,
      output: undefined,
      interactive: true,
      config: undefined,
      model: undefined,
      temperature: 0.7,
      maxTokens: 4000,
      save: false,
      copy: false,
      preview: undefined,
      edit: undefined,
      context: undefined,
      debug: false,
      verbose: false,
    };
  }

  /**
   * Handle main command
   */
  private handleMainCommand(): void {
    // Main command logic is handled by the parser
    // This method is called when the main command is executed
  }

  /**
   * Manually parse options when Commander.js fails
   */
  private parseOptionsManually(args: string[]): CLIArgs {
    const options: any = {};
    
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      
      switch (arg) {
        case '-p':
        case '--prompt':
          options.prompt = args[i + 1];
          i++; // Skip next argument
          break;
        case '-l':
        case '--language':
          options.language = args[i + 1];
          i++; // Skip next argument
          break;
        case '-o':
        case '--output':
          options.output = args[i + 1];
          i++; // Skip next argument
          break;
        case '-i':
        case '--interactive':
          options.interactive = true;
          break;
        case '-c':
        case '--config':
          options.config = args[i + 1];
          i++; // Skip next argument
          break;
        case '-m':
        case '--model':
          options.model = args[i + 1];
          i++; // Skip next argument
          break;
        case '-t':
        case '--temperature':
          options.temperature = parseFloat(args[i + 1]);
          i++; // Skip next argument
          break;
        case '--max-tokens':
          options.maxTokens = parseInt(args[i + 1]);
          i++; // Skip next argument
          break;
        case '-s':
        case '--save':
          options.save = true;
          break;
        case '--copy':
          options.copy = true;
          break;
        case '--preview':
          options.preview = true;
          break;
        case '-e':
        case '--edit':
          options.edit = args[i + 1];
          i++; // Skip next argument
          break;
        case '--context':
          options.context = args[i + 1];
          i++; // Skip next argument
          break;
        case '--theme':
          options.theme = args[i + 1];
          i++; // Skip next argument
          break;
        case '--no-color':
          options.noColor = true;
          break;
        case '--verbose':
          options.verbose = true;
          break;
        case '--debug':
          options.debug = true;
          break;
      }
    }
    
    return {
      prompt: options.prompt,
      language: options.language,
      output: options.output,
      interactive: options.interactive || false,
      config: options.config,
      model: options.model,
      temperature: options.temperature || 0.7,
      maxTokens: options.maxTokens || 4000,
      save: options.save || false,
      copy: options.copy || false,
      preview: options.preview,
      edit: options.edit,
      context: options.context,
      debug: options.debug || false,
      verbose: options.verbose || false,
    };
  }

  /**
   * Handle config command
   */
  private handleConfigCommand(options: any): void {
    // Config command logic will be implemented in the main CLI handler
    console.log('Config command:', options);
  }

  /**
   * Handle models command
   */
  private handleModelsCommand(): void {
    // Models command logic will be implemented in the main CLI handler
    console.log('Models command');
  }

  /**
   * Handle languages command
   */
  private handleLanguagesCommand(): void {
    // Languages command logic will be implemented in the main CLI handler
    console.log('Languages command');
  }

  /**
   * Handle test command
   */
  private handleTestCommand(): void {
    // Test command logic will be implemented in the main CLI handler
    console.log('Test command');
  }

  /**
   * Get help text
   */
  public getHelp(): string {
    return this.program.help();
  }

  /**
   * Get version
   */
  public getVersion(): string {
    return this.program.version() || '1.0.0';
  }

  /**
   * Check if help was requested
   */
  public isHelpRequested(): boolean {
    return this.program.args.includes('--help') || this.program.args.includes('-h');
  }

  /**
   * Check if version was requested
   */
  public isVersionRequested(): boolean {
    return this.program.args.includes('--version') || this.program.args.includes('-v');
  }

  /**
   * Get raw arguments
   */
  public getRawArgs(): string[] {
    return this.program.args;
  }

  /**
   * Get parsed options
   */
  public getOptions(): any {
    return this.program.opts();
  }
}
