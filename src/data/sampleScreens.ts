import { Screen } from '../types';

export const SAMPLE_SCREENS: Screen[] = [
  // 1. SaaS Dashboard Screen
  {
    id: 'screen-dashboard-1',
    title: 'Cloud Analytics & Revenue Dashboard',
    category: 'dashboard',
    description: 'Real-time subscription metrics, MRR growth charts, and customer conversion KPIs.',
    badgeText: 'SaaS Pro Layout',
    theme: {
      primaryColor: '#3b82f6', // Indigo Blue
      backgroundColor: '#f8fafc', // Slate 50
      textColor: '#0f172a', // Slate 900
      cardBg: '#ffffff',
      borderRadius: 'md',
      isDarkMode: false
    },
    sections: [
      {
        id: 'sec-dash-hero',
        type: 'hero',
        title: 'Welcome back, Alex!',
        subtitle: 'Here is what is happening across your SaaS workspaces today.',
        badge: 'Q3 Growth +24%',
        primaryActionText: 'Export Analytics',
        primaryActionTargetId: 'sec-dash-stats',
        secondaryActionText: 'Workspace Settings',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'sec-dash-stats',
        type: 'stats',
        title: 'Key Performance Indicators',
        subtitle: 'Updated 2 minutes ago',
        items: [
          {
            id: 'stat-1',
            title: 'Monthly Recurring Revenue',
            value: '$84,250',
            change: '+12.4% vs last mo',
            badge: 'MRR',
            tag: 'positive'
          },
          {
            id: 'stat-2',
            title: 'Active Subscriptions',
            value: '2,840',
            change: '+180 new today',
            badge: 'Users',
            tag: 'positive'
          },
          {
            id: 'stat-3',
            title: 'Net Churn Rate',
            value: '1.2%',
            change: '-0.4% improvement',
            badge: 'Health',
            tag: 'positive'
          },
          {
            id: 'stat-4',
            title: 'Average Order Value',
            value: '$296',
            change: '+5.1% YoY',
            badge: 'AOV',
            tag: 'neutral'
          }
        ]
      },
      {
        id: 'sec-dash-team',
        type: 'grid',
        title: 'Top Performing Workspaces',
        subtitle: 'Active user activity across enterprise teams',
        columns: 3,
        items: [
          {
            id: 'team-1',
            title: 'Acme Corp Design Team',
            description: '48 active seats • 1,240 API requests / hr',
            imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
            badge: 'Enterprise',
            buttonText: 'Inspect Workspace'
          },
          {
            id: 'team-2',
            title: 'Starlight Tech Marketing',
            description: '32 active seats • 890 API requests / hr',
            imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
            badge: 'Pro Tier',
            buttonText: 'Inspect Workspace'
          },
          {
            id: 'team-3',
            title: 'Vortex Global Studio',
            description: '95 active seats • 3,410 API requests / hr',
            imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
            badge: 'Scale Plan',
            buttonText: 'Inspect Workspace'
          }
        ]
      }
    ]
  },

  // 2. E-Commerce Screen
  {
    id: 'screen-ecommerce-1',
    title: 'Aura Lifestyle Storefront',
    category: 'ecommerce',
    description: 'High-converting product grid with featured hero slider and hotlinked product photography.',
    badgeText: 'E-Commerce Retail',
    theme: {
      primaryColor: '#10b981', // Emerald Green
      backgroundColor: '#fafafa',
      textColor: '#18181b',
      cardBg: '#ffffff',
      borderRadius: 'lg',
      isDarkMode: false
    },
    sections: [
      {
        id: 'sec-ecom-hero',
        type: 'hero',
        title: 'Next-Gen Audio & Wearables',
        subtitle: 'Experience spatial audio with precision engineering and 40-hour battery life.',
        badge: 'Summer Sale 30% Off',
        primaryActionText: 'Shop New Arrivals',
        secondaryActionText: 'View Specs',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'sec-ecom-products',
        type: 'grid',
        title: 'Featured Collection',
        subtitle: 'Handcrafted tech accessories designed for modern creators',
        columns: 4,
        items: [
          {
            id: 'prod-1',
            title: 'Aura Studio Wireless ANC',
            description: 'Active Noise Cancelling Headphones with HD Voice',
            price: '$249.00',
            rating: 4.9,
            imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
            badge: 'Bestseller',
            buttonText: 'Add to Cart'
          },
          {
            id: 'prod-2',
            title: 'Aura Pulse Smartwatch v2',
            description: 'Titanium bezel, OLED display, health tracking',
            price: '$199.00',
            rating: 4.8,
            imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
            badge: 'New',
            buttonText: 'Add to Cart'
          },
          {
            id: 'prod-3',
            title: 'Aura Runner Pro Edition',
            description: 'Breathable flyknit sneakers with responsive cushion',
            price: '$139.00',
            rating: 4.7,
            imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
            badge: 'Popular',
            buttonText: 'Add to Cart'
          },
          {
            id: 'prod-4',
            title: 'Aura Botanical Elixir Serum',
            description: 'Cold-pressed natural skin hydrator 50ml',
            price: '$68.00',
            rating: 5.0,
            imageUrl: 'https://images.unsplash.com/photo-1608248597263-00079e96033e?auto=format&fit=crop&w=800&q=80',
            badge: 'Organic',
            buttonText: 'Add to Cart'
          }
        ]
      }
    ]
  },

  // 3. SaaS Landing Screen
  {
    id: 'screen-hero-1',
    title: 'NovaAI Developer Platform Hero',
    category: 'hero',
    description: 'High-contrast conversion landing page featuring gradient background hotlinks and CTA banner.',
    badgeText: 'SaaS Landing Page',
    theme: {
      primaryColor: '#6366f1', // Indigo
      backgroundColor: '#090d16', // Dark Mode
      textColor: '#f1f5f9',
      cardBg: '#1e293b',
      borderRadius: 'md',
      isDarkMode: true
    },
    sections: [
      {
        id: 'sec-hero-main',
        type: 'hero',
        title: 'Ship Full-Stack AI Apps 10x Faster',
        subtitle: 'Unify model routing, serverless execution, and real-time streaming into one seamless API platform.',
        badge: '⚡ Powered by Gemini 3.6',
        primaryActionText: 'Start Free Trial',
        secondaryActionText: 'Read Documentation',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'sec-hero-features',
        type: 'features',
        title: 'Built for Modern Engineers',
        subtitle: 'Everything you need to deploy production-ready AI pipelines.',
        columns: 3,
        items: [
          {
            id: 'feat-1',
            title: 'Instant Edge Routing',
            description: 'Sub-10ms global model execution powered by cloud-native containers.',
            badge: 'Performance'
          },
          {
            id: 'feat-2',
            title: 'Automated Schema Guard',
            description: 'Strict TypeScript JSON schema validation out of the box.',
            badge: 'Security'
          },
          {
            id: 'feat-3',
            title: 'Live WebSocket Bus',
            description: 'Bidirectional streaming for voice, audio, and Live API modalities.',
            badge: 'Real-Time'
          }
        ]
      }
    ]
  },

  // 4. Mobile Social Screen
  {
    id: 'screen-social-1',
    title: 'Pulse Community Mobile Feed',
    category: 'social',
    description: 'Mobile social media layout with story avatars, hotlinked image posts, and community metrics.',
    badgeText: 'Mobile Feed',
    theme: {
      primaryColor: '#ec4899', // Pink
      backgroundColor: '#fdf2f8',
      textColor: '#831843',
      cardBg: '#ffffff',
      borderRadius: 'full',
      isDarkMode: false
    },
    sections: [
      {
        id: 'sec-soc-feed',
        type: 'feed',
        title: 'Community Activity Feed',
        subtitle: 'See what fellow creators are building and sharing right now',
        items: [
          {
            id: 'post-1',
            title: 'Elena Vance posted an update',
            description: 'Just wrapped up our new branding shoot for Nova Design Studio! What do you think of this neon lighting concept?',
            imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80',
            badge: '248 Likes • 32 Comments',
            buttonText: 'Like Post'
          },
          {
            id: 'post-2',
            title: 'Marcus Thorne shared a project',
            description: 'Upgraded our workspace with a new minimalist setup. Productivity is through the roof this week.',
            imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
            badge: '512 Likes • 89 Comments',
            buttonText: 'Like Post'
          }
        ]
      }
    ]
  },

  // 5. Portfolio Screen
  {
    id: 'screen-portfolio-1',
    title: 'Studio Minimal Portfolio Showcase',
    category: 'portfolio',
    description: 'Clean gallery layout showcasing creative design projects with rich visual hotlinks.',
    badgeText: 'Creative Portfolio',
    theme: {
      primaryColor: '#000000',
      backgroundColor: '#ffffff',
      textColor: '#111111',
      cardBg: '#f5f5f7',
      borderRadius: 'sm',
      isDarkMode: false
    },
    sections: [
      {
        id: 'sec-port-hero',
        type: 'profile',
        title: 'Sophia Chen',
        subtitle: 'Lead UX Architect & Digital Director crafting spatial interfaces for forward-thinking brands.',
        badge: 'Available for Q4 Commissions',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        primaryActionText: 'Get in Touch',
        secondaryActionText: 'Download CV'
      },
      {
        id: 'sec-port-grid',
        type: 'grid',
        title: 'Selected Works (2025 - 2026)',
        subtitle: 'Architectural, digital, and physical product design projects',
        columns: 2,
        items: [
          {
            id: 'work-1',
            title: 'Kinetic Glass Architecture',
            description: 'Facade engineering and spatial interior lighting for Tokyo Tech Center.',
            imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
            badge: 'Spatial Design'
          },
          {
            id: 'work-2',
            title: 'Aura Sound Spatial Experience',
            description: 'Industrial design and companion mobile interface for premium audio hardware.',
            imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
            badge: 'Industrial UX'
          }
        ]
      }
    ]
  }
];
