/**
 * Interactive CLI interface using Inquirer
 */

import inquirer from 'inquirer';
import chalk from 'chalk';
import { CodeGenerationOptions } from '../types';
import { LanguageDetector } from '../utils/language-detector';

export class InteractiveCLI {
  /**
   * Start interactive mode
   */
  public static async startInteractive(): Promise<CodeGenerationOptions> {
    console.log(chalk.blue.bold('\n🍎 Apple Code Assistant - Interactive Mode\n'));
    
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'prompt',
        message: 'What code would you like me to generate?',
        validate: (input: string) => {
          if (!input.trim()) {
            return 'Please enter a prompt for code generation';
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'language',
        message: 'Select programming language:',
        choices: [
          { name: 'TypeScript', value: 'typescript' },
          { name: 'JavaScript', value: 'javascript' },
          { name: 'Python', value: 'python' },
          { name: 'Java', value: 'java' },
          { name: 'C#', value: 'csharp' },
          { name: 'C++', value: 'cpp' },
          { name: 'C', value: 'c' },
          { name: 'Go', value: 'go' },
          { name: 'Rust', value: 'rust' },
          { name: 'Swift', value: 'swift' },
          { name: 'Kotlin', value: 'kotlin' },
          { name: 'PHP', value: 'php' },
          { name: 'Ruby', value: 'ruby' },
          { name: 'HTML', value: 'html' },
          { name: 'CSS', value: 'css' },
          { name: 'SCSS', value: 'scss' },
          { name: 'JSON', value: 'json' },
          { name: 'YAML', value: 'yaml' },
          { name: 'XML', value: 'xml' },
          { name: 'Markdown', value: 'markdown' },
          { name: 'Bash', value: 'bash' },
          { name: 'PowerShell', value: 'powershell' },
          { name: 'SQL', value: 'sql' },
          { name: 'Dockerfile', value: 'dockerfile' },
        ],
        default: 'typescript',
      },
      {
        type: 'input',
        name: 'context',
        message: 'Additional context (optional):',
        default: '',
      },
      {
        type: 'number',
        name: 'maxTokens',
        message: 'Maximum tokens (1-8000):',
        default: 4000,
        validate: (input: number) => {
          if (input < 1 || input > 8000) {
            return 'Maximum tokens must be between 1 and 8000';
          }
          return true;
        },
      },
      {
        type: 'number',
        name: 'temperature',
        message: 'Temperature (0-2):',
        default: 0.7,
        validate: (input: number) => {
          if (input < 0 || input > 2) {
            return 'Temperature must be between 0 and 2';
          }
          return true;
        },
      },
    ]);

