/**
 * Clipboard utilities for macOS
 */

import clipboardy from 'clipboardy';
import chalk from 'chalk';

export class ClipboardManager {
  /**
   * Copy text to clipboard
   */
  public static async copyToClipboard(text: string): Promise<void> {
    try {
      await clipboardy.write(text);
      console.log(chalk.green('✓ Code copied to clipboard'));
    } catch (error) {
      throw new Error(`Failed to copy to clipboard: ${error}`);
    }
  }

  /**
   * Read text from clipboard
   */
  public static async readFromClipboard(): Promise<string> {
    try {
      return await clipboardy.read();
    } catch (error) {
      throw new Error(`Failed to read from clipboard: ${error}`);
    }
  }

  /**
   * Check if clipboard is available
   */
  public static async isAvailable(): Promise<boolean> {
    try {
      await clipboardy.read();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get clipboard content length
   */
  public static async getContentLength(): Promise<number> {
    try {
      const content = await clipboardy.read();
      return content.length;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Clear clipboard
   */
  public static async clearClipboard(): Promise<void> {
    try {
      await clipboardy.write('');
      console.log(chalk.yellow('Clipboard cleared'));
    } catch (error) {
      throw new Error(`Failed to clear clipboard: ${error}`);
    }
  }

  /**
   * Copy with confirmation
   */
  public static async copyWithConfirmation(text: string, message?: string): Promise<void> {
    try {
      await this.copyToClipboard(text);
      if (message) {
        console.log(chalk.green(`✓ ${message}`));
      }
    } catch (error) {
      console.error(chalk.red(`✗ Failed to copy: ${error}`));
      throw error;
    }
  }
}
