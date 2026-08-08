import React, { useState } from 'react';
import { Category, Screen } from '../types';
import { 
  Sparkles, 
  X, 
  Loader2, 
  Wand2, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

interface AiGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScreenGenerated: (newScreen: Screen) => void;
}

const PRESET_PROMPTS = [
  {
    label: 'Dark Mode Web3 Crypto Wallet',
    prompt: 'A dark mode Web3 crypto portfolio screen with live token metrics, yield charts, and NFT cards.',
    category: 'dashboard'
  },
  {
    label: 'Minimalist Coffee Roastery Store',
    prompt: 'A clean artisan coffee storefront with espresso product cards, customer reviews, and roast selector.',
    category: 'ecommerce'
  },
  {
    label: 'AI Code Assistant Landing Page',
    prompt: 'A sleek SaaS landing page for an AI developer copilot with code terminal hero, benchmarks, and pricing.',
    category: 'hero'
  },
  {
    label: 'Creator Photography Portfolio',
    prompt: 'An elegant photography gallery screen with full-width hero photo, portrait grid, and booking form.',
    category: 'portfolio'
  }
];

export const AiGeneratorModal: React.FC<AiGeneratorModalProps> = ({
  isOpen,
  onClose,
  onScreenGenerated
}) => {
  const [prompt, setPrompt] = useState<string>('');
  const [category, setCategory] = useState<Category>('dashboard');
  const [themePreference, setThemePreference] = useState<'light' | 'dark'>('dark');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-screen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          screenCategory: category,
          theme: themePreference
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.details || data.error || 'Failed to generate screen');
      }

      onScreenGenerated(data.screen);
      onClose();
      setPrompt('');
    } catch (err: any) {
      console.error('Error generating screen:', err);
      setErrorMessage(err.message || 'Error generating screen with Gemini API');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 md:p-8 space-y-6 shadow-2xl text-slate-100 relative overflow-hidden">
        
        {/* Glow Header Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg tracking-tight text-white">
                AI Screen Copilot
              </h2>
              <p className="text-xs text-slate-400">
                Generate custom web screens with Gemini 3.6 & hotlinked Unsplash imagery
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Preset Prompt Chips */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Quick Design Inspiration
          </label>
          <div className="flex flex-wrap gap-2">
            {PRESET_PROMPTS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPrompt(preset.prompt);
                  setCategory(preset.category as Category);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs border border-slate-700 transition-colors text-left"
              >
                ✨ {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* User Prompt Textarea */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Describe Your Ideal Web Screen
          </label>
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. A modern SaaS analytics dashboard with revenue charts, active user table, and indigo primary buttons..."
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
          />
        </div>

        {/* Category & Theme Selectors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 capitalize"
            >
              <option value="dashboard">Dashboard</option>
              <option value="ecommerce">E-Commerce</option>
              <option value="hero">Hero Landing</option>
              <option value="social">Social Feed</option>
              <option value="portfolio">Portfolio</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Initial Theme Mode
            </label>
            <select
              value={themePreference}
              onChange={(e) => setThemePreference(e.target.value as 'light' | 'dark')}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option value="dark">Dark Canvas</option>
              <option value="light">Light Canvas</option>
            </select>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-xs shadow-xl shadow-purple-500/25 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Architecting Screen with Gemini AI...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              <span>Generate Screen Layout</span>
            </>
          )}
        </button>

      </div>
    </div>
  );
};