    return {
      prompt: answers.prompt,
      language: answers.language,
      context: answers.context || undefined,
      maxTokens: answers.maxTokens,
      temperature: answers.temperature,
    };
  }

  /**
   * Prompt for output options
   */
  public static async promptForOutputOptions(): Promise<{
    save: boolean;
    copy: boolean;
    preview: boolean;
    outputFile?: string;
  }> {
    const answers = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'actions',
        message: 'What would you like to do with the generated code?',
        choices: [
          { name: 'Preview in terminal', value: 'preview' },
          { name: 'Copy to clipboard', value: 'copy' },
          { name: 'Save to file', value: 'save' },
        ],
        default: ['preview'],
      },
      {
        type: 'input',
        name: 'outputFile',
        message: 'Output file path (if saving):',
        when: (answers: any) => answers.actions.includes('save'),
        validate: (input: string) => {
          if (!input.trim()) {
            return 'Please enter a file path';
          }
          return true;
        },
      },
    ]);

    return {
      save: answers.actions.includes('save'),
      copy: answers.actions.includes('copy'),
      preview: answers.actions.includes('preview'),
      outputFile: answers.outputFile,
    };
  }

  /**
   * Prompt for file editing
   */
  public static async promptForFileEdit(): Promise<{
    filePath: string;
    backup: boolean;
  }> {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'filePath',
        message: 'Enter file path to edit:',
        validate: (input: string) => {
          if (!input.trim()) {
            return 'Please enter a file path';
          }
          return true;
        },
      },
      {
        type: 'confirm',
        name: 'backup',
        message: 'Create backup before editing?',
        default: true,
      },
    ]);

    return {
      filePath: answers.filePath,
      backup: answers.backup,
    };
  }

  /**
   * Prompt for configuration
   */
  public static async promptForConfiguration(): Promise<{
    action: 'set' | 'get' | 'list' | 'reset';
    key?: string;
    value?: string;
  }> {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Configuration action:',
        choices: [
          { name: 'Set configuration value', value: 'set' },
          { name: 'Get configuration value', value: 'get' },
          { name: 'List all configuration', value: 'list' },
          { name: 'Reset to defaults', value: 'reset' },
        ],
      },
      {
        type: 'input',
        name: 'key',
        message: 'Configuration key:',
        when: (answers: any) => answers.action === 'set' || answers.action === 'get',
        validate: (input: string) => {
          if (!input.trim()) {
            return 'Please enter a configuration key';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'value',
        message: 'Configuration value:',
        when: (answers: any) => answers.action === 'set',
        validate: (input: string) => {
          if (!input.trim()) {
            return 'Please enter a configuration value';
          }
          return true;
        },
      },
    ]);

    return answers;
  }

  /**
   * Prompt for confirmation
   */
  public static async promptForConfirmation(message: string, defaultValue: boolean = true): Promise<boolean> {
    const answer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmed',
        message,
        default: defaultValue,
      },
    ]);

    return answer.confirmed;
  }

  /**
   * Prompt for language selection with auto-detection
   */
  public static async promptForLanguageWithDetection(prompt: string, context?: string): Promise<string> {
    const suggestedLanguage = LanguageDetector.suggestLanguage(prompt, context);
    
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'language',
        message: 'Select programming language:',
        choices: [
          { name: `TypeScript (suggested: ${suggestedLanguage === 'typescript' ? '✓' : ''})`, value: 'typescript' },
          { name: `JavaScript (suggested: ${suggestedLanguage === 'javascript' ? '✓' : ''})`, value: 'javascript' },
          { name: `Python (suggested: ${suggestedLanguage === 'python' ? '✓' : ''})`, value: 'python' },
          { name: `Java (suggested: ${suggestedLanguage === 'java' ? '✓' : ''})`, value: 'java' },
          { name: `C# (suggested: ${suggestedLanguage === 'csharp' ? '✓' : ''})`, value: 'csharp' },
          { name: `C++ (suggested: ${suggestedLanguage === 'cpp' ? '✓' : ''})`, value: 'cpp' },
          { name: `Go (suggested: ${suggestedLanguage === 'go' ? '✓' : ''})`, value: 'go' },
          { name: `Rust (suggested: ${suggestedLanguage === 'rust' ? '✓' : ''})`, value: 'rust' },
          { name: `Swift (suggested: ${suggestedLanguage === 'swift' ? '✓' : ''})`, value: 'swift' },
          { name: `Other...`, value: 'other' },
        ],
        default: suggestedLanguage,
      },
      {
        type: 'input',
        name: 'customLanguage',
        message: 'Enter custom language:',
        when: (answers: any) => answers.language === 'other',
        validate: (input: string) => {
          if (!input.trim()) {
            return 'Please enter a language name';
          }
          return true;
        },
      },
    ]);

    return answers.language === 'other' ? answers.customLanguage : answers.language;
  }

  /**
   * Show welcome message
   */
  public static showWelcome(): void {
    console.log(chalk.blue.bold('\n🍎 Apple Code Assistant\n'));
    console.log(chalk.gray('Generate code using Apple Foundation Models'));
    console.log(chalk.gray('Type "help" for commands or "exit" to quit\n'));
  }

  /**
   * Show help message
   */
  public static showHelp(): void {
    console.log(chalk.blue.bold('\nAvailable Commands:\n'));
    console.log(chalk.white('  generate, g    Generate code from prompt'));
    console.log(chalk.white('  config, c      Manage configuration'));
    console.log(chalk.white('  models, m      List available models'));
    console.log(chalk.white('  languages, l   List supported languages'));
    console.log(chalk.white('  test, t        Test API connection'));
    console.log(chalk.white('  help, h        Show this help'));
    console.log(chalk.white('  exit, quit     Exit the application\n'));
  }

  /**
   * Show error message
   */
  public static showError(message: string): void {
    console.log(chalk.red(`\n✗ Error: ${message}\n`));
  }

  /**
   * Show success message
   */
  public static showSuccess(message: string): void {
    console.log(chalk.green(`\n✓ ${message}\n`));
  }

  /**
   * Show info message
   */
  public static showInfo(message: string): void {
    console.log(chalk.blue(`\nℹ ${message}\n`));
  }
}
