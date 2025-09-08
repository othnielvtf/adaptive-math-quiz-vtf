import React from 'react';
import { useState } from 'react';
import { Settings } from 'lucide-react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuestionCard } from './components/QuestionCard';
import { LevelResult } from './components/LevelResult';
import { FinalResults } from './components/FinalResults';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { ApiConfigModal } from './components/ApiConfigModal';
import { useQuiz } from './hooks/useQuiz';
import { ApiConfig } from './types/quiz';

function App() {
  const [apiConfig, setApiConfig] = useState<ApiConfig>({
    provider: 'openrouter',
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY || '',
    model: 'meta-llama/llama-4-maverick:free'
  });
  const [showApiConfig, setShowApiConfig] = useState(false);

  const {
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
  } = useQuiz(apiConfig);

  const handleNextQuestion = () => {
    if (state.phase === 'assessment') {
      if (state.currentQuestion === state.questions.length - 1) {
        nextQuestion(); // This will trigger level calculation
      } else {
        nextQuestion();
      }
    } else if (state.phase === 'tailored-quiz') {
      if (state.currentQuestion === state.questions.length - 1) {
        finishQuiz();
      } else {
        nextQuestion();
      }
    }
  };

  const handleApiConfigSave = (config: ApiConfig) => {
    setApiConfig(config);
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner message={
        state.phase === 'welcome' ? "Preparing your assessment..." : 
        "Generating your personalized quiz..."
      } />;
    }

    if (error) {
      return (
        <ErrorMessage 
          message={error} 
          onRetry={state.phase === 'welcome' ? startAssessment : startTailoredQuiz}
        />
      );
    }

    switch (state.phase) {
      case 'welcome':
        return <WelcomeScreen onStart={startAssessment} />;
      
      case 'assessment':
      case 'tailored-quiz':
        if (state.questions.length === 0) {
          return <LoadingSpinner />;
        }
        return (
          <QuestionCard
            question={state.questions[state.currentQuestion]}
            questionNumber={state.currentQuestion + 1}
            totalQuestions={state.questions.length}
            selectedAnswer={state.answers[state.currentQuestion]}
            onAnswerSelect={submitAnswer}
            onNext={handleNextQuestion}
            showCannotAnswer={state.phase === 'assessment'}
          />
        );
      
      case 'level-result':
        return (
          <LevelResult
            level={state.level}
            score={state.assessmentScore}
            totalQuestions={state.questions.length}
            onStartTailoredQuiz={startTailoredQuiz}
          />
        );
      
      case 'final-results':
        const timeSpent = Math.floor((Date.now() - state.startTime) / 1000);
        return (
          <FinalResults
            assessmentScore={state.assessmentScore}
            assessmentTotal={8} // Assessment questions count
            quizScore={getQuizScore()}
            quizTotal={state.questions.length}
            level={state.level}
            timeSpent={timeSpent}
            onRestart={restart}
          />
        );
      
      default:
        return <WelcomeScreen onStart={startAssessment} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
            <h1 className="text-2xl font-bold text-gray-800">
              Adaptive Math Quiz
            </h1>
            <button
              onClick={() => setShowApiConfig(true)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="API Configuration"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
          {state.phase !== 'welcome' && (
            <div className="text-sm text-gray-600">
              {state.phase === 'assessment' && 'Assessment Phase'}
              {state.phase === 'level-result' && 'Level Assessment Complete'}
              {state.phase === 'tailored-quiz' && `${state.level.charAt(0).toUpperCase() + state.level.slice(1)} Level Quiz`}
              {state.phase === 'final-results' && 'Quiz Complete'}
            </div>
          )}
          <div className="text-xs text-gray-500 mt-1">
            Using: {apiConfig.provider === 'openrouter' ? 'OpenRouter' : 'Ollama'} • {apiConfig.model}
            {!apiConfig.apiKey && apiConfig.provider === 'openrouter' && (
              <span className="text-orange-600 ml-2">⚠️ No API key configured</span>
            )}
          </div>
        </div>

        {/* Main Content */}
        {renderContent()}

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Powered by OpenRouter AI • Personalized Math Learning</p>
        </div>
      </div>

      {/* API Configuration Modal */}
      <ApiConfigModal
        isOpen={showApiConfig}
        onClose={() => setShowApiConfig(false)}
        config={apiConfig}
        onSave={handleApiConfigSave}
      />
    </div>
  );
}

export default App;