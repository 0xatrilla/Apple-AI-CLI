/**
 * Type definitions for Apple Code Assistant
 */

export interface Config {
  model?: string;
  defaultLanguage?: string;
  outputFormat?: 'terminal' | 'file' | 'clipboard';
  theme?: 'light' | 'dark';
  maxTokens?: number;
  temperature?: number;
}


export interface CodeGenerationOptions {
  prompt: string;
  language?: string;
  context?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface CodeResult {
  code: string;
  language: string;
  metadata?: {
    tokensUsed: number;
    model: string;
    timestamp: Date;
  };
}

export interface CLIArgs {
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
  debug?: boolean;
  verbose?: boolean;
}

export interface SupportedLanguage {
  name: string;
  extensions: string[];
  highlightAlias: string;
}

export interface FileOperation {
  type: 'create' | 'edit' | 'save';
  path: string;
  content?: string;
  backup?: boolean;
}

export interface ErrorInfo {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface Logger {
  debug(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
}
