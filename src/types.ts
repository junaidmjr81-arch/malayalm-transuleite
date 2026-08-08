export type Category = 'dashboard' | 'ecommerce' | 'hero' | 'social' | 'portfolio' | 'custom';

export type DeviceType = 'desktop' | 'tablet' | 'mobile';

export type ActiveTab = 'templates' | 'customizer' | 'hotlinks' | 'ai-generator' | 'prototype' | 'code-export';

export interface ThemeConfig {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  cardBg: string;
  borderRadius: string; // 'none' | 'sm' | 'md' | 'lg' | 'full'
  fontFamily?: string;
  isDarkMode?: boolean;
}

export interface SectionItem {
  id: string;
  title: string;
  description?: string;
  value?: string;
  change?: string;
  imageUrl?: string;
  badge?: string;
  price?: string;
  rating?: number;
  buttonText?: string;
  tag?: string;
  linkToScreenId?: string;
}

export interface ScreenSection {
  id: string;
  type: 'hero' | 'stats' | 'grid' | 'banner' | 'testimonials' | 'pricing' | 'features' | 'profile' | 'feed';
  title: string;
  subtitle?: string;
  imageUrl?: string;
  badge?: string;
  items?: SectionItem[];
  primaryActionText?: string;
  primaryActionTargetId?: string;
  secondaryActionText?: string;
  secondaryActionTargetId?: string;
  columns?: number; // 2, 3, 4
}

export interface Screen {
  id: string;
  title: string;
  category: Category;
  description: string;
  badgeText?: string;
  theme: ThemeConfig;
  sections: ScreenSection[];
  createdAt?: string;
  isFavorite?: boolean;
}

export interface HotlinkAsset {
  id: string;
  title: string;
  url: string;
  category: 'ui-mockup' | 'tech' | 'ecommerce' | 'portraits' | 'abstract' | 'backgrounds' | 'nature';
  aspectRatio: string;
  tags: string[];
  dimensions?: string;
}
