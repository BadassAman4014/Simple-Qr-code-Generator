import React, { useState } from 'react';
import { Download, Copy, Share2, Check, X } from 'lucide-react';
import { downloadQRCode, copyToClipboard, shareQRCode } from '../utils/qrGenerator';

interface QRDisplayProps {
  dataUrl: string | null;
  text: string;
  isGenerating: boolean;
}

export const QRDisplay: React.FC<QRDisplayProps> = ({ dataUrl, text, isGenerating }) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [shareStatus, setShareStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleDownload = () => {
    if (dataUrl) {
      const filename = `qrcode-${Date.now()}.png`;
      downloadQRCode(dataUrl, filename);
    }
  };

  const handleCopy = async () => {
    if (dataUrl) {
      const success = await copyToClipboard(dataUrl);
      setCopyStatus(success ? 'success' : 'error');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  const handleShare = async () => {
    if (dataUrl) {
      const success = await shareQRCode(dataUrl, text);
      if (success) {
        setShareStatus('success');
        setTimeout(() => setShareStatus('idle'), 2000);
      } else {
        // Fallback to copy if share is not supported
        handleCopy();
      }
    }
  };

  const getButtonIcon = (status: 'idle' | 'success' | 'error', IdleIcon: React.ComponentType<any>) => {
    if (status === 'success') return <Check className="w-4 h-4" />;
    if (status === 'error') return <X className="w-4 h-4" />;
    return <IdleIcon className="w-4 h-4" />;
  };

  const getButtonColor = (status: 'idle' | 'success' | 'error') => {
    if (status === 'success') return 'bg-green-500 hover:bg-green-600';
    if (status === 'error') return 'bg-red-500 hover:bg-red-600';
    return 'bg-gray-600 hover:bg-gray-700';
  };

  if (!dataUrl && !isGenerating) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center border border-gray-200 dark:border-gray-700">
          <div className="w-48 h-48 mx-auto bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-4">
            <div className="text-gray-400 dark:text-gray-500">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h2v2H7V7zm0 4h2v2H7v-2zm0 4h2v2H7v-2zm4-8h2v2h-2V7zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm4-8h2v2h-2V7zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z"/>
              </svg>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Enter text or URL above to generate your QR code
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-4">
          {isGenerating ? (
            <div className="w-48 h-48 mx-auto bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
              <div className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : dataUrl ? (
            <div className="relative group">
              <img
                src={dataUrl}
                alt="Generated QR Code"
                className="w-48 h-48 mx-auto rounded-xl shadow-md group-hover:shadow-lg transition-shadow"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-xl transition-all duration-200"></div>
            </div>
          ) : null}
        </div>

        {text && (
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Generated for:</p>
            <p className="text-sm text-gray-900 dark:text-white break-all">{text}</p>
          </div>
        )}

        {dataUrl && (
          <div className="flex space-x-2">
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            
            <button
              onClick={handleCopy}
              className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 text-white font-medium rounded-lg transition-colors duration-200 ${getButtonColor(copyStatus)}`}
            >
              {getButtonIcon(copyStatus, Copy)}
              <span>Copy</span>
            </button>
            
            <button
              onClick={handleShare}
              className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 text-white font-medium rounded-lg transition-colors duration-200 ${getButtonColor(shareStatus)}`}
            >
              {getButtonIcon(shareStatus, Share2)}
              <span>Share</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};