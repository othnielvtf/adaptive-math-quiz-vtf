export interface Question {
  id: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

export interface QuizState {
  phase: 'welcome' | 'assessment' | 'level-result' | 'tailored-quiz' | 'final-results';
  currentQuestion: number;
  questions: Question[];
  answers: (string | null)[];
  assessmentScore: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  startTime: number;
}

export interface ApiConfig {
  provider: 'openrouter' | 'ollama';
  apiKey?: string;
  ollamaUrl?: string;
  model: string;
}

export interface OpenRouterResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}