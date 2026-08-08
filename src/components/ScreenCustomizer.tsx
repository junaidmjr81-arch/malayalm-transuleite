import React from 'react';
import { Screen, ThemeConfig } from '../types';
import { 
  Palette, 
  Sun, 
  Moon, 
  Sliders, 
  Type, 
  Square, 
  Circle, 
  Layers, 
  Trash2, 
  X,
  Check
} from 'lucide-react';

interface ScreenCustomizerProps {
  screen: Screen;
  onUpdateScreen: (screen: Screen) => void;
  onClose: () => void;
}

const PRESET_COLORS = [
  '#3b82f6', // Indigo Blue
  '#6366f1', // Vibrant Purple/Indigo
  '#10b981', // Emerald Green
  '#ec4899', // Pink
  '#f59e0b', // Amber/Orange
  '#8b5cf6', // Violet
  '#06b6d4', // Cyan
  '#000000', // Black
];

export const ScreenCustomizer: React.FC<ScreenCustomizerProps> = ({
  screen,
  onUpdateScreen,
  onClose
}) => {
  const { theme } = screen;

  const handleUpdateTheme = (updates: Partial<ThemeConfig>) => {
    onUpdateScreen({
      ...screen,
      theme: { ...theme, ...updates }
    });
  };

  const handleToggleDarkMode = () => {
    const nextIsDark = !theme.isDarkMode;
    handleUpdateTheme({
      isDarkMode: nextIsDark,
      backgroundColor: nextIsDark ? '#0f172a' : '#f8fafc',
      textColor: nextIsDark ? '#f8fafc' : '#0f172a',
      cardBg: nextIsDark ? '#1e293b' : '#ffffff'
    });
  };

  return (
    <div className="w-80 bg-slate-900 border-l border-slate-800 text-slate-200 h-[calc(100vh-4rem)] overflow-y-auto p-5 space-y-6 shadow-2xl">
      
      {/* Drawer Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-blue-400" />
          <h2 className="font-bold text-sm text-white">Screen Customizer</h2>
        </div>
        <button 
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Screen Meta Details */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Screen Title
        </label>
        <input 
          type="text"
          value={screen.title}
          onChange={(e) => onUpdateScreen({ ...screen, title: e.target.value })}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
        />

        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Category
        </label>
        <select
          value={screen.category}
          onChange={(e) => onUpdateScreen({ ...screen, category: e.target.value as any })}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-medium capitalize"
        >
          <option value="dashboard">Dashboard</option>
          <option value="ecommerce">E-Commerce</option>
          <option value="hero">Hero Landing</option>
          <option value="social">Social Feed</option>
          <option value="portfolio">Portfolio</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      {/* Primary Brand Color Selection */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
          <span>Primary Accent Color</span>
          <span className="font-mono text-[10px] text-slate-500">{theme.primaryColor}</span>
        </label>
        <div className="grid grid-cols-4 gap-2">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => handleUpdateTheme({ primaryColor: color })}
              className="w-full h-9 rounded-lg flex items-center justify-center border border-slate-700 hover:scale-105 transition-transform"
              style={{ backgroundColor: color }}
            >
              {theme.primaryColor === color && (
                <Check className="w-4 h-4 text-white drop-shadow-md" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Dark / Light Mode Toggle */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Theme Mode
        </label>
        <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={handleToggleDarkMode}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
              !theme.isDarkMode
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Light</span>
          </button>
          <button
            onClick={handleToggleDarkMode}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
              theme.isDarkMode
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Dark</span>
          </button>
        </div>
      </div>

      {/* Border Radius Style */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Corner Radius
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { label: 'Square', value: 'none' },
            { label: 'Sm', value: 'sm' },
            { label: 'Md', value: 'md' },
            { label: 'Pill', value: 'lg' }
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => handleUpdateTheme({ borderRadius: item.value })}
              className={`py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                theme.borderRadius === item.value
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Background & Card Color Options */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Custom Background Color
        </label>
        <div className="flex gap-2">
          <input 
            type="color"
            value={theme.backgroundColor}
            onChange={(e) => handleUpdateTheme({ backgroundColor: e.target.value })}
            className="w-10 h-9 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer"
          />
          <input 
            type="text"
            value={theme.backgroundColor}
            onChange={(e) => handleUpdateTheme({ backgroundColor: e.target.value })}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Card Container Fill
        </label>
        <div className="flex gap-2">
          <input 
            type="color"
            value={theme.cardBg}
            onChange={(e) => handleUpdateTheme({ cardBg: e.target.value })}
            className="w-10 h-9 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer"
          />
          <input 
            type="text"
            value={theme.cardBg}
            onChange={(e) => handleUpdateTheme({ cardBg: e.target.value })}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
          />
        </div>
      </div>

      {/* Sections Overview List */}
      <div className="pt-4 border-t border-slate-800 space-y-3">
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
          <span>Screen Structure ({screen.sections.length})</span>
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {screen.sections.map((sec, i) => (
            <div 
              key={sec.id}
              className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/80 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="w-5 h-5 rounded bg-slate-700 text-slate-300 font-bold text-[10px] flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="font-semibold text-white truncate">{sec.title}</span>
              </div>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-slate-900 text-blue-400 rounded border border-slate-700">
                {sec.type}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
