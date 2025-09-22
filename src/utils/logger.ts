/**
 * Logger utility for Apple Code Assistant
 */

import chalk from 'chalk';
import { Logger, LogLevel } from '../types';

export class AppLogger implements Logger {
  private logLevel: LogLevel;
  private isDebugMode: boolean;

  constructor(logLevel: LogLevel = 'info', debugMode: boolean = false) {
    this.logLevel = logLevel;
    this.isDebugMode = debugMode;
  }

  /**
   * Set log level
   */
  public setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  /**
   * Set debug mode
   */
  public setDebugMode(enabled: boolean): void {
    this.isDebugMode = enabled;
  }

  /**
   * Log debug message
   */
  public debug(message: string, ...args: any[]): void {
    if (this.shouldLog('debug')) {
      console.log(chalk.gray(`[DEBUG] ${message}`), ...args);
    }
  }

  /**
   * Log info message
   */
  public info(message: string, ...args: any[]): void {
    if (this.shouldLog('info')) {
      console.log(chalk.blue(`[INFO] ${message}`), ...args);
    }
  }

  /**
   * Log warning message
   */
  public warn(message: string, ...args: any[]): void {
    if (this.shouldLog('warn')) {
      console.warn(chalk.yellow(`[WARN] ${message}`), ...args);
    }
  }

  /**
   * Log error message
   */
  public error(message: string, ...args: any[]): void {
    if (this.shouldLog('error')) {
      console.error(chalk.red(`[ERROR] ${message}`), ...args);
    }
  }

  /**
   * Check if message should be logged based on log level
   */
  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    const currentLevelIndex = levels.indexOf(this.logLevel);
    const messageLevelIndex = levels.indexOf(level);
    
    return messageLevelIndex >= currentLevelIndex;
  }

  /**
   * Log success message
   */
  public success(message: string, ...args: any[]): void {
    console.log(chalk.green(`✓ ${message}`), ...args);
  }

  /**
   * Log failure message
   */
  public failure(message: string, ...args: any[]): void {
    console.error(chalk.red(`✗ ${message}`), ...args);
  }

  /**
   * Log progress message
   */
  public progress(message: string, ...args: any[]): void {
    console.log(chalk.cyan(`→ ${message}`), ...args);
  }

  /**
   * Log header message
   */
  public header(message: string): void {
    console.log(chalk.bold.blue(`\n${message}\n${'='.repeat(message.length)}\n`));
  }

  /**
   * Log section message
   */
  public section(message: string): void {
    console.log(chalk.bold.white(`\n${message}\n${'-'.repeat(message.length)}`));
  }

  /**
   * Log with timestamp
   */
  public timestamped(level: LogLevel, message: string, ...args: any[]): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}`;
    
    switch (level) {
      case 'debug':
        this.debug(logMessage, ...args);
        break;
      case 'info':
        this.info(logMessage, ...args);
        break;
      case 'warn':
        this.warn(logMessage, ...args);
        break;
      case 'error':
        this.error(logMessage, ...args);
        break;
    }
  }

  /**
   * Create a new logger instance
   */
  public static create(level: LogLevel = 'info', debugMode: boolean = false): AppLogger {
    return new AppLogger(level, debugMode);
  }
}
