/**
 * Conversation Manager for Apple Code Assistant
 * Handles chat history, context, and session management
 */

import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    language?: string;
    tokensUsed?: number;
    model?: string;
  };
}

export interface ConversationSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  context?: {
    projectPath?: string;
    language?: string;
    theme?: string;
  };
}

export class ConversationManager {
  private sessions: Map<string, ConversationSession> = new Map();
  private currentSessionId: string | null = null;
  private dataDir: string;

  constructor() {
    this.dataDir = path.join(os.homedir(), '.apple-code-assistant', 'conversations');
    this.ensureDataDirectory();
    this.loadSessions();
  }

  /**
   * Ensure data directory exists
   */
  private async ensureDataDirectory(): Promise<void> {
    await fs.ensureDir(this.dataDir);
  }

  /**
   * Load existing sessions from disk
   */
  private async loadSessions(): Promise<void> {
    try {
      const files = await fs.readdir(this.dataDir);
      const sessionFiles = files.filter(file => file.endsWith('.json'));

      for (const file of sessionFiles) {
        const filePath = path.join(this.dataDir, file);
        
        try {
          // Check if file is empty or corrupted
          const stats = await fs.stat(filePath);
          if (stats.size === 0) {
            console.warn(`Skipping empty session file: ${file}`);
            await fs.remove(filePath); // Remove empty file
            continue;
          }

          const sessionData = await fs.readJson(filePath);
          
          // Validate session data structure
          if (!sessionData || !sessionData.id || !sessionData.messages) {
            console.warn(`Skipping corrupted session file: ${file}`);
            await fs.remove(filePath); // Remove corrupted file
            continue;
          }
          
          // Convert timestamp strings back to Date objects
          sessionData.createdAt = new Date(sessionData.createdAt);
          sessionData.updatedAt = new Date(sessionData.updatedAt);
          sessionData.messages.forEach((msg: any) => {
            msg.timestamp = new Date(msg.timestamp);
          });

          this.sessions.set(sessionData.id, sessionData);
        } catch (fileError) {
          console.warn(`Failed to load session file ${file}:`, fileError);
          // Try to remove corrupted file
          try {
            await fs.remove(filePath);
            console.log(`Removed corrupted session file: ${file}`);
          } catch (removeError) {
            console.warn(`Failed to remove corrupted file ${file}:`, removeError);
          }
        }
      }
    } catch (error) {
      console.warn('Failed to load conversation sessions:', error);
    }
  }

  /**
   * Create a new conversation session
   */
  public createSession(title?: string, context?: any): ConversationSession {
    const id = this.generateSessionId();
    const session: ConversationSession = {
      id,
      title: title || `Session ${new Date().toLocaleDateString()}`,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      context,
    };

    this.sessions.set(id, session);
    this.currentSessionId = id;
    this.saveSession(session);

    return session;
  }

  /**
   * Get current session
   */
  public getCurrentSession(): ConversationSession | null {
    if (!this.currentSessionId) {
      return null;
    }
    return this.sessions.get(this.currentSessionId) || null;
  }

  /**
   * Set current session
   */
  public setCurrentSession(sessionId: string): boolean {
    if (this.sessions.has(sessionId)) {
      this.currentSessionId = sessionId;
      return true;
    }
    return false;
  }

  /**
   * Add message to current session
   */
  public addMessage(content: string, role: 'user' | 'assistant', metadata?: any): void {
    if (!this.currentSessionId) {
      this.createSession();
    }

    const session = this.sessions.get(this.currentSessionId!);
    if (!session) return;

    const message: ChatMessage = {
      id: this.generateMessageId(),
      role,
      content,
      timestamp: new Date(),
      metadata,
    };

    session.messages.push(message);
    session.updatedAt = new Date();

    // Update session title if it's the first user message
    if (role === 'user' && session.messages.filter(m => m.role === 'user').length === 1) {
      session.title = this.generateTitleFromMessage(content);
    }

    this.saveSession(session);
  }

  /**
   * Get all sessions
   */
  public getAllSessions(): ConversationSession[] {
    return Array.from(this.sessions.values()).sort((a, b) => 
      b.updatedAt.getTime() - a.updatedAt.getTime()
    );
  }

