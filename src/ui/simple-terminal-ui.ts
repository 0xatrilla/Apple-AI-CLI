/**
 * Simple Terminal UI for Apple Code Assistant
 * A modern CLI interface inspired by Gemini CLI
 */

import chalk from 'chalk';
import figlet from 'figlet';
// @ts-ignore - gradient-string doesn't have types
import gradient from 'gradient-string';
import { AppleFoundationClient } from '../api/foundation-client';
import { CodeGenerationOptions, CodeResult } from '../types';
import { SyntaxHighlighter } from '../utils/syntax-highlighter';
import { LanguageDetector } from '../utils/language-detector';
import { ConversationManager } from './conversation-manager';
import { StreamingHandler } from './streaming-handler';
import * as readline from 'readline';

export class SimpleTerminalUI {
  private client: AppleFoundationClient;
  private conversationManager: ConversationManager;
  private streamingHandler: StreamingHandler;
  private rl: readline.Interface;
  private isGenerating: boolean = false;

  constructor(client: AppleFoundationClient) {
    this.client = client;
    this.conversationManager = new ConversationManager();
    this.streamingHandler = new StreamingHandler(client);
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  /**
   * Start the UI
   */
  public async start(): Promise<void> {
    this.showWelcome();
    this.conversationManager.createSession('Apple Code Assistant Session');
    
    // Start the main loop
    await this.mainLoop();
  }

  /**
   * Create sophisticated header similar to Gemini CLI
   */
  private createHeader(): void {
    // Main title with gradient
    const title = figlet.textSync('Apple Code', { 
      font: 'ANSI Shadow',
      horizontalLayout: 'fitted',
      verticalLayout: 'fitted'
    });
    
    // Create gradient effect
    const gradientTitle = gradient.rainbow(title);
    console.log(gradientTitle);
    
    // Subtitle with Apple branding
    const subtitle = 'ASSISTANT';
    const gradientSubtitle = gradient.rainbow(subtitle);
    console.log(chalk.bold(gradientSubtitle));
    console.log();
    
    // Tagline with professional styling
    const tagline = 'Powered by Apple Intelligence';
    const taglineGradient = gradient.rainbow(tagline);
    console.log(chalk.bold(taglineGradient));
    
    // Version and status info
    console.log(chalk.gray('┌─────────────────────────────────────────────────────────────┐'));
    console.log(chalk.gray('│') + chalk.blue.bold('  🍎 On-Device AI  ') + chalk.gray('│') + chalk.green.bold('  ✅ Ready  ') + chalk.gray('│') + chalk.yellow.bold('  v1.0.0  ') + chalk.gray('│'));
    console.log(chalk.gray('└─────────────────────────────────────────────────────────────┘'));
    console.log();
  }

  /**
   * Show welcome message
   */
  private showWelcome(): void {
    console.clear();
    
    // Create a sophisticated header similar to Gemini CLI
    this.createHeader();
    console.log();
    
    console.log(chalk.yellow('✨ Features:'));
    console.log(chalk.white('  • On-device code generation (no API keys!)'));
    console.log(chalk.white('  • Multi-language support (25+ languages)'));
    console.log(chalk.white('  • Real-time streaming responses'));
    console.log(chalk.white('  • Conversation history & context'));
    console.log(chalk.white('  • File operations & clipboard integration'));
    console.log();
    
    console.log(chalk.green('🚀 Quick Start:'));
    console.log(chalk.white('  • Type your code request and press Enter'));
    console.log(chalk.white('  • Use /help for commands'));
    console.log(chalk.white('  • Use /exit to quit'));
    console.log();
    
    console.log(chalk.cyan('💡 Examples:'));
    console.log(chalk.gray('  "Create a React component for a todo list"'));
    console.log(chalk.gray('  "Write a Python function to sort an array"'));
    console.log(chalk.gray('  "Generate a TypeScript interface for a user"'));
    console.log();
    
    console.log(chalk.magenta('Ready to generate code! 🎯'));
    console.log(chalk.gray('─'.repeat(60)));
    console.log();
  }

  /**
   * Main interaction loop
   */
  private async mainLoop(): Promise<void> {
    while (true) {
      try {
        const input = await this.promptUser();
        
        if (!input.trim()) continue;
        
        // Handle commands
        if (input.startsWith('/')) {
          await this.handleCommand(input);
          continue;
        }
        
        // Handle code generation
        await this.handleCodeGeneration(input);
        
      } catch (error) {
        console.log(chalk.red(`❌ Error: ${error}`));
      }
    }
  }

  /**
   * Prompt user for input
   */
  private promptUser(): Promise<string> {
    return new Promise((resolve) => {
      const prompt = this.isGenerating 
        ? chalk.yellow('🔄 Generating...') 
        : chalk.blue('💬 You:');
      
      this.rl.question(`${prompt} `, resolve);
    });
  }

  /**
   * Handle commands
   */
  private async handleCommand(input: string): Promise<void> {
    const [command, ...args] = input.slice(1).split(' ');
    
    switch (command.toLowerCase()) {
      case 'help':
        this.showHelp();
        break;
      case 'exit':
      case 'quit':
        this.showGoodbye();
        process.exit(0);
        break;
      case 'clear':
        console.clear();
        this.showWelcome();
        break;
      case 'history':
        this.showHistory();
        break;
      case 'sessions':
        this.showSessions();
        break;
      case 'models':
        await this.showModels();
        break;
      case 'languages':
        this.showLanguages();
        break;
      case 'test':
        await this.testConnection();
        break;
      default:
        console.log(chalk.red(`❌ Unknown command: ${command}`));
        console.log(chalk.gray('Use /help to see available commands'));
    }
  }

  /**
   * Handle code generation
   */
  private async handleCodeGeneration(input: string): Promise<void> {
    if (this.isGenerating) {
      console.log(chalk.yellow('⏳ Please wait for current generation to complete...'));
      return;
    }

    this.isGenerating = true;
    
    try {
      // Add user message to conversation
      this.conversationManager.addMessage(input, 'user');
      
      // Show assistant response header
      console.log(chalk.blue('🤖 Assistant:'));
      
      // Detect language
      const language = LanguageDetector.suggestLanguage(input);
      
      // Generate code with streaming
      const options: CodeGenerationOptions = {
        prompt: input,
        language: language,
        maxTokens: 4000,
        temperature: 0.7,
      };

      let fullCode = '';
      
      await this.streamingHandler.generateWithStreaming({
        ...options,
        onChunk: (chunk: string) => {
          fullCode += chunk;
          process.stdout.write(chunk);
        },
        onComplete: (result: CodeResult) => {
          console.log();
          console.log();
          
          // Show code with syntax highlighting
          this.showCodeResult(result);
          
          // Add assistant response to conversation
          this.conversationManager.addMessage(
            `Generated ${result.language} code:\n${result.code}`,
            'assistant',
            { language: result.language, tokensUsed: result.metadata?.tokensUsed }
          );
        },
        onError: (error: Error) => {
          console.log();
          console.log(chalk.red(`❌ Generation failed: ${error.message}`));
        },
      });
      
    } finally {
      this.isGenerating = false;
    }
  }

  /**
   * Show code result with syntax highlighting
   */
  private showCodeResult(result: CodeResult): void {
    console.log(chalk.magenta('📝 Generated Code:'));
    console.log(chalk.gray('─'.repeat(50)));
    
    const highlighted = SyntaxHighlighter.highlight(result.code, result.language, 'dark');
    console.log(highlighted);
    
    console.log(chalk.gray('─'.repeat(50)));
    console.log(chalk.gray(`Language: ${result.language} | Tokens: ${result.metadata?.tokensUsed || 'N/A'} | Model: ${result.metadata?.model || 'Apple Intelligence'}`));
    console.log();
  }

  /**
   * Show help
   */
  private showHelp(): void {
    console.log(chalk.blue.bold('📚 Apple Code Assistant Commands'));
    console.log(chalk.gray('─'.repeat(50)));
    console.log();
    
    const commands = [
      { cmd: '/help', desc: 'Show this help message' },
      { cmd: '/exit', desc: 'Exit the application' },
      { cmd: '/clear', desc: 'Clear the screen' },
      { cmd: '/history', desc: 'Show conversation history' },
      { cmd: '/sessions', desc: 'Show all sessions' },
      { cmd: '/models', desc: 'Show available models' },
      { cmd: '/languages', desc: 'Show supported languages' },
      { cmd: '/test', desc: 'Test Apple Intelligence connection' }
    ];
    
    commands.forEach(({ cmd, desc }) => {
      console.log(chalk.cyan.bold(cmd.padEnd(12)) + chalk.white(desc));
    });
    
    console.log();
    console.log(chalk.gray('💡 Just type your code request to get started!'));
    console.log(chalk.gray('   Example: "Create a React component for a todo list"'));
    console.log();
  }

  /**
   * Show goodbye message
   */
  private showGoodbye(): void {
    console.log();
    console.log(chalk.gray('┌─────────────────────────────────────────────────────────────┐'));
    console.log(chalk.gray('│') + chalk.green.bold('  👋 Thanks for using Apple Code Assistant!  ') + chalk.gray('│'));
    console.log(chalk.gray('│') + chalk.blue('  Powered by Apple Intelligence • On-Device AI  ') + chalk.gray('│'));
    console.log(chalk.gray('└─────────────────────────────────────────────────────────────┘'));
    console.log();
  }

  /**
   * Show conversation history
   */
  private showHistory(): void {
    const session = this.conversationManager.getCurrentSession();
    if (!session || session.messages.length === 0) {
      console.log(chalk.yellow('📝 No conversation history yet'));
      return;
    }

    console.log(chalk.blue.bold('📚 Conversation History:'));
    console.log();
    
    session.messages.forEach((msg, index) => {
      const role = msg.role === 'user' ? '👤 You' : '🤖 Assistant';
      const color = msg.role === 'user' ? chalk.green : chalk.blue;
      const time = msg.timestamp.toLocaleTimeString();
      
      console.log(color(`${role} (${time}):`));
      console.log(chalk.white(msg.content));
      console.log();
    });
  }

  /**
   * Show sessions
   */
  private showSessions(): void {
    const sessions = this.conversationManager.getAllSessions();
    
    console.log(chalk.blue.bold('📁 Conversation Sessions:'));
    console.log();
    
    sessions.forEach((session, index) => {
      const isCurrent = session.id === this.conversationManager.getCurrentSession()?.id;
      const marker = isCurrent ? '👉' : '  ';
      const color = isCurrent ? chalk.green : chalk.white;
      
      console.log(color(`${marker} ${session.title}`));
      console.log(chalk.gray(`    Messages: ${session.messages.length} | Created: ${session.createdAt.toLocaleDateString()}`));
    });
    
    console.log();
  }

  /**
   * Show available models
   */
  private async showModels(): Promise<void> {
    console.log(chalk.blue.bold('🤖 Available Apple Intelligence Models:'));
    console.log();
    
    try {
      const models = await this.client.getAvailableModels();
      models.forEach(model => {
        console.log(chalk.white(`  • ${model}`));
      });
    } catch (error) {
      console.log(chalk.red(`❌ Failed to fetch models: ${error}`));
    }
    
    console.log();
  }

  /**
   * Show supported languages
   */
  private showLanguages(): void {
    const languages = LanguageDetector.getSupportedLanguages();
    
    console.log(chalk.blue.bold('🌐 Supported Programming Languages:'));
    console.log();
    
    languages.forEach(lang => {
      console.log(chalk.white(`  • ${lang.name} (${lang.extensions.join(', ')})`));
    });
    
    console.log();
  }

  /**
   * Test connection
   */
  private async testConnection(): Promise<void> {
    console.log(chalk.blue('🔍 Testing Apple Intelligence connection...'));
    
    try {
      const isConnected = await this.client.testConnection();
      if (isConnected) {
        console.log(chalk.green('✅ Apple Intelligence is available and working!'));
      } else {
        console.log(chalk.red('❌ Apple Intelligence is not available on this system'));
        console.log(chalk.gray('Requires macOS 15+ with Apple Intelligence support'));
      }
    } catch (error) {
      console.log(chalk.red(`❌ Connection test failed: ${error}`));
    }
    
    console.log();
  }

  /**
   * Cleanup resources
   */
  public cleanup(): void {
    this.rl.close();
  }
}
