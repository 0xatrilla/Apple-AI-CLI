/**
 * File operations utilities
 */

import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';
import chalk from 'chalk';
import { FileOperation } from '../types';

export class FileOperations {
  /**
   * Save code to file
   */
  public static async saveToFile(filePath: string, content: string, backup: boolean = false): Promise<void> {
    try {
      const fullPath = path.resolve(filePath);
      const dir = path.dirname(fullPath);
      
      // Create directory if it doesn't exist
      await fs.ensureDir(dir);
      
      // Create backup if file exists and backup is requested
      if (backup && await fs.pathExists(fullPath)) {
        const backupPath = `${fullPath}.backup.${Date.now()}`;
        await fs.copy(fullPath, backupPath);
        console.log(chalk.yellow(`Backup created: ${backupPath}`));
      }
      
      // Write the file
      await fs.writeFile(fullPath, content, 'utf8');
      console.log(chalk.green(`File saved: ${fullPath}`));
    } catch (error) {
      throw new Error(`Failed to save file: ${error}`);
    }
  }

  /**
   * Read file content
   */
  public static async readFile(filePath: string): Promise<string> {
    try {
      const fullPath = path.resolve(filePath);
      return await fs.readFile(fullPath, 'utf8');
    } catch (error) {
      throw new Error(`Failed to read file: ${error}`);
    }
  }

  /**
   * Check if file exists
   */
  public static async fileExists(filePath: string): Promise<boolean> {
    try {
      const fullPath = path.resolve(filePath);
      return await fs.pathExists(fullPath);
    } catch (error) {
      return false;
    }
  }

  /**
   * Get file extension
   */
  public static getFileExtension(filePath: string): string {
    return path.extname(filePath);
  }

  /**
   * Get file name without extension
   */
  public static getFileName(filePath: string): string {
    return path.basename(filePath, path.extname(filePath));
  }

  /**
   * Get directory path
   */
  public static getDirectory(filePath: string): string {
    return path.dirname(path.resolve(filePath));
  }

  /**
   * Create temporary file
   */
  public static async createTempFile(content: string, extension: string = '.tmp'): Promise<string> {
    try {
      const tempDir = os.tmpdir();
      const tempFile = path.join(tempDir, `apple-code-${Date.now()}${extension}`);
      await fs.writeFile(tempFile, content, 'utf8');
      return tempFile;
    } catch (error) {
      throw new Error(`Failed to create temporary file: ${error}`);
    }
  }

  /**
   * Delete temporary file
   */
  public static async deleteTempFile(filePath: string): Promise<void> {
    try {
      if (await fs.pathExists(filePath)) {
        await fs.remove(filePath);
      }
    } catch (error) {
      console.warn(`Failed to delete temporary file: ${error}`);
    }
  }

  /**
   * Get file size in bytes
   */
  public static async getFileSize(filePath: string): Promise<number> {
    try {
      const stats = await fs.stat(filePath);
      return stats.size;
    } catch (error) {
      throw new Error(`Failed to get file size: ${error}`);
    }
  }

  /**
   * Get file modification time
   */
  public static async getFileModTime(filePath: string): Promise<Date> {
    try {
      const stats = await fs.stat(filePath);
      return stats.mtime;
    } catch (error) {
      throw new Error(`Failed to get file modification time: ${error}`);
    }
  }

  /**
   * List files in directory
   */
  public static async listFiles(dirPath: string, pattern?: RegExp): Promise<string[]> {
    try {
      const fullPath = path.resolve(dirPath);
      const files = await fs.readdir(fullPath);
      
      if (pattern) {
        return files.filter(file => pattern.test(file));
      }
      
      return files;
    } catch (error) {
      throw new Error(`Failed to list files: ${error}`);
    }
  }

  /**
   * Copy file
   */
  public static async copyFile(source: string, destination: string): Promise<void> {
    try {
      await fs.copy(source, destination);
      console.log(chalk.green(`File copied: ${source} -> ${destination}`));
    } catch (error) {
      throw new Error(`Failed to copy file: ${error}`);
    }
  }

  /**
   * Move file
   */
  public static async moveFile(source: string, destination: string): Promise<void> {
    try {
      await fs.move(source, destination);
      console.log(chalk.green(`File moved: ${source} -> ${destination}`));
    } catch (error) {
      throw new Error(`Failed to move file: ${error}`);
    }
  }

  /**
   * Delete file
   */
  public static async deleteFile(filePath: string): Promise<void> {
    try {
      await fs.remove(filePath);
      console.log(chalk.green(`File deleted: ${filePath}`));
    } catch (error) {
      throw new Error(`Failed to delete file: ${error}`);
    }
  }

  /**
   * Create directory
   */
  public static async createDirectory(dirPath: string): Promise<void> {
    try {
      await fs.ensureDir(dirPath);
      console.log(chalk.green(`Directory created: ${dirPath}`));
    } catch (error) {
      throw new Error(`Failed to create directory: ${error}`);
    }
  }

  /**
   * Get relative path
   */
  public static getRelativePath(from: string, to: string): string {
    return path.relative(from, to);
  }

  /**
   * Resolve path
   */
  public static resolvePath(filePath: string): string {
    return path.resolve(filePath);
  }

  /**
   * Check if path is absolute
   */
  public static isAbsolutePath(filePath: string): boolean {
    return path.isAbsolute(filePath);
  }

  /**
   * Join paths
   */
  public static joinPaths(...paths: string[]): string {
    return path.join(...paths);
  }

  /**
   * Normalize path
   */
  public static normalizePath(filePath: string): string {
    return path.normalize(filePath);
  }

  /**
   * Get home directory
   */
  public static getHomeDirectory(): string {
    return os.homedir();
  }

  /**
   * Get current working directory
   */
  public static getCurrentDirectory(): string {
    return process.cwd();
  }

  /**
   * Change working directory
   */
  public static changeDirectory(dirPath: string): void {
    try {
      process.chdir(dirPath);
    } catch (error) {
      throw new Error(`Failed to change directory: ${error}`);
    }
  }
}
