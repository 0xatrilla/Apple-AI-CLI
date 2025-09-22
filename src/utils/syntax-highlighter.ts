/**
 * Syntax highlighting utilities using highlight.js
 */

import hljs from 'highlight.js';
import chalk from 'chalk';
import { SupportedLanguage } from '../types';

export class SyntaxHighlighter {
  private static readonly THEME_COLORS = {
    light: {
      keyword: chalk.blue,
      string: chalk.green,
      comment: chalk.gray,
      number: chalk.red,
      function: chalk.magenta,
      variable: chalk.cyan,
      default: chalk.black,
    },
    dark: {
      keyword: chalk.blueBright,
      string: chalk.greenBright,
      comment: chalk.gray,
      number: chalk.redBright,
      function: chalk.magentaBright,
      variable: chalk.cyanBright,
      default: chalk.white,
    },
  };

  /**
   * Highlight code with syntax highlighting
   */
  public static highlight(code: string, language: string, theme: 'light' | 'dark' = 'dark'): string {
    try {
      // Get language info for proper highlighting
      const langInfo = this.getLanguageInfo(language);
      const highlightLang = langInfo?.highlightAlias || language;
      
      // Use highlight.js for syntax highlighting
      const highlighted = hljs.highlight(code, { language: highlightLang });
      
      // Convert HTML to terminal colors
      return this.htmlToTerminalColors(highlighted.value, theme);
    } catch (error) {
      // Fallback to basic highlighting if highlight.js fails
      return this.basicHighlight(code, language, theme);
    }
  }

  /**
   * Get language information for highlighting
   */
  private static getLanguageInfo(language: string): SupportedLanguage | null {
    const supportedLanguages: SupportedLanguage[] = [
      { name: 'typescript', extensions: ['.ts', '.tsx'], highlightAlias: 'typescript' },
      { name: 'javascript', extensions: ['.js', '.jsx'], highlightAlias: 'javascript' },
      { name: 'python', extensions: ['.py'], highlightAlias: 'python' },
      { name: 'java', extensions: ['.java'], highlightAlias: 'java' },
      { name: 'csharp', extensions: ['.cs'], highlightAlias: 'csharp' },
      { name: 'cpp', extensions: ['.cpp'], highlightAlias: 'cpp' },
      { name: 'c', extensions: ['.c'], highlightAlias: 'c' },
      { name: 'go', extensions: ['.go'], highlightAlias: 'go' },
      { name: 'rust', extensions: ['.rs'], highlightAlias: 'rust' },
      { name: 'swift', extensions: ['.swift'], highlightAlias: 'swift' },
      { name: 'kotlin', extensions: ['.kt'], highlightAlias: 'kotlin' },
      { name: 'php', extensions: ['.php'], highlightAlias: 'php' },
      { name: 'ruby', extensions: ['.rb'], highlightAlias: 'ruby' },
      { name: 'html', extensions: ['.html'], highlightAlias: 'html' },
      { name: 'css', extensions: ['.css'], highlightAlias: 'css' },
      { name: 'scss', extensions: ['.scss'], highlightAlias: 'scss' },
      { name: 'json', extensions: ['.json'], highlightAlias: 'json' },
      { name: 'yaml', extensions: ['.yml'], highlightAlias: 'yaml' },
      { name: 'xml', extensions: ['.xml'], highlightAlias: 'xml' },
      { name: 'markdown', extensions: ['.md'], highlightAlias: 'markdown' },
      { name: 'bash', extensions: ['.sh'], highlightAlias: 'bash' },
      { name: 'powershell', extensions: ['.ps1'], highlightAlias: 'powershell' },
      { name: 'sql', extensions: ['.sql'], highlightAlias: 'sql' },
      { name: 'dockerfile', extensions: ['Dockerfile'], highlightAlias: 'dockerfile' },
    ];

    return supportedLanguages.find(lang => lang.name === language) || null;
  }

