import React, { useState } from 'react';
import { HOTLINKS_LIBRARY } from '../data/hotlinksLibrary';
import { HotlinkAsset, Screen } from '../types';
import { 
  Image as ImageIcon, 
  Copy, 
  Check, 
  Search, 
  ExternalLink, 
  Plus, 
  Tag, 
  Sparkles,
  Layers
} from 'lucide-react';

interface HotlinkGalleryProps {
  screen: Screen;
  onUpdateScreen: (screen: Screen) => void;
  onNotification: (msg: string) => void;
}

export const HotlinkGallery: React.FC<HotlinkGalleryProps> = ({
  screen,
  onUpdateScreen,
  onNotification
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [targetSectionId, setTargetSectionId] = useState<string>(
    screen.sections[0]?.id || ''
  );

  const categories = [
    { id: 'all', label: 'All Hotlinks' },
    { id: 'ui-mockup', label: 'UI & Apps' },
    { id: 'tech', label: 'Tech & Workspace' },
    { id: 'ecommerce', label: 'Products' },
    { id: 'portraits', label: 'Avatars & Team' },
    { id: 'abstract', label: 'Abstract & Hero' },
    { id: 'backgrounds', label: 'Backgrounds' }
  ];

  const filteredAssets = HOTLINKS_LIBRARY.filter(asset => {
    const matchesCat = selectedCategory === 'all' || asset.category === selectedCategory;
    const matchesSearch = 
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    onNotification('Hotlink image URL copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleApplyToSection = (url: string) => {
    if (!targetSectionId) return;

    const updatedSections = screen.sections.map(sec => {
      if (sec.id === targetSectionId) {
        return { ...sec, imageUrl: url };
      }
      return sec;
    });

    onUpdateScreen({ ...screen, sections: updatedSections });
    onNotification(`Hotlinked image applied to section!`);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-6 md:p-10 text-slate-100 max-w-7xl mx-auto w-full space-y-8">
      
      {/* Header Info Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              Hotlinked Image Asset Library
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            High-resolution Unsplash photos hotlinked directly for fast web screen mockups, headers, and product cards.
          </p>
        </div>

        {/* Section Target Selector */}
        <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
          <Layers className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-semibold text-slate-300">Target Section:</span>
          <select
            value={targetSectionId}
            onChange={(e) => setTargetSectionId(e.target.value)}
            className="bg-slate-800 text-xs font-bold text-white rounded-lg px-3 py-1.5 border border-slate-700 focus:outline-none focus:border-blue-500"
          >
            {screen.sections.map(sec => (
              <option key={sec.id} value={sec.id}>
                {sec.title} ({sec.type})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Search hotlink tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAssets.map(asset => (
          <div 
            key={asset.id}
            className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
          >
            <div>
              {/* Image Container with Hover Actions */}
              <div className="relative h-48 bg-slate-950 overflow-hidden">
                <img 
                  src={asset.url} 
                  alt={asset.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4 backdrop-blur-xs">
                  <button
                    onClick={() => handleApplyToSection(asset.url)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1 shadow-lg"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Apply to Screen</span>
                  </button>
                  <a
                    href={asset.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs"
                    title="Open Source Hotlink"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <span className="absolute top-3 left-3 text-[10px] font-mono font-bold bg-slate-950/80 text-blue-400 px-2 py-0.5 rounded border border-slate-800">
                  {asset.aspectRatio}
                </span>
              </div>

              {/* Info Details */}
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-xs text-white line-clamp-1">{asset.title}</h3>
                
                {/* Tags list */}
                <div className="flex flex-wrap gap-1">
                  {asset.tags.map(tag => (
                    <span 
                      key={tag}
                      className="text-[9px] font-medium bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Copy Button */}
            <div className="p-4 pt-0">
              <button
                onClick={() => handleCopyUrl(asset.url, asset.id)}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700/80 transition-colors"
              >
                {copiedId === asset.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied Hotlink!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Hotlink URL</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
