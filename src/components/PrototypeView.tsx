import React, { useState } from 'react';
import { Screen } from '../types';
import { 
  Play, 
  ArrowRight, 
  Layers, 
  RefreshCw, 
  Smartphone, 
  Monitor, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface PrototypeViewProps {
  screens: Screen[];
  initialScreenId: string;
}

export const PrototypeView: React.FC<PrototypeViewProps> = ({
  screens,
  initialScreenId
}) => {
  const [currentScreenId, setCurrentScreenId] = useState<string>(initialScreenId);
  const [navHistory, setNavHistory] = useState<string[]>([initialScreenId]);

  const activeScreen = screens.find(s => s.id === currentScreenId) || screens[0];

  const handleNavigate = (targetScreenId: string) => {
    setCurrentScreenId(targetScreenId);
    setNavHistory(prev => [...prev, targetScreenId]);
  };

  const handleResetFlow = () => {
    setCurrentScreenId(initialScreenId);
    setNavHistory([initialScreenId]);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-6 md:p-10 text-slate-100 max-w-7xl mx-auto w-full space-y-8">
      
      {/* Header Bar */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-emerald-400 fill-emerald-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              Interactive Screen Prototype Flow
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Click interactive components on screen to simulate realistic user navigation and app flow.
          </p>
        </div>

        {/* Prototype Flow Control Bar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 font-semibold">Active:</span>
            <span className="font-bold text-blue-400">{activeScreen.title}</span>
          </div>

          <button
            onClick={handleResetFlow}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Flow</span>
          </button>
        </div>
      </div>

      {/* Screen Flow Map Breadcrumbs */}
      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Flow Path:</span>
        {navHistory.map((id, index) => {
          const s = screens.find(sc => sc.id === id);
          return (
            <React.Fragment key={index}>
              {index > 0 && <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />}
              <button
                onClick={() => setCurrentScreenId(id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  currentScreenId === id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                }`}
              >
                {s?.title || id}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Prototype Interactive Canvas */}
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 space-y-8 shadow-2xl">
        
        {/* Interactive Screen Box */}
        <div 
          className="rounded-2xl p-6 md:p-10 space-y-8 border shadow-xl transition-all"
          style={{
            backgroundColor: activeScreen.theme.backgroundColor,
            color: activeScreen.theme.textColor,
            borderColor: activeScreen.theme.isDarkMode ? '#334155' : '#e2e8f0'
          }}
        >
          <div className="flex items-center justify-between border-b pb-4 border-slate-700/20">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="font-bold text-sm tracking-tight">{activeScreen.title}</h2>
            </div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-500">
              Live Prototype Mode
            </span>
          </div>

          {/* Interactive Sections Render */}
          {activeScreen.sections.map(sec => (
            <div key={sec.id} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold tracking-tight">{sec.title}</h3>
                {sec.subtitle && <p className="text-xs opacity-75">{sec.subtitle}</p>}
              </div>

              {sec.imageUrl && (
                <div className="rounded-xl overflow-hidden border border-slate-700/30">
                  <img src={sec.imageUrl} alt={sec.title} className="w-full h-64 object-cover" referrerPolicy="no-referrer" />
                </div>
              )}

              {/* Action Buttons to test Screen Transitions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {screens.map(targetSc => (
                  <button
                    key={targetSc.id}
                    onClick={() => handleNavigate(targetSc.id)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-md hover:scale-105 active:scale-95 flex items-center gap-1.5"
                    style={{ backgroundColor: activeScreen.theme.primaryColor }}
                  >
                    <span>Navigate to {targetSc.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
