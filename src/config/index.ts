/**
 * Configuration management for Apple Code Assistant
 */

import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';
import { Config } from '../types';

export class ConfigManager {
  private configPath: string;
  private config: Config;

  constructor() {
    this.configPath = path.join(os.homedir(), '.apple-code-assistant', 'config.json');
    this.config = this.loadDefaultConfig();
  }

  /**
   * Load configuration from file or environment variables
   */
  public async loadConfig(): Promise<Config> {
    try {
      // Load from environment variables first
      const envConfig = this.loadFromEnvironment();
      
      // Load from config file if it exists
      if (await fs.pathExists(this.configPath)) {
        const fileConfig = await fs.readJson(this.configPath);
        this.config = { ...this.config, ...fileConfig, ...envConfig };
      } else {
        this.config = { ...this.config, ...envConfig };
      }

      return this.config;
    } catch (error) {
      console.warn('Failed to load config, using defaults:', error);
      return this.config;
    }
  }

  /**
   * Save configuration to file
   */
  public async saveConfig(config: Partial<Config>): Promise<void> {
    try {
      this.config = { ...this.config, ...config };
      await fs.ensureDir(path.dirname(this.configPath));
      await fs.writeJson(this.configPath, this.config, { spaces: 2 });
    } catch (error) {
      throw new Error(`Failed to save config: ${error}`);
    }
  }

  /**
   * Get current configuration
   */
  public getConfig(): Config {
    return { ...this.config };
  }

  /**
   * Load configuration from environment variables
   */
  private loadFromEnvironment(): Partial<Config> {
    return {
      model: process.env.APPLE_FOUNDATION_MODEL,
      defaultLanguage: process.env.APPLE_CODE_DEFAULT_LANGUAGE,
      outputFormat: process.env.APPLE_CODE_OUTPUT_FORMAT as 'terminal' | 'file' | 'clipboard',
      theme: process.env.APPLE_CODE_THEME as 'light' | 'dark',
      maxTokens: process.env.APPLE_CODE_MAX_TOKENS ? parseInt(process.env.APPLE_CODE_MAX_TOKENS) : undefined,
      temperature: process.env.APPLE_CODE_TEMPERATURE ? parseFloat(process.env.APPLE_CODE_TEMPERATURE) : undefined,
    };
  }

  /**
   * Load default configuration
   */
  private loadDefaultConfig(): Config {
    return {
      model: 'apple-foundation-model',
      defaultLanguage: 'typescript',
      outputFormat: 'terminal',
      theme: 'dark',
      maxTokens: 4000,
      temperature: 0.7,
    };
  }

  /**
   * Validate configuration
   */
  public validateConfig(config: Config): string[] {
    const errors: string[] = [];

    if (config.maxTokens && (config.maxTokens < 1 || config.maxTokens > 8000)) {
      errors.push('maxTokens must be between 1 and 8000');
    }

    if (config.temperature && (config.temperature < 0 || config.temperature > 2)) {
      errors.push('temperature must be between 0 and 2');
    }

    if (config.outputFormat && !['terminal', 'file', 'clipboard'].includes(config.outputFormat)) {
      errors.push('outputFormat must be one of: terminal, file, clipboard');
    }

    return errors;
  }

  /**
   * Get config file path
   */
  public getConfigPath(): string {
    return this.configPath;
  }
}
