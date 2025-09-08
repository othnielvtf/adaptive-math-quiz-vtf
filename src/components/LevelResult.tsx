import React from 'react';
import { Trophy, Target, Zap } from 'lucide-react';

interface LevelResultProps {
  level: 'beginner' | 'intermediate' | 'advanced';
  score: number;
  totalQuestions: number;
  onStartTailoredQuiz: () => void;
}

export const LevelResult: React.FC<LevelResultProps> = ({
  level,
  score,
  totalQuestions,
  onStartTailoredQuiz
}) => {
  const levelConfig = {
    beginner: {
      icon: Target,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      title: 'Beginner Level',
      description: 'Great start! You\'ll work on fundamental math concepts.',
      topics: ['Basic Arithmetic', 'Simple Equations', 'Fractions']
    },
    intermediate: {
      icon: Zap,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      title: 'Intermediate Level',
      description: 'Well done! You\'re ready for more challenging problems.',
      topics: ['Algebra', 'Geometry', 'Statistics']
    },
    advanced: {
      icon: Trophy,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      title: 'Advanced Level',
      description: 'Excellent! You\'ll tackle complex mathematical concepts.',
      topics: ['Calculus', 'Trigonometry', 'Advanced Algebra']
    }
  };

  const config = levelConfig[level];
  const Icon = config.icon;
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto text-center">
      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${config.bgColor} mb-6`}>
        <Icon className={`w-10 h-10 ${config.textColor}`} />
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-4">Assessment Complete!</h2>
      
      <div className="mb-6">
        <div className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${config.color} text-white font-semibold text-lg mb-4`}>
          {config.title}
        </div>
        <p className="text-gray-600 text-lg mb-4">{config.description}</p>
        
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="text-3xl font-bold text-gray-800 mb-2">
            {score}/{totalQuestions}
          </div>
          <div className="text-gray-600">
            {percentage}% Correct
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
            <div
              className={`bg-gradient-to-r ${config.color} h-3 rounded-full transition-all duration-1000 ease-out`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Your tailored quiz will focus on:</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {config.topics.map((topic, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onStartTailoredQuiz}
        className={`w-full bg-gradient-to-r ${config.color} text-white font-semibold py-4 px-6 rounded-xl hover:shadow-xl transition-all duration-200 transform hover:scale-105`}
      >
        Start My Tailored Quiz
      </button>
    </div>
  );
};