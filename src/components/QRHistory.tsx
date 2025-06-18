import React, { useState } from 'react';
import { History, Trash2, Clock, Copy, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { QRHistoryItem } from '../types';
import { downloadQRCode, copyToClipboard } from '../utils/qrGenerator';

interface QRHistoryProps {
  history: QRHistoryItem[];
  onClearHistory: () => void;
  onRemoveItem: (id: string) => void;
  onSelectItem: (text: string) => void;
}

export const QRHistory: React.FC<QRHistoryProps> = ({
  history,
  onClearHistory,
  onRemoveItem,
  onSelectItem
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copyingId, setCopyingId] = useState<string | null>(null);

  const handleCopy = async (item: QRHistoryItem) => {
    setCopyingId(item.id);
    await copyToClipboard(item.dataUrl);
    setTimeout(() => setCopyingId(null), 1000);
  };

  const handleDownload = (item: QRHistoryItem) => {
    const filename = `qrcode-${new Date(item.timestamp).toISOString().split('T')[0]}.png`;
    downloadQRCode(item.dataUrl, filename);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <History className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent QR Codes
            </h3>
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full">
              {history.length}
            </span>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {isExpanded && (
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your recent QR codes are saved locally
              </p>
              <button
                onClick={onClearHistory}
                className="flex items-center space-x-1 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <button
                      onClick={() => onSelectItem(item.text)}
                      className="flex-shrink-0 hover:scale-105 transition-transform"
                    >
                      <img
                        src={item.dataUrl}
                        alt="QR Code"
                        className="w-16 h-16 rounded-lg shadow-sm"
                      />
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <button
                        onClick={() => onSelectItem(item.text)}
                        className="text-left w-full group"
                      >
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {item.text}
                        </p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(item.timestamp)}
                          </span>
                        </div>
                      </button>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleCopy(item)}
                        disabled={copyingId === item.id}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50"
                        title="Copy to clipboard"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDownload(item)}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};