import axios from 'axios';

const llmProviders = {
  ollama: {
    baseUrl: process.env.OLLAMA_API_BASE || 'http://localhost:11434',
    apiKey: process.env.OLLAMA_API_KEY
  },
  openai: {
    baseUrl: process.env.OPENAI_API_BASE,
    apiKey: process.env.OPENAI_API_KEY
  },
  google: {
    apiBase: process.env.GOOGLE_API_BASE,
    apiKey: process.env.GOOGLE_API_KEY
  }
};

export async function analyzeCodeWithAI(code, model, provider = 'ollama') {
  if (!llmProviders[provider]) {
    throw new Error(`Unsupported LLM provider: ${provider}`);
  }

  if (provider === 'google') {
    const payload = {
      code,
      model,
      temperature: 0.2,
      maxTokens: 1000
    };

    try {
      const response = await axios.post(
        `${llmProviders[provider].apiBase}/analyze`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${llmProviders[provider].apiKey}`
          }
        }
      );

      return {
        vulnerabilities: response.data.vulnerabilities,
        recommendations: response.data.recommendations,
        exploitCode: response.data.exploitCode
      };
    } catch (error) {
      throw new Error(`AI Analysis Failed: ${error.response?.data?.error || error.message}`);
    }
  } else {
    try {
      const response = await axios.post(
        `${llmProviders[provider].baseUrl}/api/generate`,
        {
          model,
          prompt: `Analyze this smart contract:\n\n${code}\n\nIdentify vulnerabilities and suggest mitigations:`,
          stream: false
        },
        {
          headers: {
            Authorization: `Bearer ${llmProviders[provider].apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      return parseLLMResponse(response.data.response);
    } catch (error) {
      throw new Error(`AI Analysis Failed: ${error.message}`);
    }
  }
}

function parseLLMResponse(response) {
  // Implementation logic to extract vulnerabilities and recommendations
  return {
    vulnerabilities: [],
    recommendations: [],
    exploitCode: ''
  };
}
