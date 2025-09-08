import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto text-center">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-red-50 rounded-full p-4 mb-4">
          <AlertCircle className="w-12 h-12 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};