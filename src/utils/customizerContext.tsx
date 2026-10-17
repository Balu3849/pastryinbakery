import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteTheme, SiteContent } from '../types';

export const DEFAULT_THEME: SiteTheme = {
  primaryColor: '#A6241D', // Crimson Patisserie Red
  primaryHoverColor: '#841812',
  secondaryColor: '#30683B', // Pistachio Sage
  secondaryLightColor: '#EBF4ED',
  backgroundColor: '#FAF7F2', // Warm Bakery Cream
  surfaceColor: '#FFFFFF',
  textColor: '#29221F', // Warm Cocoa
  mutedTextColor: '#5A4E48',
  headingFont: 'Playfair Display',
  bodyFont: 'Plus Jakarta Sans',
  headingScale: 1.0,
  borderRadius: '12px',
  navButtonBg: '#b8a3a3', // Soft Rose-Mauve matching user preference
  navButtonTextColor: '#201614',
};

export const THEME_PRESETS: Array<{
  id: string;
  name: string;
  description: string;
  theme: Partial<SiteTheme>;
}> = [
  {
    id: 'crimson-sage',
    name: 'Crimson Patisserie & Pistachio Sage',
    description: 'Classic bakery boldness with crimson red and rich herbal sage accents.',
    theme: {
      primaryColor: '#A6241D',
      primaryHoverColor: '#841812',
      secondaryColor: '#30683B',
      secondaryLightColor: '#EBF4ED',
      backgroundColor: '#FAF7F2',
      surfaceColor: '#FFFFFF',
      textColor: '#29221F',
      mutedTextColor: '#5A4E48',
      headingFont: 'Playfair Display',
      bodyFont: 'Plus Jakarta Sans',
    },
  },
  {
    id: 'honey-buttercream',
    name: 'Warm Buttercream & Golden Honey',
    description: 'Fresh warm morning croissants, whipped honey buttercream, and golden sun.',
    theme: {
      primaryColor: '#C86D51',
      primaryHoverColor: '#B3583C',
      secondaryColor: '#D97706',
      secondaryLightColor: '#FEF3C7',
      backgroundColor: '#FAF6EF',
      surfaceColor: '#FFFFFF',
      textColor: '#2A1F1B',
      mutedTextColor: '#63534C',
      headingFont: 'Cormorant Garamond',
      bodyFont: 'Plus Jakarta Sans',
    },
  },
  {
    id: 'parisian-rose',
    name: 'Royal Parisian Rose & Champagne',
    description: 'Opulent French salon aesthetics with berry rose and champagne gold.',
    theme: {
      primaryColor: '#BE123C',
      primaryHoverColor: '#9F1239',
      secondaryColor: '#D97706',
      secondaryLightColor: '#FFF1F2',
      backgroundColor: '#FFF9F7',
      surfaceColor: '#FFFFFF',
      textColor: '#24141E',
      mutedTextColor: '#604D57',
      headingFont: 'Cinzel',
      bodyFont: 'Outfit',
    },
  },
  {
    id: 'dark-truffle',
    name: 'Belgian Dark Truffle & Espresso',
    description: 'Deep 70% dark chocolate ganache, roasted espresso beans, and warm cedar.',
    theme: {
      primaryColor: '#542316',
      primaryHoverColor: '#3D170D',
      secondaryColor: '#C25E00',
      secondaryLightColor: '#FDF4EB',
      backgroundColor: '#F7F3EE',
      surfaceColor: '#FFFFFF',
      textColor: '#1E120D',
      mutedTextColor: '#59463F',
      headingFont: 'Merriweather',
      bodyFont: 'Inter',
    },
  },
  {
    id: 'matcha-garden',
    name: 'Pistachio Grove & Kyoto Matcha',
    description: 'Refreshing botanic greens, organic tea notes, and crisp linen backdrop.',
    theme: {
      primaryColor: '#2D5A27',
      primaryHoverColor: '#1F3F1B',
      secondaryColor: '#5C8A53',
      secondaryLightColor: '#EFF7ED',
      backgroundColor: '#F5F8F4',
      surfaceColor: '#FFFFFF',
      textColor: '#192618',
      mutedTextColor: '#475C46',
      headingFont: 'Outfit',
      bodyFont: 'Plus Jakarta Sans',
    },
  },
  {
    id: 'modern-boutique',
    name: 'Contemporary Monochrome & Red Accent',
    description: 'Clean architectural luxury, high contrast, and crisp editorial geometry.',
    theme: {
      primaryColor: '#111827',
      primaryHoverColor: '#000000',
      secondaryColor: '#DC2626',
      secondaryLightColor: '#FEE2E2',
      backgroundColor: '#FAFAFA',
      surfaceColor: '#FFFFFF',
      textColor: '#111827',
      mutedTextColor: '#4B5563',
      headingFont: 'Montserrat',
      bodyFont: 'Inter',
    },
  },
  {
    id: 'handcrafted-script',
    name: 'Artisanal Handcrafted Signature',
    description: 'Charming calligraphic signature script and romantic hearth warmth.',
    theme: {
      primaryColor: '#991B1B',
      primaryHoverColor: '#7F1D1D',
      secondaryColor: '#D97706',
      secondaryLightColor: '#FEF3C7',
      backgroundColor: '#FAF7F2',
      surfaceColor: '#FFFFFF',
      textColor: '#29221F',
      mutedTextColor: '#5A4E48',
      headingFont: 'Great Vibes',
      bodyFont: 'Plus Jakarta Sans',
    },
  },
];

