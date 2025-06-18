# QR Code Generator 🔗

A beautiful, modern QR code generator built with React, TypeScript, and Tailwind CSS. Generate, download, share, and manage QR codes with an elegant, production-ready interface.

![QR Code Generator Preview](https://simple-qr-code-generator-ten.vercel.app/)

## ✨ Features

### Core Functionality
- **Instant QR Generation**: Generate QR codes from any text or URL in real-time
- **Multiple Input Types**: Dedicated modes for text and URL input with smart detection
- **High-Quality Output**: Generate crisp, scalable QR codes optimized for scanning
- **Download Support**: Save QR codes as PNG files with customizable filenames

### User Experience
- **Dark Mode**: Beautiful dark theme with smooth transitions and system preference detection
- **History Management**: Local storage of recent QR codes with easy access and management
- **Copy to Clipboard**: One-click copying of QR codes as images
- **Native Sharing**: Web Share API integration for seamless sharing across platforms
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices

### Advanced Features
- **Smart URL Detection**: Automatically detects and highlights URLs in input
- **Loading States**: Smooth loading animations during QR generation
- **Error Handling**: Graceful error handling with user-friendly messages
- **Accessibility**: Full keyboard navigation and screen reader support
- **Performance Optimized**: Lazy loading and efficient re-rendering

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/qr-code-generator.git
   cd qr-code-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # App header with branding and dark mode toggle
│   ├── QRInput.tsx     # Input form for text/URL entry
│   ├── QRDisplay.tsx   # QR code display and action buttons
│   └── QRHistory.tsx   # History panel with saved QR codes
├── hooks/              # Custom React hooks
│   ├── useDarkMode.ts  # Dark mode state management
│   └── useQRHistory.ts # QR code history management
├── utils/              # Utility functions
│   └── qrGenerator.ts  # QR code generation and file operations
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared interfaces and types
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎨 Design System

### Color Palette
- **Primary**: Purple gradient (`#8B5CF6` to `#3B82F6`)
- **Secondary**: Blue (`#3B82F6`)
- **Success**: Green (`#10B981`)
- **Warning**: Orange (`#F59E0B`)
- **Error**: Red (`#EF4444`)
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Headings**: Inter font family with bold weights
- **Body**: Inter font family with regular weight
- **Code**: Monospace font for technical content

### Spacing System
- Based on 8px grid system
- Consistent spacing using Tailwind's spacing scale
- Responsive spacing that adapts to screen size

## 🔧 Configuration

### QR Code Options
The QR generator supports various customization options:

```typescript
interface QROptions {
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';  // Error correction level
  type: 'image/png' | 'image/jpeg';              // Output format
  quality: number;                               // Image quality (0-1)
  margin: number;                                // Margin around QR code
  color: {
    dark: string;                                // Foreground color
    light: string;                               // Background color
  };
  width: number;                                 // Output width in pixels
}
```

### Default Settings
```typescript
const DEFAULT_OPTIONS: QROptions = {
  errorCorrectionLevel: 'M',    // Medium error correction
  type: 'image/png',            // PNG format
  quality: 0.92,                // High quality
  margin: 1,                    // Minimal margin
  color: {
    dark: '#1F2937',           // Dark gray
    light: '#FFFFFF'           // White
  },
  width: 300                    // 300px width
};
```

## 📱 Browser Support

### Minimum Requirements
- **Chrome**: 88+
- **Firefox**: 85+
- **Safari**: 14+
- **Edge**: 88+

### Feature Support
- **Web Share API**: Chrome 89+, Safari 14+
- **Clipboard API**: Chrome 76+, Firefox 63+, Safari 13.1+
- **Local Storage**: All modern browsers
- **CSS Grid**: All modern browsers

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

### Development Guidelines

#### Component Structure
- Use functional components with TypeScript
- Implement proper prop interfaces
- Follow React hooks best practices
- Use custom hooks for shared logic

#### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Implement consistent spacing and typography
- Use CSS custom properties for theme values

#### State Management
- Use React hooks for local state
- Implement custom hooks for complex logic
- Use localStorage for persistence
- Follow immutable update patterns

## 🔒 Privacy & Security

### Data Handling
- **Local Processing**: All QR generation happens in the browser
- **No Server Communication**: No data is sent to external servers
- **Local Storage Only**: History is stored locally in browser storage
- **No Tracking**: No analytics or tracking implemented

### Security Features
- **Input Validation**: Proper validation of user input
- **XSS Prevention**: Safe handling of user-generated content
- **HTTPS Ready**: Designed for secure HTTPS deployment
- **CSP Compatible**: Compatible with Content Security Policy

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push to main branch

### Vercel
1. Import project from GitHub
2. Vercel will auto-detect Vite configuration
3. Deploy with zero configuration

### Manual Deployment
```bash
# Build the project
npm run build

# Upload the 'dist' folder to your web server
```

## 🤝 Contributing

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests and linting: `npm run lint`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style
- Follow existing code patterns
- Use TypeScript for type safety
- Write descriptive commit messages
- Add comments for complex logic
- Update documentation as needed

### Bug Reports
When reporting bugs, please include:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **QRCode.js**: Excellent QR code generation library
- **Lucide React**: Beautiful icon set
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and development server
- **React**: UI library for building user interfaces

## 📞 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs and request features via GitHub Issues
- **Discussions**: Join community discussions in GitHub Discussions

---

**Made with ❤️ for everyone who needs QR codes**

*Generate, download, and share QR codes with style and ease.*