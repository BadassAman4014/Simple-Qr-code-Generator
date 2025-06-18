import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { QRInput } from './components/QRInput';
import { QRDisplay } from './components/QRDisplay';
import { QRHistory } from './components/QRHistory';
import { useDarkMode } from './hooks/useDarkMode';
import { useQRHistory } from './hooks/useQRHistory';
import { generateQRCode } from './utils/qrGenerator';

function App() {
  const [inputText, setInputText] = useState('');
  const [currentQR, setCurrentQR] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { isDark, toggleDarkMode } = useDarkMode();
  const { history, addToHistory, removeFromHistory, clearHistory } = useQRHistory();

  const handleGenerate = useCallback(async () => {
    if (!inputText.trim()) return;

    setIsGenerating(true);
    try {
      const dataUrl = await generateQRCode(inputText.trim());
      setCurrentQR(dataUrl);
      
      // Add to history
      addToHistory({
        text: inputText.trim(),
        dataUrl
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
      // You could add a toast notification here
    } finally {
      setIsGenerating(false);
    }
  }, [inputText, addToHistory]);

  const handleSelectFromHistory = useCallback((text: string) => {
    setInputText(text);
    // Find the QR code in history and set it as current
    const historyItem = history.find(item => item.text === text);
    if (historyItem) {
      setCurrentQR(historyItem.dataUrl);
    }
  }, [history]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Header isDark={isDark} onToggleDark={toggleDarkMode} />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Generate QR Codes
            <span className="bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent"> Instantly</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Create beautiful QR codes for any text or URL. Download, share, and manage your codes with ease.
          </p>
        </div>

        {/* Input Section */}
        <QRInput
          value={inputText}
          onChange={setInputText}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />

        {/* QR Display Section */}
        <QRDisplay
          dataUrl={currentQR}
          text={inputText}
          isGenerating={isGenerating}
        />

        {/* History Section */}
        <QRHistory
          history={history}
          onClearHistory={clearHistory}
          onRemoveItem={removeFromHistory}
          onSelectItem={handleSelectFromHistory}
        />

        {/* Features Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Why Choose Our QR Generator?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Fast & Reliable</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Generate high-quality QR codes instantly with our optimized algorithms
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Privacy First</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  All processing happens locally in your browser - your data never leaves your device
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Full Featured</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Download, copy, share, and keep track of all your QR codes with built-in history
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Made with ❤️ for everyone who needs QR codes
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;