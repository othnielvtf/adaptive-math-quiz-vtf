import React from 'react';
import { Question } from '../types/quiz';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  onNext: () => void;
  showCannotAnswer?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  showCannotAnswer = true
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {question.difficulty}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-8 leading-relaxed">
        {question.question}
      </h2>

      <div className="space-y-3 mb-8">
        {Object.entries(question.options).map(([key, value]) => (
          <button
            key={key}
            onClick={() => onAnswerSelect(key)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
              selectedAnswer === key
                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25 text-gray-700'
            }`}
          >
            <span className="font-medium mr-3">{key}.</span>
            {value}
          </button>
        ))}
        
        {showCannotAnswer && (
          <button
            onClick={() => onAnswerSelect('CANNOT_ANSWER')}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
              selectedAnswer === 'CANNOT_ANSWER'
                ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
                : 'border-gray-200 hover:border-orange-300 hover:bg-orange-25 text-gray-700'
            }`}
          >
            <span className="font-medium mr-3">E.</span>
            I cannot answer this question
          </button>
        )}
      </div>

      <button
        onClick={onNext}
        disabled={!selectedAnswer}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        {questionNumber === totalQuestions ? 'Finish' : 'Next Question'}
      </button>
    </div>
  );
};