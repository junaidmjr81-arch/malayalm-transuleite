import React, { useState } from 'react';
import { Screen, DeviceType, ActiveTab } from './types';
import { SAMPLE_SCREENS } from './data/sampleScreens';
import { Header } from './components/Header';
import { ScreenCanvas } from './components/ScreenCanvas';
import { ScreenCustomizer } from './components/ScreenCustomizer';
import { HotlinkGallery } from './components/HotlinkGallery';
import { AiGeneratorModal } from './components/AiGeneratorModal';
import { PrototypeView } from './components/PrototypeView';
import { CodeExportModal } from './components/CodeExportModal';
import { HOTLINKS_LIBRARY } from './data/hotlinksLibrary';
import { Layers, Plus, CheckCircle2, Sparkles, Wand2 } from 'lucide-react';

export default function App() {
  const [screens, setScreens] = useState<Screen[]>(SAMPLE_SCREENS);
  const [activeScreenId, setActiveScreenId] = useState<string>(SAMPLE_SCREENS[0].id);
  const [activeTab, setActiveTab] = useState<ActiveTab>('templates');
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeScreen = screens.find(s => s.id === activeScreenId) || screens[0];

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateActiveScreen = (updatedScreen: Screen) => {
    setScreens(prev => prev.map(s => s.id === updatedScreen.id ? updatedScreen : s));
  };

  const handleCreateNewBlankScreen = () => {
    const newId = `screen-custom-${Date.now()}`;
    const newScreen: Screen = {
      id: newId,
      title: 'Untitled Custom Screen',
      category: 'custom',
      description: 'Newly created screen layout template.',
      badgeText: 'Draft',
      theme: {
        primaryColor: '#3b82f6',
        backgroundColor: '#0f172a',
        textColor: '#f8fafc',
        cardBg: '#1e293b',
        borderRadius: 'md',
        isDarkMode: true
      },
      sections: [
        {
          id: `sec-hero-${Date.now()}`,
          type: 'hero',
          title: 'Design Your Custom Screen',
          subtitle: 'Add sections, pick Unsplash hotlinked imagery, and customize brand theme colors.',
          badge: 'New Blank Screen',
          primaryActionText: 'Customize Section',
          imageUrl: HOTLINKS_LIBRARY[0].url
        }
      ]
    };

    setScreens(prev => [newScreen, ...prev]);
    setActiveScreenId(newId);
    showNotification('New blank screen created!');
  };

  const handleScreenGeneratedByAi = (generatedScreen: Screen) => {
    setScreens(prev => [generatedScreen, ...prev]);
    setActiveScreenId(generatedScreen.id);
    showNotification(`✨ AI generated screen "${generatedScreen.title}" successfully!`);
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeScreen, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${activeScreen.title.toLowerCase().replace(/\s+/g, '-')}-screen.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification('Screen JSON config downloaded!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-500 selection:text-white">
      
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 border border-blue-500/50 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main App Navigation Header */}
      <Header 
        screens={screens}
        activeScreenId={activeScreenId}
        onSelectScreen={setActiveScreenId}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        deviceType={deviceType}
        onSelectDevice={setDeviceType}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onNewScreen={handleCreateNewBlankScreen}
        onExportJson={handleExportJson}
      />

      {/* Main Body Layout View */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* VIEW 1: TEMPLATES / SCREEN CANVAS */}
        {activeTab === 'templates' && (
          <div className="flex-1 flex overflow-hidden">
            
            {/* Left Screen Selector Sidebar */}
            <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4 space-y-4 hidden md:flex flex-col h-[calc(100vh-4rem)]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Screens ({screens.length})
                </span>
                <button
                  onClick={handleCreateNewBlankScreen}
                  className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 transition-colors"
                  title="Add Blank Screen"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2 overflow-y-auto flex-1">
                {screens.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setActiveScreenId(s.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all text-xs space-y-1 ${
                      s.id === activeScreenId
                        ? 'bg-blue-600/10 border-blue-500 text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold truncate text-slate-200">{s.title}</span>
                      <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-800 text-blue-400">
                        {s.category}
                      </span>
                    </div>
                    <p className="text-[10px] opacity-70 line-clamp-1">{s.description}</p>
                  </button>
                ))}
              </div>

              {/* AI Quick Button in Sidebar */}
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 hover:brightness-110 transition-all"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>AI Generate Screen</span>
              </button>
            </aside>

            {/* Screen Canvas Renderer */}
            <ScreenCanvas
              screen={activeScreen}
              deviceType={deviceType}
              onUpdateScreen={handleUpdateActiveScreen}
            />
          </div>
        )}

        {/* VIEW 2: CUSTOMIZER SIDEBAR VIEW */}
        {activeTab === 'customizer' && (
          <div className="flex-1 flex overflow-hidden">
            <ScreenCanvas
              screen={activeScreen}
              deviceType={deviceType}
              onUpdateScreen={handleUpdateActiveScreen}
            />
            <ScreenCustomizer
              screen={activeScreen}
              onUpdateScreen={handleUpdateActiveScreen}
              onClose={() => setActiveTab('templates')}
            />
          </div>
        )}

        {/* VIEW 3: HOTLINKS GALLERY */}
        {activeTab === 'hotlinks' && (
          <HotlinkGallery
            screen={activeScreen}
            onUpdateScreen={handleUpdateActiveScreen}
            onNotification={showNotification}
          />
        )}

        {/* VIEW 4: INTERACTIVE PROTOTYPE */}
        {activeTab === 'prototype' && (
          <PrototypeView
            screens={screens}
            initialScreenId={activeScreenId}
          />
        )}

        {/* VIEW 5: CODE EXPORT */}
        {activeTab === 'code-export' && (
          <CodeExportModal
            screen={activeScreen}
          />
        )}

      </div>

      {/* AI Screen Generator Modal */}
      <AiGeneratorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onScreenGenerated={handleScreenGeneratedByAi}
      />

    </div>
  );
}