export const FONT_OPTIONS: Array<{
  id: string;
  name: string;
  category: 'Serif' | 'Sans' | 'Script';
  fontFamily: string;
  sample: string;
}> = [
  { id: 'Playfair Display', name: 'Playfair Display', category: 'Serif', fontFamily: "'Playfair Display', Georgia, serif", sample: 'Classic French Patisserie' },
  { id: 'Cormorant Garamond', name: 'Cormorant Garamond', category: 'Serif', fontFamily: "'Cormorant Garamond', Georgia, serif", sample: 'Fine Dining Elegance' },
  { id: 'Cinzel', name: 'Cinzel', category: 'Serif', fontFamily: "'Cinzel', serif", sample: 'Imperial Royal Bakery' },
  { id: 'Merriweather', name: 'Merriweather', category: 'Serif', fontFamily: "'Merriweather', Georgia, serif", sample: 'Warm Literary Hearth' },
  { id: 'Montserrat', name: 'Montserrat', category: 'Sans', fontFamily: "'Montserrat', sans-serif", sample: 'Modern Geometric Bold' },
  { id: 'Plus Jakarta Sans', name: 'Plus Jakarta Sans', category: 'Sans', fontFamily: "'Plus Jakarta Sans', sans-serif", sample: 'Clean Fresh Contemporary' },
  { id: 'Outfit', name: 'Outfit', category: 'Sans', fontFamily: "'Outfit', sans-serif", sample: 'Chic Boutique Design' },
  { id: 'Inter', name: 'Inter', category: 'Sans', fontFamily: "'Inter', sans-serif", sample: 'Crisp Architectural Sans' },
  { id: 'Great Vibes', name: 'Great Vibes', category: 'Script', fontFamily: "'Great Vibes', cursive", sample: 'Handcrafted Signature Script' },
];

export const BODY_FONT_OPTIONS = [
  { id: 'Plus Jakarta Sans', name: 'Plus Jakarta Sans (Recommended)' },
  { id: 'Inter', name: 'Inter (Crisp & Readable)' },
  { id: 'Outfit', name: 'Outfit (Friendly & Chic)' },
  { id: 'Montserrat', name: 'Montserrat (Modern Bold)' },
];

