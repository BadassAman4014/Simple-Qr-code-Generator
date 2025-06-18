import QRCode from 'qrcode';
import { QROptions } from '../types';

const DEFAULT_OPTIONS: QROptions = {
  errorCorrectionLevel: 'M',
  type: 'image/png',
  quality: 0.92,
  margin: 1,
  color: {
    dark: '#1F2937',
    light: '#FFFFFF'
  },
  width: 300
};

export const generateQRCode = async (
  text: string, 
  options: Partial<QROptions> = {}
): Promise<string> => {
  const finalOptions = { ...DEFAULT_OPTIONS, ...options };
  
  try {
    const dataUrl = await QRCode.toDataURL(text, finalOptions);
    return dataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

export const downloadQRCode = (dataUrl: string, filename: string = 'qrcode.png') => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const copyToClipboard = async (dataUrl: string): Promise<boolean> => {
  try {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    
    await navigator.clipboard.write([
      new ClipboardItem({ [blob.type]: blob })
    ]);
    
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
};

export const shareQRCode = async (dataUrl: string, text: string): Promise<boolean> => {
  if (!navigator.share) {
    return false;
  }

  try {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const file = new File([blob], 'qrcode.png', { type: blob.type });

    await navigator.share({
      title: 'QR Code',
      text: `QR Code for: ${text}`,
      files: [file]
    });

    return true;
  } catch (error) {
    console.error('Error sharing QR code:', error);
    return false;
  }
};