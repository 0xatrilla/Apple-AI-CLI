# Frequently Asked Questions

## General Questions

### What is Apple Code Assistant?

Apple Code Assistant is a TypeScript command-line tool that generates code using Apple's Foundation Models. It provides an AI-powered code generation experience directly in your terminal with syntax highlighting, file operations, and interactive modes.

### What programming languages are supported?

The tool supports 25+ programming languages including:
- **Web**: TypeScript, JavaScript, HTML, CSS, SCSS
- **Backend**: Python, Java, C#, PHP, Ruby, Go, Rust
- **Mobile**: Swift, Kotlin
- **Systems**: C, C++
- **Data**: JSON, YAML, XML, SQL
- **Documentation**: Markdown
- **Scripts**: Bash, PowerShell
- **DevOps**: Dockerfile

### Is this tool free to use?

The tool itself is open source and free. However, you need an Apple Developer account and API access to Apple Foundation Models, which may have usage costs depending on your plan.

## Installation & Setup

### How do I get an Apple Foundation Models API key?

1. Visit the [Apple Developer Console](https://developer.apple.com)
2. Sign in with your Apple ID
3. Navigate to the Foundation Models section
4. Create a new API key
5. Copy the key for use in the tool

### Where is the configuration file stored?

The configuration file is stored at `~/.apple-code-assistant/config.json` in your home directory.

### Can I use environment variables instead of a config file?

Yes! You can set environment variables instead of using a config file. See the [Installation Guide](INSTALLATION.md) for details.

### How do I update the tool?

If installed from source:
```bash
cd /path/to/apple-code-assistant
git pull
npm install
npm run build
```

If installed via npm:
```bash
npm update -g apple-code-assistant
```

## Usage

### How do I start interactive mode?

```bash
apple-code -i
```

### Can I generate code without interactive mode?

Yes! Use the `-p` flag with your prompt:
```bash
apple-code -p "create a React component for a todo list"
```

### How do I save generated code to a file?

Use the `--save` flag with an optional output file:
```bash
apple-code -p "create a utility function" --save -o utils.ts
```

### How do I copy code to clipboard?

Use the `--copy` flag:
```bash
apple-code -p "create a data structure" --copy
```

### Can I specify the programming language?

Yes! Use the `-l` flag:
```bash
apple-code -p "implement sorting algorithm" -l python
```

### How do I provide additional context?

Use the `--context` flag:
```bash
apple-code -p "create authentication middleware" --context "for Express.js application"
```

## Configuration

### How do I change the default model?

Set the `APPLE_FOUNDATION_MODEL` environment variable or update your config file:
```json
{
  "model": "apple-foundation-model-v2"
}
```

### How do I change the default language?

Set the `APPLE_CODE_DEFAULT_LANGUAGE` environment variable or update your config file:
```json
{
  "defaultLanguage": "python"
}
```

### How do I adjust the temperature setting?

Temperature controls randomness (0 = deterministic, 2 = very random):
```bash
apple-code -p "generate code" --temperature 0.5
```

### How do I set maximum tokens?

Maximum tokens control response length:
```bash
apple-code -p "generate code" --max-tokens 2000
```

## Troubleshooting

### "Command not found" error

This usually means the tool isn't installed globally. Try:
```bash
npm install -g .
# or
npx apple-code
```

### "API key not found" error

Check your configuration:
1. Verify environment variable: `echo $APPLE_FOUNDATION_API_KEY`
2. Check config file: `cat ~/.apple-code-assistant/config.json`
3. Ensure API key is valid and has proper permissions

### "API connection failed" error

1. Check your internet connection
2. Verify your API key is correct
3. Ensure you have access to Apple Foundation Models
4. Try the test command: `apple-code test`

### Code generation is slow

This is normal for AI models. You can:
1. Reduce `maxTokens` for shorter responses
2. Use a faster model if available
3. Check your internet connection speed

### Syntax highlighting not working

1. Ensure your terminal supports colors
2. Try a different theme: `--theme light`
3. Check if highlight.js is working properly

### File operations failing

1. Check file permissions
2. Ensure the directory exists
3. Verify you have write access to the target location

## Advanced Usage

### Can I use this in scripts?

Yes! The tool supports non-interactive mode:
```bash
#!/bin/bash
CODE=$(apple-code -p "create a function" -l typescript)
echo "$CODE" > output.ts
```

### Can I pipe output to other commands?

Yes! The tool outputs to stdout:
```bash
apple-code -p "generate JSON schema" | jq .
```

### How do I use custom models?

Set the model in your configuration or use the `-m` flag:
```bash
apple-code -p "generate code" -m "custom-model-name"
```

### Can I batch process multiple prompts?

You can create a script to process multiple prompts:
```bash
#!/bin/bash
prompts=("create a class" "create a function" "create a test")
for prompt in "${prompts[@]}"; do
  apple-code -p "$prompt" --save -o "output_$RANDOM.ts"
done
```

## Development

### How do I contribute to the project?

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### How do I run tests?

```bash
npm test
```

### How do I build for development?

```bash
npm run build
npm run dev
```

### Can I extend the tool with custom functionality?

Yes! The tool is modular and designed for extensibility. You can:
1. Add new language support in `LanguageDetector`
2. Create custom output formatters
3. Add new CLI commands
4. Extend the API client

## Security & Privacy

### Is my code sent to Apple?

Yes, your prompts and generated code are sent to Apple's Foundation Models API. The tool doesn't store or log your code locally.

### Is my API key secure?

Yes, API keys are stored in your home directory with restricted permissions and are not transmitted except to Apple's API.

### Can I use this offline?

No, the tool requires an internet connection to communicate with Apple's Foundation Models API.

### Are there any data retention policies?

Check Apple's privacy policy and terms of service for information about data retention and usage.

## Performance

### What are the rate limits?

Rate limits depend on your Apple Developer account and API plan. Check your Apple Developer Console for details.

### How can I optimize performance?

1. Use shorter prompts for faster responses
2. Reduce `maxTokens` for quicker generation
3. Use appropriate `temperature` settings
4. Ensure good internet connection

### Does the tool cache responses?

No, the tool doesn't cache responses. Each request is sent to Apple's API.

## Support

### Where can I get help?

1. Check this FAQ
2. Review the [API documentation](API.md)
3. Open an issue on [GitHub](https://github.com/your-username/apple-code-assistant/issues)
4. Check the [troubleshooting guide](INSTALLATION.md#troubleshooting)

### How do I report bugs?

1. Check if the issue is already reported
2. Create a new issue with:
   - Description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - System information (macOS version, Node.js version)
   - Error messages or logs

### How do I request features?

1. Check if the feature is already requested
2. Create a new issue with:
   - Description of the feature
   - Use case and benefits
   - Implementation suggestions (if any)

### Is there a community or forum?

Currently, GitHub Issues is the primary way to get community support. We may add a Discord server or forum in the future.
