import React from 'react';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Sparkles, 
  Palette, 
  Image as ImageIcon, 
  Play, 
  Code, 
  Plus, 
  Layers,
  Download,
  Share2
} from 'lucide-react';
import { ActiveTab, DeviceType, Screen } from '../types';

interface HeaderProps {
  screens: Screen[];
  activeScreenId: string;
  onSelectScreen: (id: string) => void;
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  deviceType: DeviceType;
  onSelectDevice: (device: DeviceType) => void;
  onOpenAiModal: () => void;
  onNewScreen: () => void;
  onExportJson: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  screens,
  activeScreenId,
  onSelectScreen,
  activeTab,
  onSelectTab,
  deviceType,
  onSelectDevice,
  onOpenAiModal,
  onNewScreen,
  onExportJson
}) => {
  const activeScreen = screens.find(s => s.id === activeScreenId);

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Screen Title Dropdown */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-pink-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
                  AppScreen Studio
                </span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Hotlink Pro
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Multi-Screen Web App & UI Builder
              </p>
            </div>

            {/* Active Screen Selector */}
            <div className="hidden md:flex items-center ml-4 pl-4 border-l border-slate-800">
              <select
                value={activeScreenId}
                onChange={(e) => onSelectScreen(e.target.value)}
                className="bg-slate-800 text-slate-200 text-xs font-semibold rounded-lg px-3 py-1.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-slate-600 cursor-pointer transition-colors"
              >
                {screens.map((screen) => (
                  <option key={screen.id} value={screen.id}>
                    {screen.title} ({screen.category})
                  </option>
                ))}
              </select>
              <button
                onClick={onNewScreen}
                title="Create blank screen"
                className="ml-2 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800/80">
            <button
              onClick={() => onSelectTab('templates')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'templates'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Screens</span>
            </button>

            <button
              onClick={() => onSelectTab('customizer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'customizer'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Customize</span>
            </button>

            <button
              onClick={() => onSelectTab('hotlinks')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'hotlinks'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Hotlinks</span>
            </button>

            <button
              onClick={() => onSelectTab('prototype')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'prototype'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>Prototype</span>
            </button>

            <button
              onClick={() => onSelectTab('code-export')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'code-export'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Export Code</span>
            </button>
          </nav>

          {/* Device Frames & Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Device Frame View Switches */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => onSelectDevice('desktop')}
                title="Desktop View"
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  deviceType === 'desktop'
                    ? 'bg-slate-800 text-blue-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectDevice('tablet')}
                title="Tablet View"
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  deviceType === 'tablet'
                    ? 'bg-slate-800 text-blue-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectDevice('mobile')}
                title="Mobile View"
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  deviceType === 'mobile'
                    ? 'bg-slate-800 text-blue-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            {/* AI Generator Trigger Button */}
            <button
              onClick={onOpenAiModal}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xs font-semibold shadow-lg shadow-purple-500/25 hover:brightness-110 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">AI Generate Screen</span>
            </button>

            {/* Export JSON config */}
            <button
              onClick={onExportJson}
              title="Export Screen JSON"
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
