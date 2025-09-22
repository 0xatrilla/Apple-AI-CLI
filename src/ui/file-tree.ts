/**
 * File Tree Navigator for Apple Code Assistant
 * Provides file system navigation and preview
 */

import * as fs from 'fs-extra';
import * as path from 'path';
import { EventEmitter } from 'events';

export interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  size?: number;
  modified?: Date;
  children?: FileNode[];
  expanded?: boolean;
}

export interface FileTreeOptions {
  rootPath?: string;
  showHidden?: boolean;
  maxDepth?: number;
  excludePatterns?: string[];
}

export class FileTree extends EventEmitter {
  private rootPath: string;
  private showHidden: boolean;
  private maxDepth: number;
  private excludePatterns: string[];
  private tree: FileNode | null = null;

  constructor(options: FileTreeOptions = {}) {
    super();
    this.rootPath = options.rootPath || process.cwd();
    this.showHidden = options.showHidden || false;
    this.maxDepth = options.maxDepth || 5;
    this.excludePatterns = options.excludePatterns || [
      'node_modules',
      '.git',
      '.DS_Store',
      'dist',
      'build',
      '.next',
      '.nuxt',
      'coverage',
      '.nyc_output',
    ];
  }

  /**
   * Load file tree from root path
   */
  public async loadTree(): Promise<FileNode> {
    this.tree = await this.buildTree(this.rootPath, 0);
    this.emit('loaded', this.tree);
    return this.tree;
  }

  /**
   * Build file tree recursively
   */
  private async buildTree(dirPath: string, depth: number): Promise<FileNode> {
    if (depth >= this.maxDepth) {
      return {
        name: path.basename(dirPath),
        path: dirPath,
        type: 'directory',
        children: [],
      };
    }

    try {
      const stats = await fs.stat(dirPath);
      const name = path.basename(dirPath);
      
      if (stats.isDirectory()) {
        const children: FileNode[] = [];
        
        try {
          const entries = await fs.readdir(dirPath);
          
          for (const entry of entries) {
            // Skip hidden files if not showing them
            if (!this.showHidden && entry.startsWith('.')) {
              continue;
            }
            
            // Skip excluded patterns
            if (this.excludePatterns.some(pattern => entry.includes(pattern))) {
              continue;
            }
            
            const entryPath = path.join(dirPath, entry);
            const childNode = await this.buildTree(entryPath, depth + 1);
            children.push(childNode);
          }
          
          // Sort: directories first, then files, both alphabetically
          children.sort((a, b) => {
            if (a.type !== b.type) {
              return a.type === 'directory' ? -1 : 1;
            }
            return a.name.localeCompare(b.name);
          });
          
        } catch (error) {
          // Directory might not be readable
          console.warn(`Cannot read directory: ${dirPath}`);
        }
        
        return {
          name,
          path: dirPath,
          type: 'directory',
          size: stats.size,
          modified: stats.mtime,
          children,
          expanded: false,
        };
      } else {
        return {
          name,
          path: dirPath,
          type: 'file',
          size: stats.size,
          modified: stats.mtime,
        };
      }
    } catch (error) {
      // File might not be accessible
      return {
        name: path.basename(dirPath),
        path: dirPath,
        type: 'file',
      };
    }
  }

  /**
   * Get tree as flat list for display
   */
  public getFlatTree(): FileNode[] {
    if (!this.tree) return [];
    
    const flat: FileNode[] = [];
    this.flattenTree(this.tree, flat, 0);
    return flat;
  }

  /**
   * Flatten tree recursively
   */
  private flattenTree(node: FileNode, flat: FileNode[], depth: number): void {
    // Add current node with depth info
    const flatNode = { ...node, depth };
    flat.push(flatNode);
    
    // Add children if expanded
    if (node.type === 'directory' && node.expanded && node.children) {
      for (const child of node.children) {
        this.flattenTree(child, flat, depth + 1);
      }
    }
  }

  /**
   * Toggle node expansion
   */
  public toggleNode(nodePath: string): boolean {
    const node = this.findNode(nodePath);
    if (node && node.type === 'directory') {
      node.expanded = !node.expanded;
      this.emit('toggled', node);
      return true;
    }
    return false;
  }

  /**
   * Find node by path
   */
  private findNode(nodePath: string): FileNode | null {
    if (!this.tree) return null;
    return this.findNodeRecursive(this.tree, nodePath);
  }

  /**
   * Find node recursively
   */
  private findNodeRecursive(node: FileNode, targetPath: string): FileNode | null {
    if (node.path === targetPath) {
      return node;
    }
    
    if (node.children) {
      for (const child of node.children) {
        const found = this.findNodeRecursive(child, targetPath);
        if (found) return found;
      }
    }
    
    return null;
  }

  /**
   * Expand all nodes
   */
  public expandAll(): void {
    if (!this.tree) return;
    this.expandAllRecursive(this.tree);
    this.emit('expandedAll');
  }

  /**
   * Expand all nodes recursively
   */
  private expandAllRecursive(node: FileNode): void {
    if (node.type === 'directory') {
      node.expanded = true;
      if (node.children) {
        for (const child of node.children) {
          this.expandAllRecursive(child);
        }
      }
    }
  }

  /**
   * Collapse all nodes
   */
  public collapseAll(): void {
    if (!this.tree) return;
    this.collapseAllRecursive(this.tree);
    this.emit('collapsedAll');
  }

  /**
   * Collapse all nodes recursively
   */
  private collapseAllRecursive(node: FileNode): void {
    if (node.type === 'directory') {
      node.expanded = false;
      if (node.children) {
        for (const child of node.children) {
          this.collapseAllRecursive(child);
        }
      }
    }
  }

  /**
   * Get file content for preview
   */
  public async getFileContent(filePath: string): Promise<string> {
    try {
      const stats = await fs.stat(filePath);
      if (!stats.isFile()) {
        throw new Error('Path is not a file');
      }
      
      // Limit file size for preview (1MB)
      if (stats.size > 1024 * 1024) {
        return `File too large (${Math.round(stats.size / 1024)}KB). Preview not available.`;
      }
      
      const content = await fs.readFile(filePath, 'utf-8');
      return content;
    } catch (error) {
      return `Error reading file: ${error}`;
    }
  }

  /**
   * Get file info
   */
  public async getFileInfo(filePath: string): Promise<any> {
    try {
      const stats = await fs.stat(filePath);
      return {
        name: path.basename(filePath),
        path: filePath,
        type: stats.isDirectory() ? 'directory' : 'file',
        size: stats.size,
        modified: stats.mtime,
        created: stats.birthtime,
        permissions: stats.mode.toString(8),
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Refresh tree
   */
  public async refresh(): Promise<FileNode> {
    return await this.loadTree();
  }

  /**
   * Set new root path
   */
  public async setRootPath(newRootPath: string): Promise<void> {
    this.rootPath = newRootPath;
    await this.loadTree();
  }

  /**
   * Get current root path
   */
  public getRootPath(): string {
    return this.rootPath;
  }

  /**
   * Search files by name
   */
  public searchFiles(query: string): FileNode[] {
    if (!this.tree) return [];
    
    const results: FileNode[] = [];
    this.searchRecursive(this.tree, query.toLowerCase(), results);
    return results;
  }

  /**
   * Search recursively
   */
  private searchRecursive(node: FileNode, query: string, results: FileNode[]): void {
    if (node.name.toLowerCase().includes(query)) {
      results.push(node);
    }
    
    if (node.children) {
      for (const child of node.children) {
        this.searchRecursive(child, query, results);
      }
    }
  }
}
