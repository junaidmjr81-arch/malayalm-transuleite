import React, { useState } from 'react';
import { Screen } from '../types';
import { Code, Copy, Check, FileCode, Download, ExternalLink } from 'lucide-react';

interface CodeExportModalProps {
  screen: Screen;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({ screen }) => {
  const [copied, setCopied] = useState<boolean>(false);

  // Generate clean React + Tailwind code snippet
  const generateCode = () => {
    return `import React from 'react';

export default function ${screen.title.replace(/[^a-zA-Z0-9]/g, '')}Screen() {
  return (
    <div className="min-h-screen p-8 transition-colors" style={{ backgroundColor: '${screen.theme.backgroundColor}', color: '${screen.theme.textColor}' }}>
      <header className="max-w-6xl mx-auto mb-10 pb-4 border-b flex justify-between items-center" style={{ borderColor: '${screen.theme.isDarkMode ? '#334155' : '#e2e8f0'}' }}>
        <h1 className="text-xl font-bold tracking-tight">${screen.title}</h1>
        <span className="text-xs px-3 py-1 rounded-full font-bold text-white" style={{ backgroundColor: '${screen.theme.primaryColor}' }}>
          ${screen.category.toUpperCase()}
        </span>
      </header>

      <main className="max-w-6xl mx-auto space-y-12">
${screen.sections.map(sec => `
        {/* ${sec.title} (${sec.type.toUpperCase()}) */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">${sec.title}</h2>
          ${sec.subtitle ? `<p className="text-sm opacity-80">${sec.subtitle}</p>` : ''}
          ${sec.imageUrl ? `<img src="${sec.imageUrl}" alt="${sec.title}" className="w-full h-72 object-cover rounded-2xl shadow-lg" />` : ''}
          ${sec.items && sec.items.length > 0 ? `
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${sec.items.map(item => `
            <div className="p-5 border rounded-xl shadow-sm" style={{ backgroundColor: '${screen.theme.cardBg}', borderColor: '${screen.theme.isDarkMode ? '#334155' : '#e2e8f0'}' }}>
              ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.title}" className="w-full h-40 object-cover rounded-lg mb-3" />` : ''}
              <h3 className="font-bold text-sm mb-1">${item.title}</h3>
              ${item.description ? `<p className="text-xs opacity-75">${item.description}</p>` : ''}
            </div>`).join('')}
          </div>` : ''}
        </section>`).join('\n')}
      </main>
    </div>
  );
}`;
  };

  const codeSnippet = generateCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-6 md:p-10 text-slate-100 max-w-7xl mx-auto w-full space-y-6">
      
      {/* Header Bar */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              Export Screen Source Code
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Clean, production-ready React component formatted with Tailwind CSS utilities and hotlinked Unsplash assets.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Copied React Code!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy React + Tailwind Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Viewer Editor Frame */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="bg-slate-950 px-6 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2 font-mono">
            <FileCode className="w-4 h-4 text-blue-400" />
            <span>ScreenComponent.tsx</span>
          </div>
          <span className="font-mono text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-400 border border-slate-800">
            TypeScript JSX
          </span>
        </div>

        <pre className="p-6 text-xs font-mono text-blue-200 overflow-x-auto leading-relaxed max-h-[600px] selection:bg-blue-500 selection:text-white">
          {codeSnippet}
        </pre>
      </div>

    </div>
  );
};
