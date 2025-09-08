import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Loading questions..." 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto text-center">
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {message}
        </h3>
        <p className="text-gray-600">
          Please wait while we prepare your personalized questions...
        </p>
      </div>
    </div>
  );
};