  /**
   * Convert HTML highlighting to terminal colors
   */
  private static htmlToTerminalColors(html: string, theme: 'light' | 'dark'): string {
    const colors = this.THEME_COLORS[theme];
    
    return html
      .replace(/<span class="hljs-keyword">(.*?)<\/span>/g, (_, content) => colors.keyword(content))
      .replace(/<span class="hljs-string">(.*?)<\/span>/g, (_, content) => colors.string(content))
      .replace(/<span class="hljs-comment">(.*?)<\/span>/g, (_, content) => colors.comment(content))
      .replace(/<span class="hljs-number">(.*?)<\/span>/g, (_, content) => colors.number(content))
      .replace(/<span class="hljs-function">(.*?)<\/span>/g, (_, content) => colors.function(content))
      .replace(/<span class="hljs-variable">(.*?)<\/span>/g, (_, content) => colors.variable(content))
      .replace(/<span class="hljs-title">(.*?)<\/span>/g, (_, content) => colors.function(content))
      .replace(/<span class="hljs-type">(.*?)<\/span>/g, (_, content) => colors.keyword(content))
      .replace(/<span class="hljs-built_in">(.*?)<\/span>/g, (_, content) => colors.function(content))
      .replace(/<span class="hljs-literal">(.*?)<\/span>/g, (_, content) => colors.number(content))
      .replace(/<span class="hljs-attr">(.*?)<\/span>/g, (_, content) => colors.variable(content))
      .replace(/<span class="hljs-tag">(.*?)<\/span>/g, (_, content) => colors.keyword(content))
      .replace(/<span class="hljs-name">(.*?)<\/span>/g, (_, content) => colors.function(content))
      .replace(/<span class="hljs-value">(.*?)<\/span>/g, (_, content) => colors.string(content))
      .replace(/<span class="hljs-selector-tag">(.*?)<\/span>/g, (_, content) => colors.keyword(content))
      .replace(/<span class="hljs-selector-id">(.*?)<\/span>/g, (_, content) => colors.function(content))
      .replace(/<span class="hljs-selector-class">(.*?)<\/span>/g, (_, content) => colors.function(content))
      .replace(/<span class="hljs-selector-attr">(.*?)<\/span>/g, (_, content) => colors.variable(content))
      .replace(/<span class="hljs-selector-pseudo">(.*?)<\/span>/g, (_, content) => colors.keyword(content))
      .replace(/<span class="hljs-attribute">(.*?)<\/span>/g, (_, content) => colors.variable(content))
      .replace(/<span class="hljs-property">(.*?)<\/span>/g, (_, content) => colors.variable(content))
      .replace(/<span class="hljs-meta">(.*?)<\/span>/g, (_, content) => colors.comment(content))
      .replace(/<span class="hljs-meta-keyword">(.*?)<\/span>/g, (_, content) => colors.keyword(content))
      .replace(/<span class="hljs-meta-string">(.*?)<\/span>/g, (_, content) => colors.string(content))
      .replace(/<span class="hljs-subst">(.*?)<\/span>/g, (_, content) => colors.default(content))
      .replace(/<span class="hljs-symbol">(.*?)<\/span>/g, (_, content) => colors.function(content))
      .replace(/<span class="hljs-bullet">(.*?)<\/span>/g, (_, content) => colors.default(content))
      .replace(/<span class="hljs-code">(.*?)<\/span>/g, (_, content) => colors.default(content))
      .replace(/<span class="hljs-emphasis">(.*?)<\/span>/g, (_, content) => chalk.italic(content))
      .replace(/<span class="hljs-strong">(.*?)<\/span>/g, (_, content) => chalk.bold(content))
      .replace(/<span class="hljs-formula">(.*?)<\/span>/g, (_, content) => colors.default(content))
      .replace(/<span class="hljs-link">(.*?)<\/span>/g, (_, content) => chalk.underline(content))
      .replace(/<span class="hljs-quote">(.*?)<\/span>/g, (_, content) => colors.string(content))
      .replace(/<span class="hljs-section">(.*?)<\/span>/g, (_, content) => colors.function(content))
      .replace(/<span class="hljs-addition">(.*?)<\/span>/g, (_, content) => chalk.green(content))
      .replace(/<span class="hljs-deletion">(.*?)<\/span>/g, (_, content) => chalk.red(content))
      .replace(/<[^>]*>/g, ''); // Remove any remaining HTML tags
  }

  /**
   * Basic highlighting fallback
   */
  private static basicHighlight(code: string, language: string, theme: 'light' | 'dark'): string {
    const colors = this.THEME_COLORS[theme];
    
    // Simple regex-based highlighting for common patterns
    return code
      .replace(/\b(function|class|interface|type|enum|const|let|var|if|else|for|while|return|import|export|from|async|await|try|catch|finally|throw|new|this|super|extends|implements|public|private|protected|static|readonly|abstract|virtual|override|sealed|partial|namespace|using|def|class|if|else|elif|for|while|try|except|finally|with|as|import|from|lambda|yield|return|break|continue|pass|raise|assert|del|global|nonlocal|and|or|not|in|is|None|True|False)\b/g, colors.keyword('$1'))
      .replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, colors.string('$1$2$1'))
      .replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, colors.comment('$1'))
      .replace(/\b\d+(\.\d+)?\b/g, colors.number('$&'));
  }

  /**
   * Format code with line numbers
   */
  public static formatWithLineNumbers(code: string, startLine: number = 1): string {
    const lines = code.split('\n');
    const maxLineNumber = startLine + lines.length - 1;
    const lineNumberWidth = maxLineNumber.toString().length;
    
    return lines
      .map((line, index) => {
        const lineNumber = (startLine + index).toString().padStart(lineNumberWidth, ' ');
        return `${chalk.gray(lineNumber)} │ ${line}`;
      })
      .join('\n');
  }

  /**
   * Create a code block with header
   */
  public static createCodeBlock(code: string, language: string, theme: 'light' | 'dark' = 'dark'): string {
    const highlighted = this.highlight(code, language, theme);
    const header = chalk.bgGray.white(` ${language.toUpperCase()} `);
    const border = chalk.gray('─'.repeat(50));
    
    return `${header}\n${border}\n${highlighted}\n${border}`;
  }
}
