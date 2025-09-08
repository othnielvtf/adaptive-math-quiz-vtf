import React from 'react';
import { Trophy, RefreshCw, BarChart } from 'lucide-react';

interface FinalResultsProps {
  assessmentScore: number;
  assessmentTotal: number;
  quizScore: number;
  quizTotal: number;
  level: string;
  timeSpent: number;
  onRestart: () => void;
}

export const FinalResults: React.FC<FinalResultsProps> = ({
  assessmentScore,
  assessmentTotal,
  quizScore,
  quizTotal,
  level,
  timeSpent,
  onRestart
}) => {
  const assessmentPercentage = Math.round((assessmentScore / assessmentTotal) * 100);
  const quizPercentage = Math.round((quizScore / quizTotal) * 100);
  const overallPercentage = Math.round(((assessmentScore + quizScore) / (assessmentTotal + quizTotal)) * 100);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getPerformanceMessage = (percentage: number) => {
    if (percentage >= 90) return { message: "Outstanding! You're a math superstar! 🌟", color: "text-green-600" };
    if (percentage >= 80) return { message: "Excellent work! Keep up the great progress! 🎉", color: "text-blue-600" };
    if (percentage >= 70) return { message: "Good job! You're on the right track! 👍", color: "text-indigo-600" };
    if (percentage >= 60) return { message: "Nice effort! Room for improvement! 💪", color: "text-orange-600" };
    return { message: "Keep practicing! Every expert was once a beginner! 🚀", color: "text-purple-600" };
  };

  const performance = getPerformanceMessage(overallPercentage);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 mb-6">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete! 🎉</h2>
        <p className={`text-xl font-semibold ${performance.color} mb-2`}>
          {performance.message}
        </p>
        <p className="text-gray-600">
          You completed the {level} level quiz
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-xl p-6 text-center">
          <BarChart className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h3 className="font-semibold text-blue-800 mb-2">Assessment</h3>
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {assessmentScore}/{assessmentTotal}
          </div>
          <div className="text-sm text-blue-700">
            {assessmentPercentage}% correct
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2 mt-3">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${assessmentPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-6 text-center">
          <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <h3 className="font-semibold text-purple-800 mb-2">Tailored Quiz</h3>
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {quizScore}/{quizTotal}
          </div>
          <div className="text-sm text-purple-700">
            {quizPercentage}% correct
          </div>
          <div className="w-full bg-purple-200 rounded-full h-2 mt-3">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${quizPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-6 text-center">
          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
            {overallPercentage}%
          </div>
          <h3 className="font-semibold text-green-800 mb-2">Overall Score</h3>
          <div className="text-2xl font-bold text-green-600 mb-1">
            {assessmentScore + quizScore}/{assessmentTotal + quizTotal}
          </div>
          <div className="text-sm text-green-700">
            Time: {formatTime(timeSpent)}
          </div>
          <div className="w-full bg-green-200 rounded-full h-2 mt-3">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${overallPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="font-semibold text-gray-800 mb-3 text-center">Performance Summary</h3>
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-800 mb-2">
            {overallPercentage}%
          </div>
          <div className="text-lg text-gray-600 mb-4">
            Overall Accuracy
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-1500"
              style={{ width: `${overallPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onRestart}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Take Another Quiz
        </button>
      </div>
    </div>
  );
};