export interface QRHistoryItem {
  id: string;
  text: string;
  timestamp: number;
  dataUrl: string;
}

export interface QROptions {
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  type: 'image/png' | 'image/jpeg';
  quality: number;
  margin: number;
  color: {
    dark: string;
    light: string;
  };
  width: number;
}