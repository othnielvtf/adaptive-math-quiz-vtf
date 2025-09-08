import { useState, useCallback } from 'react';
import { Question, QuizState, ApiConfig } from '../types/quiz';
import { openRouterService } from '../services/openRouterApi';

export const useQuiz = (apiConfig: ApiConfig) => {
  const [state, setState] = useState<QuizState>({
    phase: 'welcome',
    currentQuestion: 0,
    questions: [],
    answers: [],
    assessmentScore: 0,
    level: 'beginner',
    startTime: Date.now()
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateLevel = useCallback((score: number, totalQuestions: number): 'beginner' | 'intermediate' | 'advanced' => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 70) return 'advanced';
    if (percentage >= 40) return 'intermediate';
    return 'beginner';
  }, []);

  const startAssessment = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const questions = await openRouterService.generateAssessmentQuestions(apiConfig);
      const formattedQuestions: Question[] = questions.map((q, index) => ({
        id: `assessment-${index}`,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        difficulty: q.difficulty,
        topic: q.topic
      }));

      setState(prev => ({
        ...prev,
        phase: 'assessment',
        questions: formattedQuestions,
        answers: new Array(formattedQuestions.length).fill(null),
        currentQuestion: 0,
        startTime: Date.now()
      }));
    } catch (err) {
      setError('Failed to load assessment questions. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const submitAnswer = useCallback((answer: string) => {
    setState(prev => {
      const newAnswers = [...prev.answers];
      newAnswers[prev.currentQuestion] = answer;
      return {
        ...prev,
        answers: newAnswers
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setState(prev => {
      if (prev.currentQuestion < prev.questions.length - 1) {
        return {
          ...prev,
          currentQuestion: prev.currentQuestion + 1
        };
      } else {
        // Calculate assessment score
        const score = prev.answers.reduce((acc, answer, index) => {
          if (answer && answer === prev.questions[index]?.correctAnswer) {
            return acc + 1;
          }
          return acc;
        }, 0);

        const level = calculateLevel(score, prev.questions.length);

        return {
          ...prev,
          phase: 'level-result',
          assessmentScore: score,
          level
        };
      }
    });
  }, [calculateLevel]);

  const startTailoredQuiz = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const topics = state.level === 'beginner' ? ['arithmetic', 'basic_algebra'] :
                    state.level === 'intermediate' ? ['algebra', 'geometry', 'statistics'] :
                    ['calculus', 'trigonometry', 'advanced_algebra'];

      const questions = await openRouterService.generateTailoredQuiz(state.level, topics, apiConfig);
      const formattedQuestions: Question[] = questions.map((q, index) => ({
        id: `quiz-${index}`,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        difficulty: q.difficulty || state.level,
        topic: q.topic
      }));

      setState(prev => ({
        ...prev,
        phase: 'tailored-quiz',
        questions: formattedQuestions,
        answers: new Array(formattedQuestions.length).fill(null),
        currentQuestion: 0
      }));
    } catch (err) {
      setError('Failed to load quiz questions. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [state.level]);

  const finishQuiz = useCallback(() => {
    setState(prev => ({
      ...prev,
      phase: 'final-results'
    }));
  }, []);

  const restart = useCallback(() => {
    setState({
      phase: 'welcome',
      currentQuestion: 0,
      questions: [],
      answers: [],
      assessmentScore: 0,
      level: 'beginner',
      startTime: Date.now()
    });
    setError(null);
  }, []);

  const getQuizScore = useCallback(() => {
    if (state.phase !== 'final-results') return 0;
    return state.answers.reduce((acc, answer, index) => {
      if (answer && answer === state.questions[index]?.correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }, [state.phase, state.answers, state.questions]);

  return {
    state,
    loading,
    error,
    startAssessment,
    submitAnswer,
    nextQuestion,
    startTailoredQuiz,
    finishQuiz,
    restart,
    getQuizScore
  };
};