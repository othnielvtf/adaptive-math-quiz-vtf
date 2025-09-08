import React, { useState } from 'react';
import { Settings, X, Globe, Server } from 'lucide-react';
import { ApiConfig } from '../types/quiz';

interface ApiConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ApiConfig;
  onSave: (config: ApiConfig) => void;
}

export const ApiConfigModal: React.FC<ApiConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave
}) => {
  const [localConfig, setLocalConfig] = useState<ApiConfig>(config);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(localConfig);
    onClose();
  };

  const openRouterModels = [
    'meta-llama/llama-4-maverick:free',
    'meta-llama/llama-3.1-8b-instruct:free',
    'microsoft/phi-3-mini-128k-instruct:free',
    'google/gemma-2-9b-it:free'
  ];

  const ollamaModels = [
    'llama3.2',
    'llama3.1',
    'phi3',
    'gemma2',
    'qwen2.5',
    'mistral'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">API Configuration</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Provider Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                AI Provider
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setLocalConfig(prev => ({ 
                    ...prev, 
                    provider: 'openrouter',
                    model: prev.provider === 'openrouter' ? prev.model : 'meta-llama/llama-4-maverick:free'
                  }))}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    localConfig.provider === 'openrouter'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300 text-gray-700'
                  }`}
                >
                  <Globe className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-medium">OpenRouter</div>
                  <div className="text-xs opacity-75">Cloud API</div>
                </button>
                <button
                  onClick={() => setLocalConfig(prev => ({ 
                    ...prev, 
                    provider: 'ollama',
                    model: prev.provider === 'ollama' ? prev.model : 'llama3.2'
                  }))}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    localConfig.provider === 'ollama'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300 text-gray-700'
                  }`}
                >
                  <Server className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-medium">Ollama</div>
                  <div className="text-xs opacity-75">Local</div>
                </button>
              </div>
            </div>

            {/* OpenRouter Configuration */}
            {localConfig.provider === 'openrouter' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OpenRouter API Key
                  </label>
                  <input
                    type="password"
                    value={localConfig.apiKey || ''}
                    onChange={(e) => setLocalConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                    placeholder="Enter your OpenRouter API key"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Get your API key from <a href="https://openrouter.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">openrouter.ai</a>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model
                  </label>
                  <select
                    value={localConfig.model}
                    onChange={(e) => setLocalConfig(prev => ({ ...prev, model: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {openRouterModels.map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Ollama Configuration */}
            {localConfig.provider === 'ollama' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ollama URL
                  </label>
                  <input
                    type="url"
                    value={localConfig.ollamaUrl || 'http://localhost:11434'}
                    onChange={(e) => setLocalConfig(prev => ({ ...prev, ollamaUrl: e.target.value }))}
                    placeholder="http://localhost:11434"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Make sure Ollama is running locally
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model
                  </label>
                  <select
                    value={localConfig.model}
                    onChange={(e) => setLocalConfig(prev => ({ ...prev, model: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {ollamaModels.map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Make sure the model is installed: <code className="bg-gray-100 px-1 rounded">ollama pull {localConfig.model}</code>
                  </p>
                </div>
              </>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={localConfig.provider === 'openrouter' && !localConfig.apiKey}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};