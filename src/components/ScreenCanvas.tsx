import React, { useState } from 'react';
import { 
  DeviceType, 
  Screen, 
  ScreenSection, 
  SectionItem 
} from '../types';
import { 
  ArrowUp, 
  ArrowDown, 
  Trash2, 
  Edit2, 
  Plus, 
  Image as ImageIcon, 
  Star, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles,
  Heart,
  MessageSquare,
  Share2,
  TrendingUp,
  X,
  Check
} from 'lucide-react';
import { HOTLINKS_LIBRARY } from '../data/hotlinksLibrary';

interface ScreenCanvasProps {
  screen: Screen;
  deviceType: DeviceType;
  onUpdateScreen: (updatedScreen: Screen) => void;
  onOpenHotlinkSelector?: (onSelect: (url: string) => void) => void;
}

export const ScreenCanvas: React.FC<ScreenCanvasProps> = ({
  screen,
  deviceType,
  onUpdateScreen,
  onOpenHotlinkSelector
}) => {
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [activeImagePickerSectionId, setActiveImagePickerSectionId] = useState<string | null>(null);
  const [activeImagePickerItemId, setActiveImagePickerItemId] = useState<string | null>(null);

  // Section movement helper
  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...screen.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    onUpdateScreen({ ...screen, sections: newSections });
  };

  // Section deletion
  const handleDeleteSection = (sectionId: string) => {
    const updatedSections = screen.sections.filter(s => s.id !== sectionId);
    onUpdateScreen({ ...screen, sections: updatedSections });
  };

  // Add new default section
  const handleAddSection = (type: ScreenSection['type']) => {
    const newSecId = `sec-${Date.now()}`;
    let newSec: ScreenSection = {
      id: newSecId,
      type,
      title: `New ${type.toUpperCase()} Section`,
      subtitle: 'Customize this section content or hotlinked imagery.',
      imageUrl: HOTLINKS_LIBRARY[Math.floor(Math.random() * HOTLINKS_LIBRARY.length)].url,
      items: [
        {
          id: `item-1-${Date.now()}`,
          title: 'Feature Item One',
          description: 'Add compelling description text here for your users.',
          imageUrl: HOTLINKS_LIBRARY[0].url,
          badge: 'New'
        },
        {
          id: `item-2-${Date.now()}`,
          title: 'Feature Item Two',
          description: 'High converting layout block configured for your web screen.',
          imageUrl: HOTLINKS_LIBRARY[1].url,
          badge: 'Pro'
        }
      ]
    };

    onUpdateScreen({
      ...screen,
      sections: [...screen.sections, newSec]
    });
  };

  // Section field update
  const handleUpdateSection = (sectionId: string, updates: Partial<ScreenSection>) => {
    const updatedSections = screen.sections.map(sec => {
      if (sec.id === sectionId) {
        return { ...sec, ...updates };
      }
      return sec;
    });
    onUpdateScreen({ ...screen, sections: updatedSections });
  };

  // Item field update
  const handleUpdateItem = (sectionId: string, itemId: string, updates: Partial<SectionItem>) => {
    const updatedSections = screen.sections.map(sec => {
      if (sec.id === sectionId && sec.items) {
        const updatedItems = sec.items.map(item => {
          if (item.id === itemId) {
            return { ...item, ...updates };
          }
          return item;
        });
        return { ...sec, items: updatedItems };
      }
      return sec;
    });
    onUpdateScreen({ ...screen, sections: updatedSections });
  };

  // Rounded corners mapping
  const getRadiusClass = (radius: string) => {
    switch (radius) {
      case 'none': return 'rounded-none';
      case 'sm': return 'rounded-sm';
      case 'md': return 'rounded-md';
      case 'lg': return 'rounded-2xl';
      case 'full': return 'rounded-3xl';
      default: return 'rounded-xl';
    }
  };

  // Device Frame Container Widths
  const getDeviceFrameClass = () => {
    switch (deviceType) {
      case 'mobile':
        return 'w-[390px] min-h-[780px] rounded-[48px] border-[12px] border-slate-900 shadow-2xl overflow-hidden mx-auto my-6 bg-slate-950 ring-1 ring-slate-800/50';
      case 'tablet':
        return 'w-[768px] min-h-[900px] rounded-[32px] border-[10px] border-slate-900 shadow-2xl overflow-hidden mx-auto my-6 bg-slate-950 ring-1 ring-slate-800/50';
      case 'desktop':
      default:
        return 'w-full max-w-6xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden mx-auto my-6 bg-slate-950';
    }
  };

  const cardRadiusClass = getRadiusClass(screen.theme.borderRadius);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-950 flex flex-col items-center min-h-[calc(100vh-4rem)]">
      
      {/* Device Frame Wrapper */}
      <div className={getDeviceFrameClass()}>
        
        {/* Fake Phone/Tablet Bezel Header (when mobile/tablet) */}
        {deviceType === 'mobile' && (
          <div className="bg-slate-900 text-slate-400 text-[10px] px-6 py-2 flex items-center justify-between border-b border-slate-800">
            <span className="font-semibold">9:41</span>
            <div className="w-20 h-4 bg-slate-950 rounded-full border border-slate-800"></div>
            <div className="flex items-center gap-1.5">
              <span>5G</span>
              <div className="w-4 h-2 rounded-sm border border-slate-400 bg-slate-400"></div>
            </div>
          </div>
        )}

        {/* Screen Header Bar */}
        <div 
          className="px-6 py-4 border-b flex items-center justify-between transition-colors"
          style={{ 
            backgroundColor: screen.theme.cardBg, 
            borderColor: screen.theme.isDarkMode ? '#334155' : '#e2e8f0',
            color: screen.theme.textColor
          }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: screen.theme.primaryColor }}
            />
            <h1 className="font-bold text-sm tracking-tight">{screen.title}</h1>
            {screen.badgeText && (
              <span 
                className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                style={{
                  backgroundColor: `${screen.theme.primaryColor}15`,
                  color: screen.theme.primaryColor
                }}
              >
                {screen.badgeText}
              </span>
            )}
          </div>
          <div className="text-xs text-slate-400 font-medium">
            Category: <span className="capitalize">{screen.category}</span>
          </div>
        </div>

        {/* Screen Body Container */}
        <div 
          className="p-6 md:p-10 space-y-12 transition-all min-h-[600px]"
          style={{ 
            backgroundColor: screen.theme.backgroundColor,
            color: screen.theme.textColor 
          }}
        >
          {screen.sections.map((section, idx) => (
            <div 
              key={section.id} 
              className="relative group rounded-xl p-2 transition-all hover:ring-2 hover:ring-blue-500/50"
            >
              {/* Floating Section Toolbar Controls */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-30 flex items-center gap-1 bg-slate-900/90 text-white p-1 rounded-lg border border-slate-700 shadow-lg backdrop-blur-md">
                <button
                  onClick={() => setEditingSectionId(editingSectionId === section.id ? null : section.id)}
                  title="Edit Section Info"
                  className="p-1 hover:bg-slate-800 rounded text-blue-400 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleMoveSection(idx, 'up')}
                  disabled={idx === 0}
                  title="Move Up"
                  className="p-1 hover:bg-slate-800 rounded text-slate-300 disabled:opacity-30 transition-colors"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleMoveSection(idx, 'down')}
                  disabled={idx === screen.sections.length - 1}
                  title="Move Down"
                  className="p-1 hover:bg-slate-800 rounded text-slate-300 disabled:opacity-30 transition-colors"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteSection(section.id)}
                  title="Delete Section"
                  className="p-1 hover:bg-slate-800 rounded text-rose-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* SECTION EDIT DRAWER / INLINE FORM */}
              {editingSectionId === section.id && (
                <div className="mb-6 p-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs space-y-3 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-blue-400 flex items-center gap-1.5">
                      <Edit2 className="w-3.5 h-3.5" /> Edit Section ({section.type})
                    </span>
                    <button 
                      onClick={() => setEditingSectionId(null)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 mb-1">Section Title</label>
                      <input 
                        type="text"
                        value={section.title}
                        onChange={(e) => handleUpdateSection(section.id, { title: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 mb-1">Subtitle / Description</label>
                      <input 
                        type="text"
                        value={section.subtitle || ''}
                        onChange={(e) => handleUpdateSection(section.id, { subtitle: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-semibold text-slate-400 mb-1">Hotlinked Image URL (Unsplash)</label>
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          value={section.imageUrl || ''}
                          onChange={(e) => handleUpdateSection(section.id, { imageUrl: e.target.value })}
                          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-blue-500"
                          placeholder="https://images.unsplash.com/..."
                        />
                        <button
                          onClick={() => setActiveImagePickerSectionId(activeImagePickerSectionId === section.id ? null : section.id)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-1"
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Browse</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* QUICK HOTLINK PICKER POPOVER */}
                  {activeImagePickerSectionId === section.id && (
                    <div className="mt-3 p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                      <div className="text-[11px] font-bold text-slate-300">Select Hotlink Image:</div>
                      <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto">
                        {HOTLINKS_LIBRARY.map((hl) => (
                          <div 
                            key={hl.id} 
                            onClick={() => {
                              handleUpdateSection(section.id, { imageUrl: hl.url });
                              setActiveImagePickerSectionId(null);
                            }}
                            className="relative group/hl cursor-pointer rounded-md overflow-hidden border border-slate-800 hover:border-blue-500"
                          >
                            <img src={hl.url} alt={hl.title} className="w-full h-12 object-cover" />
                            <div className="absolute inset-0 bg-blue-600/30 opacity-0 group-hover/hl:opacity-100 flex items-center justify-center transition-opacity">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* RENDER BASED ON SECTION TYPE */}
              
              {/* 1. HERO SECTION */}
              {section.type === 'hero' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    {section.badge && (
                      <span 
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: `${screen.theme.primaryColor}15`,
                          color: screen.theme.primaryColor
                        }}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        {section.badge}
                      </span>
                    )}
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                      {section.title}
                    </h2>
                    {section.subtitle && (
                      <p className="text-sm md:text-base opacity-80 leading-relaxed max-w-xl">
                        {section.subtitle}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      {section.primaryActionText && (
                        <button
                          className={`px-5 py-2.5 text-xs font-bold text-white shadow-lg transition-transform active:scale-95 ${cardRadiusClass}`}
                          style={{ backgroundColor: screen.theme.primaryColor }}
                        >
                          {section.primaryActionText}
                        </button>
                      )}
                      {section.secondaryActionText && (
                        <button
                          className={`px-5 py-2.5 text-xs font-semibold border transition-all hover:bg-slate-500/10 ${cardRadiusClass}`}
                          style={{ 
                            borderColor: screen.theme.isDarkMode ? '#475569' : '#cbd5e1',
                            color: screen.theme.textColor 
                          }}
                        >
                          {section.secondaryActionText}
                        </button>
                      )}
                    </div>
                  </div>

                  {section.imageUrl && (
                    <div className="relative group/img overflow-hidden shadow-2xl border border-slate-700/30 rounded-2xl">
                      <img 
                        src={section.imageUrl} 
                        alt={section.title}
                        className="w-full h-64 md:h-80 object-cover transform group-hover/img:scale-105 transition-transform duration-500" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-3 left-3 text-white text-[10px] bg-slate-900/80 px-2 py-1 rounded border border-slate-700/50 flex items-center gap-1">
                        <ImageIcon className="w-3 h-3 text-blue-400" />
                        <span>Hotlinked Unsplash Asset</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 2. STATS SECTION */}
              {section.type === 'stats' && (
                <div className="space-y-4">
                  {(section.title || section.subtitle) && (
                    <div>
                      <h3 className="text-lg font-bold tracking-tight">{section.title}</h3>
                      {section.subtitle && <p className="text-xs opacity-70">{section.subtitle}</p>}
                    </div>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {section.items?.map((item) => (
                      <div 
                        key={item.id}
                        className={`p-4 border transition-all hover:shadow-md ${cardRadiusClass}`}
                        style={{ 
                          backgroundColor: screen.theme.cardBg,
                          borderColor: screen.theme.isDarkMode ? '#334155' : '#e2e8f0'
                        }}
                      >
                        <div className="flex items-center justify-between text-[11px] opacity-70 mb-1">
                          <span>{item.title}</span>
                          {item.badge && (
                            <span 
                              className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase"
                              style={{
                                backgroundColor: `${screen.theme.primaryColor}20`,
                                color: screen.theme.primaryColor
                              }}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-2xl font-black tracking-tight my-1">{item.value}</div>
                        {item.change && (
                          <div className="text-[10px] font-semibold text-emerald-500 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            <span>{item.change}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. GRID SECTION (PRODUCTS / TEAMS / CARDS) */}
              {section.type === 'grid' && (
                <div className="space-y-4">
                  {(section.title || section.subtitle) && (
                    <div>
                      <h3 className="text-xl font-bold tracking-tight">{section.title}</h3>
                      {section.subtitle && <p className="text-xs opacity-70">{section.subtitle}</p>}
                    </div>
                  )}
                  <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${section.columns || 3} gap-6`}>
                    {section.items?.map((item) => (
                      <div 
                        key={item.id}
                        className={`overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${cardRadiusClass}`}
                        style={{ 
                          backgroundColor: screen.theme.cardBg,
                          borderColor: screen.theme.isDarkMode ? '#334155' : '#e2e8f0'
                        }}
                      >
                        <div>
                          {item.imageUrl && (
                            <div className="relative h-44 overflow-hidden bg-slate-900">
                              <img 
                                src={item.imageUrl} 
                                alt={item.title}
                                className="w-full h-full object-cover" 
                                referrerPolicy="no-referrer"
                              />
                              {item.badge && (
                                <span 
                                  className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full text-white shadow-md"
                                  style={{ backgroundColor: screen.theme.primaryColor }}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          )}
                          <div className="p-4 space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-sm">{item.title}</h4>
                              {item.price && (
                                <span className="font-black text-sm text-emerald-500">{item.price}</span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-xs opacity-75 leading-relaxed">{item.description}</p>
                            )}
                            {item.rating && (
                              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                                <Star className="w-3.5 h-3.5 fill-amber-400" />
                                <span>{item.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {item.buttonText && (
                          <div className="p-4 pt-0">
                            <button
                              className={`w-full py-2 text-xs font-bold text-white transition-opacity hover:opacity-90 ${cardRadiusClass}`}
                              style={{ backgroundColor: screen.theme.primaryColor }}
                            >
                              {item.buttonText}
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. FEATURES SECTION */}
              {section.type === 'features' && (
                <div className="space-y-6">
                  <div className="text-center max-w-2xl mx-auto space-y-2">
                    <h3 className="text-2xl font-black tracking-tight">{section.title}</h3>
                    {section.subtitle && <p className="text-xs opacity-75">{section.subtitle}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {section.items?.map((item) => (
                      <div 
                        key={item.id}
                        className={`p-5 border space-y-3 ${cardRadiusClass}`}
                        style={{ 
                          backgroundColor: screen.theme.cardBg,
                          borderColor: screen.theme.isDarkMode ? '#334155' : '#e2e8f0'
                        }}
                      >
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: screen.theme.primaryColor }}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-sm">{item.title}</h4>
                        <p className="text-xs opacity-75 leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. FEED SECTION */}
              {section.type === 'feed' && (
                <div className="max-w-xl mx-auto space-y-6">
                  <h3 className="text-lg font-bold tracking-tight">{section.title}</h3>
                  {section.items?.map((item) => (
                    <div 
                      key={item.id}
                      className={`border p-4 space-y-3 shadow-md ${cardRadiusClass}`}
                      style={{ 
                        backgroundColor: screen.theme.cardBg,
                        borderColor: screen.theme.isDarkMode ? '#334155' : '#e2e8f0'
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.imageUrl || HOTLINKS_LIBRARY[8].url} 
                          alt="Avatar" 
                          className="w-10 h-10 rounded-full object-cover border border-slate-700" 
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="font-bold text-xs">{item.title}</div>
                          <div className="text-[10px] opacity-60">Posted 10 mins ago</div>
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed opacity-85">{item.description}</p>
                      {item.imageUrl && (
                        <div className="rounded-xl overflow-hidden border border-slate-800">
                          <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-60 object-cover" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      <div className="flex items-center justify-between text-xs opacity-70 pt-2 border-t border-slate-700/30">
                        <button className="flex items-center gap-1 hover:text-pink-500">
                          <Heart className="w-4 h-4" />
                          <span>Like</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-500">
                          <MessageSquare className="w-4 h-4" />
                          <span>Comment</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-purple-500">
                          <Share2 className="w-4 h-4" />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 6. PROFILE SECTION */}
              {section.type === 'profile' && (
                <div 
                  className={`p-8 border flex flex-col md:flex-row items-center gap-6 ${cardRadiusClass}`}
                  style={{ 
                    backgroundColor: screen.theme.cardBg,
                    borderColor: screen.theme.isDarkMode ? '#334155' : '#e2e8f0'
                  }}
                >
                  {section.imageUrl && (
                    <img 
                      src={section.imageUrl} 
                      alt={section.title}
                      className="w-28 h-28 rounded-full object-cover shadow-xl ring-4 ring-blue-500/20" 
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="space-y-2 text-center md:text-left flex-1">
                    {section.badge && (
                      <span 
                        className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase"
                        style={{
                          backgroundColor: `${screen.theme.primaryColor}20`,
                          color: screen.theme.primaryColor
                        }}
                      >
                        {section.badge}
                      </span>
                    )}
                    <h2 className="text-2xl font-black">{section.title}</h2>
                    {section.subtitle && <p className="text-xs opacity-80 max-w-lg">{section.subtitle}</p>}
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                      {section.primaryActionText && (
                        <button 
                          className={`px-4 py-2 text-xs font-bold text-white ${cardRadiusClass}`}
                          style={{ backgroundColor: screen.theme.primaryColor }}
                        >
                          {section.primaryActionText}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>
          ))}

          {/* ADD SECTION TRIGGER BAR */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-400">Add New Section:</span>
            <button
              onClick={() => handleAddSection('hero')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3 h-3" /> Hero
            </button>
            <button
              onClick={() => handleAddSection('grid')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3 h-3" /> Grid Cards
            </button>
            <button
              onClick={() => handleAddSection('stats')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3 h-3" /> Stats
            </button>
            <button
              onClick={() => handleAddSection('features')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3 h-3" /> Features
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