export const DEFAULT_CONTENT: SiteContent = {
  brandName: 'PASTRY INN',
  brandTagline: 'Artisanal Patisserie · Annavaram & Kakinada Region · Since 2017',
  heroHeadline: 'Pure butter viennoiserie, decadent truffles & celebration cakes.',
  heroDescription: 'Welcome to PASTRY INN, the beloved highway stop on NH-16. From rich Belgian chocolate gateaux and flaky morning croissants to savory puffs and artisanal coffee, everything is baked fresh with whole ingredients and pure vegetarian care.',
  topRibbonText: 'Oven Fresh Daily · Annavaram (NH-16) & Tuni (GNT Road) · Open Daily 8:30 AM – 10:30 PM',
  ctaExploreText: 'Explore Daily Menu',
  ctaQrText: 'Scan QR Table Menu',
  ctaWhatsappText: 'Order on WhatsApp',
  phone: '09666351333',
  displayPhone: '+91 96663 51333',
  addressHeadline: 'Opposite NVR Complex, National Highway 16, Annavaram',
  menuSectionTitle: 'Artisan Menu & Live Bakery Counter',
  menuSectionSubtitle: 'Handcrafted daily with pure Irish & European-style cultured butter, Belgian single-origin chocolate, and stone-ground flours.',
  loyaltyTitle: 'Pastry In Club',
};

interface CustomizerContextType {
  theme: SiteTheme;
  content: SiteContent;
  isCustomizerOpen: boolean;
  isInlineEditMode: boolean;
  openCustomizer: (initialTab?: 'colors' | 'fonts' | 'text') => void;
  closeCustomizer: () => void;
  setInitialTab: (tab: 'colors' | 'fonts' | 'text') => void;
  activeTab: 'colors' | 'fonts' | 'text';
  updateTheme: (updates: Partial<SiteTheme>) => void;
  updateContent: (updates: Partial<SiteContent>) => void;
  applyPreset: (presetId: string) => void;
  resetTheme: () => void;
  resetContent: () => void;
  resetAll: () => void;
  toggleInlineEditMode: () => void;
}

const CustomizerContext = createContext<CustomizerContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'pastry_inn_site_theme';
const CONTENT_STORAGE_KEY = 'pastry_inn_site_content';

