export type AIProvider = 'gemini' | 'openai' | 'groq' | 'nvidia';

export interface AIProviderConfig {
  provider: AIProvider;
  apiKey: string;
}

export interface GenerateResumeOptions {
  content: string;
  tone: 'professional' | 'student' | 'executive';
}

/**
 * AI Provider Manager - Abstraction layer for all AI requests.
 * Ensures we can easily swap or add new providers in the future.
 */
export class AIProviderManager {
  private config: AIProviderConfig;

  constructor(config: AIProviderConfig) {
    this.config = config;
  }

  /**
   * Generates a resume using the selected AI provider.
   */
  async generateResume(options: GenerateResumeOptions): Promise<string> {
    switch (this.config.provider) {
      case 'gemini':
        return this.callGemini(options);
      case 'openai':
        return this.callOpenAI(options);
      case 'groq':
        return this.callGroq(options);
      case 'nvidia':
        return this.callNvidia(options);
      default:
        throw new Error(`Unsupported provider: ${this.config.provider}`);
    }
  }

  private async callGemini(options: GenerateResumeOptions): Promise<string> {
    // TODO: Implement actual Gemini API call
    return `[Gemini] Generated resume with tone: ${options.tone}`;
  }

  private async callOpenAI(options: GenerateResumeOptions): Promise<string> {
    // TODO: Implement actual OpenAI API call
    return `[OpenAI] Generated resume with tone: ${options.tone}`;
  }

  private async callGroq(options: GenerateResumeOptions): Promise<string> {
    // TODO: Implement actual Groq API call
    return `[Groq] Generated resume with tone: ${options.tone}`;
  }

  private async callNvidia(options: GenerateResumeOptions): Promise<string> {
    // TODO: Implement actual NVIDIA NIM API call
    return `[NVIDIA] Generated resume with tone: ${options.tone}`;
  }
}
