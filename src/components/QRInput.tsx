import React, { useState, useCallback } from 'react';
import { Type, Link, Sparkles } from 'lucide-react';

interface QRInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const QRInput: React.FC<QRInputProps> = ({
  value,
  onChange,
  onGenerate,
  isGenerating
}) => {
  const [inputType, setInputType] = useState<'text' | 'url'>('text');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onGenerate();
    }
  }, [value, onGenerate]);

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const detectedType = isValidUrl(value) ? 'url' : 'text';

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="flex items-center space-x-2 mb-3">
            <button
              type="button"
              onClick={() => setInputType('text')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                inputType === 'text'
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <Type className="w-4 h-4" />
              <span>Text</span>
            </button>
            <button
              type="button"
              onClick={() => setInputType('url')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                inputType === 'url'
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <Link className="w-4 h-4" />
              <span>URL</span>
            </button>
            {detectedType === 'url' && value && (
              <div className="flex items-center space-x-1 text-xs text-green-600 dark:text-green-400">
                <Sparkles className="w-3 h-3" />
                <span>URL detected</span>
              </div>
            )}
          </div>
          
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={
              inputType === 'url'
                ? 'Enter a URL (e.g., https://example.com)'
                : 'Enter any text to generate a QR code'
            }
            className="w-full h-32 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
            disabled={isGenerating}
          />
        </div>
        
        <button
          type="submit"
          disabled={!value.trim() || isGenerating}
          className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {isGenerating ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generating...</span>
            </div>
          ) : (
            'Generate QR Code'
          )}
        </button>
      </form>
    </div>
  );
};