  /**
   * Get session by ID
   */
  public getSession(sessionId: string): ConversationSession | null {
    return this.sessions.get(sessionId) || null;
  }

  /**
   * Delete session
   */
  public async deleteSession(sessionId: string): Promise<boolean> {
    if (!this.sessions.has(sessionId)) {
      return false;
    }

    try {
      const filePath = path.join(this.dataDir, `${sessionId}.json`);
      await fs.remove(filePath);
      this.sessions.delete(sessionId);

      if (this.currentSessionId === sessionId) {
        this.currentSessionId = null;
      }

      return true;
    } catch (error) {
      console.error('Failed to delete session:', error);
      return false;
    }
  }

  /**
   * Export session to file
   */
  public async exportSession(sessionId: string, filePath: string): Promise<boolean> {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    try {
      await fs.writeJson(filePath, session, { spaces: 2 });
      return true;
    } catch (error) {
      console.error('Failed to export session:', error);
      return false;
    }
  }

  /**
   * Import session from file
   */
  public async importSession(filePath: string): Promise<boolean> {
    try {
      const sessionData = await fs.readJson(filePath);
      
      // Convert timestamp strings back to Date objects
      sessionData.createdAt = new Date(sessionData.createdAt);
      sessionData.updatedAt = new Date(sessionData.updatedAt);
      sessionData.messages.forEach((msg: any) => {
        msg.timestamp = new Date(msg.timestamp);
      });

      this.sessions.set(sessionData.id, sessionData);
      this.saveSession(sessionData);
      return true;
    } catch (error) {
      console.error('Failed to import session:', error);
      return false;
    }
  }

  /**
   * Clear all sessions
   */
  public async clearAllSessions(): Promise<void> {
    try {
      await fs.emptyDir(this.dataDir);
      this.sessions.clear();
      this.currentSessionId = null;
    } catch (error) {
      console.error('Failed to clear sessions:', error);
    }
  }

  /**
   * Save session to disk with atomic write to prevent corruption
   */
  private async saveSession(session: ConversationSession): Promise<void> {
    try {
      const filePath = path.join(this.dataDir, `${session.id}.json`);
      const tempPath = path.join(this.dataDir, `${session.id}.tmp`);
      
      // Write to temporary file first
      await fs.writeJson(tempPath, session, { spaces: 2 });
      
      // Atomically move temp file to final location
      await fs.move(tempPath, filePath, { overwrite: true });
    } catch (error) {
      console.error('Failed to save session:', error);
      // Clean up temp file if it exists
      try {
        const tempPath = path.join(this.dataDir, `${session.id}.tmp`);
        await fs.remove(tempPath);
      } catch (cleanupError) {
        // Ignore cleanup errors
      }
    }
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate unique message ID
   */
  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate title from first user message
   */
  private generateTitleFromMessage(content: string): string {
    const words = content.split(' ').slice(0, 6);
    return words.join(' ') + (content.split(' ').length > 6 ? '...' : '');
  }

  /**
   * Get conversation context for AI
   */
  public getConversationContext(maxMessages: number = 10): string {
    const session = this.getCurrentSession();
    if (!session || session.messages.length === 0) {
      return '';
    }

    const recentMessages = session.messages.slice(-maxMessages);
    const context = recentMessages.map(msg => {
      const role = msg.role === 'user' ? 'User' : 'Assistant';
      return `${role}: ${msg.content}`;
    }).join('\n\n');

    return `Previous conversation context:\n${context}\n\n`;
  }

  /**
   * Get session statistics
   */
  public getSessionStats(sessionId: string): any {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    const userMessages = session.messages.filter(m => m.role === 'user').length;
    const assistantMessages = session.messages.filter(m => m.role === 'assistant').length;
    const totalTokens = session.messages.reduce((sum, msg) => 
      sum + (msg.metadata?.tokensUsed || 0), 0
    );

    return {
      totalMessages: session.messages.length,
      userMessages,
      assistantMessages,
      totalTokens,
      duration: session.updatedAt.getTime() - session.createdAt.getTime(),
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
    };
  }
}