export const CustomizerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<SiteTheme>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_THEME, ...JSON.parse(saved) };
      }
    } catch {}
    return DEFAULT_THEME;
  });

  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(CONTENT_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_CONTENT, ...JSON.parse(saved) };
      }
    } catch {}
    return DEFAULT_CONTENT;
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'colors' | 'fonts' | 'text'>('colors');
  const [isInlineEditMode, setIsInlineEditMode] = useState(false);

  // Sync theme changes to CSS variables and inject dynamic style tag
  useEffect(() => {
    const root = document.documentElement;

    // Direct CSS Variables
    root.style.setProperty('--color-terracotta', theme.primaryColor);
    root.style.setProperty('--color-terracotta-dark', theme.primaryHoverColor);
    root.style.setProperty('--color-sage', theme.secondaryColor);
    root.style.setProperty('--color-sage-light', theme.secondaryLightColor);
    root.style.setProperty('--color-warm-cream', theme.backgroundColor);
    root.style.setProperty('--color-cocoa', theme.textColor);
    root.style.setProperty('--color-warm-surface', theme.surfaceColor);
    
    // Set custom brand variables
    root.style.setProperty('--brand-primary', theme.primaryColor);
    root.style.setProperty('--brand-primary-hover', theme.primaryHoverColor);
    root.style.setProperty('--brand-secondary', theme.secondaryColor);
    root.style.setProperty('--brand-secondary-light', theme.secondaryLightColor);
    root.style.setProperty('--brand-bg', theme.backgroundColor);
    root.style.setProperty('--brand-surface', theme.surfaceColor);
    root.style.setProperty('--brand-text', theme.textColor);
    root.style.setProperty('--brand-muted', theme.mutedTextColor);
    root.style.setProperty('--font-serif', `"${theme.headingFont}", Georgia, serif`);
    root.style.setProperty('--font-sans', `"${theme.bodyFont}", sans-serif`);

    // Injected dynamic style block to override hardcoded Tailwind color utilities
    let dynamicStyleElem = document.getElementById('pastry-inn-dynamic-theme-styles');
    if (!dynamicStyleElem) {
      dynamicStyleElem = document.createElement('style');
      dynamicStyleElem.id = 'pastry-inn-dynamic-theme-styles';
      document.head.appendChild(dynamicStyleElem);
    }

    dynamicStyleElem.innerHTML = `
      :root {
        --heading-scale: ${theme.headingScale};
      }
      body {
        background-color: ${theme.backgroundColor} !important;
        color: ${theme.textColor} !important;
        font-family: "${theme.bodyFont}", sans-serif !important;
      }
      .font-serif {
        font-family: "${theme.headingFont}", Georgia, serif !important;
      }
      .font-sans {
        font-family: "${theme.bodyFont}", sans-serif !important;
      }
      /* Dynamic Primary color buttons and highlights */
      .bg-\\[\\#A6241D\\],
      .bg-\\[\\#C86D51\\] {
        background-color: ${theme.primaryColor} !important;
      }
      .hover\\:bg-\\[\\#841812\\]:hover,
      .hover\\:bg-\\[\\#B3583C\\]:hover {
        background-color: ${theme.primaryHoverColor} !important;
      }
      .text-\\[\\#A6241D\\],
      .text-\\[\\#C86D51\\] {
        color: ${theme.primaryColor} !important;
      }
      .border-\\[\\#A6241D\\],
      .border-\\[\\#C86D51\\] {
        border-color: ${theme.primaryColor} !important;
      }
      /* Dynamic Secondary color badges & highlights */
      .bg-\\[\\#30683B\\] {
        background-color: ${theme.secondaryColor} !important;
      }
      .text-\\[\\#30683B\\] {
        color: ${theme.secondaryColor} !important;
      }
      /* Dynamic Background & Surface */
      .bg-\\[\\#FAF7F2\\] {
        background-color: ${theme.backgroundColor} !important;
      }
      .text-\\[\\#29221F\\] {
        color: ${theme.textColor} !important;
      }
      /* Header Navigation Buttons */
      .header-nav-btn {
        background-color: ${theme.navButtonBg || 'transparent'} !important;
        color: ${theme.navButtonTextColor || '#29221F'} !important;
      }
      .header-nav-btn:hover {
        opacity: 0.92;
        filter: brightness(0.96);
      }
      /* Heading Scale */
      h1 {
        font-size: calc(2.25rem * ${theme.headingScale}) !important;
      }
      @media (min-width: 640px) {
        h1 {
          font-size: calc(3rem * ${theme.headingScale}) !important;
        }
      }
      @media (min-width: 1024px) {
        h1 {
          font-size: calc(3.75rem * ${theme.headingScale}) !important;
        }
      }
    `;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
    } catch {}
  }, [theme]);

  // Sync content changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content));
    } catch {}
  }, [content]);

  const updateTheme = (updates: Partial<SiteTheme>) => {
    setTheme(prev => ({ ...prev, ...updates }));
  };

  const updateContent = (updates: Partial<SiteContent>) => {
    setContent(prev => ({ ...prev, ...updates }));
  };

  const applyPreset = (presetId: string) => {
    const preset = THEME_PRESETS.find(p => p.id === presetId);
    if (preset) {
      updateTheme(preset.theme);
    }
  };

  const resetTheme = () => {
    setTheme(DEFAULT_THEME);
  };

  const resetContent = () => {
    setContent(DEFAULT_CONTENT);
  };

  const resetAll = () => {
    setTheme(DEFAULT_THEME);
    setContent(DEFAULT_CONTENT);
  };

  const openCustomizer = (initialTab: 'colors' | 'fonts' | 'text' = 'colors') => {
    setActiveTab(initialTab);
    setIsCustomizerOpen(true);
  };

  const closeCustomizer = () => {
    setIsCustomizerOpen(false);
  };

  const toggleInlineEditMode = () => {
    setIsInlineEditMode(prev => !prev);
  };

  return (
    <CustomizerContext.Provider
      value={{
        theme,
        content,
        isCustomizerOpen,
        isInlineEditMode,
        openCustomizer,
        closeCustomizer,
        setInitialTab: setActiveTab,
        activeTab,
        updateTheme,
        updateContent,
        applyPreset,
        resetTheme,
        resetContent,
        resetAll,
        toggleInlineEditMode,
      }}
    >
      {children}
    </CustomizerContext.Provider>
  );
};

export const useCustomizer = () => {
  const context = useContext(CustomizerContext);
  if (!context) {
    throw new Error('useCustomizer must be used within a CustomizerProvider');
  }
  return context;
};
