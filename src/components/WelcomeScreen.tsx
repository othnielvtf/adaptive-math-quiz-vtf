import React from 'react';
import { Calculator, Brain, Target } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
          <Calculator className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Adaptive Math Quiz
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Discover your math level and get personalized practice problems designed just for you!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-xl p-6">
          <Brain className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h3 className="font-semibold text-blue-800 mb-2">Assessment</h3>
          <p className="text-sm text-blue-700">
            Take a quick assessment to determine your current math level
          </p>
        </div>
        <div className="bg-purple-50 rounded-xl p-6">
          <Target className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <h3 className="font-semibold text-purple-800 mb-2">Personalized</h3>
          <p className="text-sm text-purple-700">
            Get questions tailored to your skill level and learning needs
          </p>
        </div>
        <div className="bg-green-50 rounded-xl p-6">
          <Calculator className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h3 className="font-semibold text-green-800 mb-2">Practice</h3>
          <p className="text-sm text-green-700">
            Improve your math skills with targeted practice problems
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="font-semibold text-gray-800 mb-3">How it works:</h3>
        <div className="text-left space-y-2 text-gray-600">
          <div className="flex items-center">
            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">1</span>
            Complete 8 assessment questions
          </div>
          <div className="flex items-center">
            <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">2</span>
            We calculate your math level
          </div>
          <div className="flex items-center">
            <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">3</span>
            Take a personalized quiz
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        Start Assessment
      </button>
    </div>
  );
};