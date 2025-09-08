import { ApiConfig } from '../types/quiz';

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

export class OpenRouterService {
  private async makeRequest(prompt: string, config: ApiConfig): Promise<string> {
    if (config.provider === 'openrouter') {
      return this.makeOpenRouterRequest(prompt, config);
    } else if (config.provider === 'ollama') {
      return this.makeOllamaRequest(prompt, config);
    } else {
      throw new Error('Invalid provider configuration');
    }
  }

  private async makeOpenRouterRequest(prompt: string, config: ApiConfig): Promise<string> {
    if (!config.apiKey) {
      throw new Error('OpenRouter API key not configured');
    }

    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: 'system',
            content: 'You are a math teacher creating quiz questions. Always respond with valid JSON format only, no additional text.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  private async makeOllamaRequest(prompt: string, config: ApiConfig): Promise<string> {
    const ollamaUrl = config.ollamaUrl || 'http://localhost:11434';
    
    const response = await fetch(`${ollamaUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: 'system',
            content: 'You are a math teacher creating quiz questions. Always respond with valid JSON format only, no additional text.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        stream: false,
        options: {
          temperature: 0.7,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.message.content;
  }

  async generateAssessmentQuestions(config: ApiConfig): Promise<any[]> {
    const prompt = `Generate 8 math questions for level assessment with varying difficulty (2 easy, 3 medium, 3 hard). 
    Include topics like basic arithmetic, algebra, geometry, and word problems.
    
    Return JSON array format:
    [
      {
        "question": "What is 15 + 27?",
        "options": {"A": "42", "B": "41", "C": "43", "D": "40"},
        "correctAnswer": "A",
        "difficulty": "easy",
        "topic": "arithmetic"
      }
    ]`;

    const response = await this.makeRequest(prompt, config);
    try {
      return JSON.parse(response);
    } catch (error) {
      // Fallback questions if API fails
      return this.getFallbackAssessmentQuestions();
    }
  }

  async generateTailoredQuiz(level: string, topics: string[], config: ApiConfig): Promise<any[]> {
    const prompt = `Generate 10 math questions for ${level} level focusing on ${topics.join(', ')}.
    
    Return JSON array format:
    [
      {
        "question": "Question text here",
        "options": {"A": "option1", "B": "option2", "C": "option3", "D": "option4"},
        "correctAnswer": "A",
        "difficulty": "${level}",
        "topic": "topic_name"
      }
    ]`;

    const response = await this.makeRequest(prompt, config);
    try {
      return JSON.parse(response);
    } catch (error) {
      return this.getFallbackTailoredQuestions(level);
    }
  }

  private getFallbackAssessmentQuestions() {
    return [
      {
        question: "What is 8 + 5?",
        options: { A: "13", B: "12", C: "14", D: "15" },
        correctAnswer: "A",
        difficulty: "easy",
        topic: "arithmetic"
      },
      {
        question: "What is 144 ÷ 12?",
        options: { A: "11", B: "12", C: "13", D: "10" },
        correctAnswer: "B",
        difficulty: "easy",
        topic: "arithmetic"
      },
      {
        question: "Solve for x: 2x + 6 = 14",
        options: { A: "3", B: "4", C: "5", D: "6" },
        correctAnswer: "B",
        difficulty: "medium",
        topic: "algebra"
      },
      {
        question: "What is the area of a rectangle with length 8 and width 6?",
        options: { A: "48", B: "28", C: "14", D: "42" },
        correctAnswer: "A",
        difficulty: "medium",
        topic: "geometry"
      },
      {
        question: "If a train travels 60 miles in 2 hours, what is its speed?",
        options: { A: "20 mph", B: "25 mph", C: "30 mph", D: "35 mph" },
        correctAnswer: "C",
        difficulty: "medium",
        topic: "word_problems"
      },
      {
        question: "What is the derivative of x² + 3x?",
        options: { A: "x + 3", B: "2x + 3", C: "2x²", D: "x² + 3" },
        correctAnswer: "B",
        difficulty: "hard",
        topic: "calculus"
      },
      {
        question: "Solve: log₂(8) = ?",
        options: { A: "2", B: "3", C: "4", D: "8" },
        correctAnswer: "B",
        difficulty: "hard",
        topic: "logarithms"
      },
      {
        question: "What is sin(30°)?",
        options: { A: "0.5", B: "0.6", C: "0.7", D: "1" },
        correctAnswer: "A",
        difficulty: "hard",
        topic: "trigonometry"
      }
    ];
  }

  private getFallbackTailoredQuestions(level: string) {
    const questions = {
      beginner: [
        {
          question: "What is 25 + 17?",
          options: { A: "41", B: "42", C: "43", D: "44" },
          correctAnswer: "B",
          difficulty: "easy",
          topic: "arithmetic"
        },
        {
          question: "What is 9 × 7?",
          options: { A: "61", B: "62", C: "63", D: "64" },
          correctAnswer: "C",
          difficulty: "easy",
          topic: "arithmetic"
        }
      ],
      intermediate: [
        {
          question: "Solve for y: 3y - 9 = 21",
          options: { A: "8", B: "9", C: "10", D: "11" },
          correctAnswer: "C",
          difficulty: "medium",
          topic: "algebra"
        },
        {
          question: "What is the circumference of a circle with radius 5?",
          options: { A: "10π", B: "15π", C: "20π", D: "25π" },
          correctAnswer: "A",
          difficulty: "medium",
          topic: "geometry"
        }
      ],
      advanced: [
        {
          question: "What is the integral of 2x + 1?",
          options: { A: "x² + x + C", B: "2x² + x + C", C: "x² + x", D: "2x + C" },
          correctAnswer: "A",
          difficulty: "hard",
          topic: "calculus"
        }
      ]
    };
    
    return questions[level as keyof typeof questions] || questions.beginner;
  }
}

export const openRouterService = new OpenRouterService();