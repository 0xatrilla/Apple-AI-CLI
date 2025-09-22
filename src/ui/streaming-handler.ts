/**
 * Streaming Response Handler for Apple Code Assistant
 * Provides real-time streaming of code generation responses
 */

import { EventEmitter } from 'events';
import { AppleFoundationClient } from '../api/foundation-client';
import { CodeGenerationOptions, CodeResult } from '../types';

export interface StreamingOptions extends CodeGenerationOptions {
  onChunk?: (chunk: string) => void;
  onComplete?: (result: CodeResult) => void;
  onError?: (error: Error) => void;
}

export class StreamingHandler extends EventEmitter {
  private client: AppleFoundationClient;
  private isStreaming: boolean = false;
  private currentStream: any = null;

  constructor(client: AppleFoundationClient) {
    super();
    this.client = client;
  }

  /**
   * Start streaming code generation
   */
  public async startStreaming(options: StreamingOptions): Promise<void> {
    if (this.isStreaming) {
      throw new Error('Already streaming. Please wait for current stream to complete.');
    }

    this.isStreaming = true;
    this.emit('start');

    try {
      // For now, we'll simulate streaming since Apple Intelligence APIs
      // don't yet support streaming in command-line tools
      await this.simulateStreaming(options);
    } catch (error) {
      this.emit('error', error);
      options.onError?.(error as Error);
    } finally {
      this.isStreaming = false;
      this.emit('end');
    }
  }

  /**
   * Simulate streaming response (until Apple Intelligence supports real streaming)
   */
  private async simulateStreaming(options: StreamingOptions): Promise<void> {
    const { onChunk, onComplete, onError } = options;

    try {
      // Generate the full response
      const result = await this.client.generateCode(options);
      
      // Simulate streaming by breaking the code into chunks
      const code = result.code;
      const chunks = this.chunkCode(code);
      
      let fullResponse = '';
      
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        fullResponse += chunk;
        
        // Emit chunk with a small delay to simulate streaming
        await this.delay(50 + Math.random() * 100);
        
        this.emit('chunk', chunk);
        onChunk?.(chunk);
      }

      // Create final result with the complete code
      const finalResult: CodeResult = {
        ...result,
        code: fullResponse,
      };

      this.emit('complete', finalResult);
      onComplete?.(finalResult);

    } catch (error) {
      this.emit('error', error);
      onError?.(error as Error);
    }
  }

  /**
   * Break code into chunks for streaming simulation
   */
  private chunkCode(code: string): string[] {
    const lines = code.split('\n');
    const chunks: string[] = [];
    
    // Group lines into chunks of 2-5 lines
    for (let i = 0; i < lines.length; i += Math.floor(Math.random() * 4) + 2) {
      const chunkLines = lines.slice(i, i + Math.floor(Math.random() * 4) + 2);
      chunks.push(chunkLines.join('\n') + '\n');
    }
    
    return chunks;
  }

  /**
   * Stop current streaming
   */
  public stopStreaming(): void {
    if (this.isStreaming) {
      this.isStreaming = false;
      this.emit('stop');
    }
  }

  /**
   * Check if currently streaming
   */
  public getIsStreaming(): boolean {
    return this.isStreaming;
  }

  /**
   * Utility delay function
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Generate code with streaming (public API)
   */
  public async generateWithStreaming(options: StreamingOptions): Promise<CodeResult> {
    return new Promise((resolve, reject) => {
      let fullCode = '';
      
      const streamOptions: StreamingOptions = {
        ...options,
        onChunk: (chunk: string) => {
          fullCode += chunk;
          options.onChunk?.(chunk);
        },
        onComplete: (result: CodeResult) => {
          resolve(result);
          options.onComplete?.(result);
        },
        onError: (error: Error) => {
          reject(error);
          options.onError?.(error);
        },
      };

      this.startStreaming(streamOptions);
    });
  }
}
