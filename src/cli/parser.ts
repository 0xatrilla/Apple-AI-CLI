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
      .option('-p, --prompt <prompt>', 'Code generation prompt')
      .option('-l, --language <language>', 'Programming language (typescript, javascript, python, etc.)')
      .option('-o, --output <file>', 'Output file path')
      .option('-i, --interactive', 'Interactive mode')
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
    this.program.parse(args, { from: 'node' });
    const options = this.program.opts();
    
    return {
      prompt: options.prompt,
      language: options.language,
      output: options.output,
      interactive: options.interactive,
      config: options.config,
      model: options.model,
      temperature: parseFloat(options.temperature),
      maxTokens: parseInt(options.maxTokens),
      save: options.save,
      copy: options.copy,
      preview: options.preview,
      edit: options.edit,
      context: options.context,
      debug: options.debug,
      verbose: options.verbose,
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
