import React, { useState } from 'react';
import { 
  Palette, 
  Type, 
  FileText, 
  Sparkles, 
  X, 
  RotateCcw, 
  Check, 
  Sliders, 
  Eye, 
  Edit3, 
  Save, 
  Sun, 
  Moon, 
  Pipette,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { 
  useCustomizer, 
  THEME_PRESETS, 
  FONT_OPTIONS, 
  BODY_FONT_OPTIONS 
} from '../utils/customizerContext';

interface ThemeCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeCustomizerModal: React.FC<ThemeCustomizerModalProps> = ({ isOpen, onClose }) => {
  const {
    theme,
    content,
    activeTab,
    setInitialTab,
    updateTheme,
    updateContent,
    applyPreset,
    resetTheme,
    resetContent,
    resetAll,
    isInlineEditMode,
    toggleInlineEditMode,
  } = useCustomizer();

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-2xl border border-[#DDD0BC] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#1A100E] text-[#F3EBDD] px-6 py-4 flex items-center justify-between border-b border-[#362520] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#A6241D]/20 border border-[#A6241D]/40">
              <Palette className="w-5 h-5 text-[#E5A853]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <span>Page Customizer & Visual Studio</span>
                <span className="text-[10px] font-sans font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#A6241D] text-white">
                  Live
                </span>
              </h3>
              <p className="text-xs text-[#CBB9AC]">
                Instantly adjust bakery colors, typography fonts, and on-page texts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#D8CCC1] hover:text-white rounded-lg hover:bg-[#3D332F] transition-colors cursor-pointer"
            aria-label="Close customizer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#F3EBDD] px-6 py-2.5 border-b border-[#E5DACF] flex items-center justify-between gap-2 overflow-x-auto shrink-0">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setInitialTab('colors')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'colors'
                  ? 'bg-[#A6241D] text-white shadow-xs'
                  : 'text-[#4A3E39] hover:bg-white/80'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Colours & Theme</span>
            </button>

            <button
              onClick={() => setInitialTab('fonts')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'fonts'
                  ? 'bg-[#A6241D] text-white shadow-xs'
                  : 'text-[#4A3E39] hover:bg-white/80'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Fonts & Typography</span>
            </button>

            <button
              onClick={() => setInitialTab('text')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'text'
                  ? 'bg-[#A6241D] text-white shadow-xs'
                  : 'text-[#4A3E39] hover:bg-white/80'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Page Texts</span>
            </button>
          </div>

          {/* In-page edit mode toggle */}
          <button
            onClick={() => {
              toggleInlineEditMode();
              showToast(isInlineEditMode ? 'Visual In-Page Click Edit Mode disabled' : 'Visual In-Page Click Edit Mode activated!');
            }}
            className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-colors cursor-pointer shrink-0 ${
              isInlineEditMode 
                ? 'bg-[#30683B] text-white border-[#30683B]' 
                : 'bg-white text-[#5A4E48] border-[#DDD0BC] hover:bg-[#FAF7F2]'
            }`}
            title="Click to toggle in-page click-to-edit badges"
          >
            <Edit3 className="w-3 h-3" />
            <span>{isInlineEditMode ? 'Click-to-Edit ON' : 'Click-to-Edit OFF'}</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: COLOURS */}
          {activeTab === 'colors' && (
            <div className="space-y-6">
              
              {/* Presets Grid */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#786A63] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E5A853]" />
                    <span>Curated Bakery Theme Presets</span>
                  </label>
                  <span className="text-[11px] text-[#A6241D] font-medium">Click to apply instantly</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {THEME_PRESETS.map((preset) => {
                    const isSelected = 
                      theme.primaryColor === preset.theme.primaryColor &&
                      theme.secondaryColor === preset.theme.secondaryColor;

                    return (
                      <button
                        key={preset.id}
                        onClick={() => {
                          applyPreset(preset.id);
                          showToast(`Applied preset: ${preset.name}`);
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                          isSelected
                            ? 'bg-white border-[#A6241D] ring-2 ring-[#A6241D]/20 shadow-xs'
                            : 'bg-white hover:bg-[#FDFBF7] border-[#E2D4BF] hover:border-[#C86D51]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-xs font-bold text-[#29221F] truncate">
                            {preset.name}
                          </span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-[#A6241D] shrink-0" />
                          )}
                        </div>

                        <p className="text-[11px] text-[#786A63] leading-tight mb-2.5 line-clamp-1">
                          {preset.description}
                        </p>

                        {/* Color Swatch Dots */}
                        <div className="flex items-center gap-1.5">
                          <div 
                            className="w-5 h-5 rounded-full border border-black/10 shadow-2xs" 
                            style={{ backgroundColor: preset.theme.primaryColor }}
                            title={`Primary: ${preset.theme.primaryColor}`}
                          />
                          <div 
                            className="w-5 h-5 rounded-full border border-black/10 shadow-2xs" 
                            style={{ backgroundColor: preset.theme.secondaryColor }}
                            title={`Accent: ${preset.theme.secondaryColor}`}
                          />
                          <div 
                            className="w-5 h-5 rounded-full border border-black/10 shadow-2xs" 
                            style={{ backgroundColor: preset.theme.backgroundColor }}
                            title={`Background: ${preset.theme.backgroundColor}`}
                          />
                          <span className="text-[10px] text-[#8C5E48] ml-1 font-mono">
                            {preset.theme.headingFont}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Individual Color Pickers */}
              <div className="bg-white p-4 rounded-xl border border-[#E5DACF] space-y-4">
                <label className="text-xs font-bold uppercase tracking-wider text-[#786A63] flex items-center gap-1.5">
                  <Pipette className="w-3.5 h-3.5 text-[#A6241D]" />
                  <span>Custom Color Adjustments</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Primary Brand Color */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-medium text-[#29221F]">
                      <span>Primary Brand Color</span>
                      <span className="font-mono text-[11px] text-[#786A63]">{theme.primaryColor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={theme.primaryColor}
                        onChange={(e) => updateTheme({ 
                          primaryColor: e.target.value,
                          primaryHoverColor: e.target.value
                        })}
                        className="w-10 h-10 rounded-lg border border-[#DDD0BC] cursor-pointer p-0.5 bg-white"
                      />
                      <input
                        type="text"
                        value={theme.primaryColor}
                        onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                        className="flex-1 px-3 py-2 bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-xs font-mono text-[#29221F] outline-hidden focus:border-[#A6241D]"
                      />
                    </div>
                    <p className="text-[10px] text-[#8C5E48]">Used for main buttons, brand badges, and highlights.</p>
                  </div>

                  {/* Secondary Accent Color */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-medium text-[#29221F]">
                      <span>Secondary Accent Color</span>
                      <span className="font-mono text-[11px] text-[#786A63]">{theme.secondaryColor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={theme.secondaryColor}
                        onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                        className="w-10 h-10 rounded-lg border border-[#DDD0BC] cursor-pointer p-0.5 bg-white"
                      />
                      <input
                        type="text"
                        value={theme.secondaryColor}
                        onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                        className="flex-1 px-3 py-2 bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-xs font-mono text-[#29221F] outline-hidden focus:border-[#A6241D]"
                      />
                    </div>
                    <p className="text-[10px] text-[#8C5E48]">Used for secondary badges, tags, and accent accents.</p>
                  </div>

                  {/* Background Color */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-medium text-[#29221F]">
                      <span>Page Background Tint</span>
                      <span className="font-mono text-[11px] text-[#786A63]">{theme.backgroundColor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={theme.backgroundColor}
                        onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                        className="w-10 h-10 rounded-lg border border-[#DDD0BC] cursor-pointer p-0.5 bg-white"
                      />
                      <input
                        type="text"
                        value={theme.backgroundColor}
                        onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                        className="flex-1 px-3 py-2 bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-xs font-mono text-[#29221F] outline-hidden focus:border-[#A6241D]"
                      />
                    </div>
                    <p className="text-[10px] text-[#8C5E48]">Warm bakery cream, crisp ivory, or cozy dark.</p>
                  </div>

                  {/* Text / Heading Color */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-medium text-[#29221F]">
                      <span>Headline & Text Tone</span>
                      <span className="font-mono text-[11px] text-[#786A63]">{theme.textColor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={theme.textColor}
                        onChange={(e) => updateTheme({ textColor: e.target.value })}
                        className="w-10 h-10 rounded-lg border border-[#DDD0BC] cursor-pointer p-0.5 bg-white"
                      />
                      <input
                        type="text"
                        value={theme.textColor}
                        onChange={(e) => updateTheme({ textColor: e.target.value })}
                        className="flex-1 px-3 py-2 bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-xs font-mono text-[#29221F] outline-hidden focus:border-[#A6241D]"
                      />
                    </div>
                    <p className="text-[10px] text-[#8C5E48]">Deep cocoa, charcoal, or dark roast espresso.</p>
                  </div>

                  {/* Header Navigation Buttons Color */}
                  <div className="space-y-1.5 sm:col-span-2 pt-2 border-t border-[#EFE7D8]">
                    <div className="flex items-center justify-between text-xs font-medium text-[#29221F]">
                      <span>Header Navigation Buttons Background</span>
                      <span className="font-mono text-[11px] text-[#786A63]">{theme.navButtonBg || '#b8a3a3'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={theme.navButtonBg && theme.navButtonBg !== 'transparent' ? theme.navButtonBg : '#b8a3a3'}
                        onChange={(e) => updateTheme({ navButtonBg: e.target.value })}
                        className="w-10 h-10 rounded-lg border border-[#DDD0BC] cursor-pointer p-0.5 bg-white"
                      />
                      <input
                        type="text"
                        value={theme.navButtonBg || ''}
                        placeholder="e.g. #b8a3a3 or transparent"
                        onChange={(e) => updateTheme({ navButtonBg: e.target.value })}
                        className="flex-1 px-3 py-2 bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-xs font-mono text-[#29221F] outline-hidden focus:border-[#A6241D]"
                      />
                    </div>
                    {/* Quick Swatches for Nav Buttons */}
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-[#786A63]">Quick presets:</span>
                      <button
                        type="button"
                        onClick={() => updateTheme({ navButtonBg: '#b8a3a3' })}
                        className="px-2 py-0.5 text-[10px] font-semibold bg-[#b8a3a3] text-[#1A100E] rounded-md border border-black/10 cursor-pointer shadow-2xs"
                      >
                        #b8a3a3 (Soft Mauve)
                      </button>
                      <button
                        type="button"
                        onClick={() => updateTheme({ navButtonBg: '#E8DEC8' })}
                        className="px-2 py-0.5 text-[10px] font-semibold bg-[#E8DEC8] text-[#1A100E] rounded-md border border-black/10 cursor-pointer shadow-2xs"
                      >
                        Warm Biscuit
                      </button>
                      <button
                        type="button"
                        onClick={() => updateTheme({ navButtonBg: 'transparent' })}
                        className="px-2 py-0.5 text-[10px] font-semibold bg-white text-[#5A4E48] rounded-md border border-[#DDD0BC] cursor-pointer shadow-2xs"
                      >
                        Transparent
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FONTS & TYPOGRAPHY */}
          {activeTab === 'fonts' && (
            <div className="space-y-6">
              
              {/* Heading Font Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#786A63] flex items-center gap-1.5">
                    <Type className="w-3.5 h-3.5 text-[#A6241D]" />
                    <span>Heading & Logo Font</span>
                  </label>
                  <span className="text-[11px] text-[#8C5E48]">
                    Active: <strong className="text-[#A6241D]">{theme.headingFont}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {FONT_OPTIONS.map((f) => {
                    const isSelected = theme.headingFont === f.id;
                    return (
                      <button
                        key={f.id}
                        onClick={() => {
                          updateTheme({ headingFont: f.id });
                          showToast(`Heading font set to: ${f.name}`);
                        }}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white border-[#A6241D] ring-2 ring-[#A6241D]/20 shadow-xs'
                            : 'bg-white hover:bg-[#FDFBF7] border-[#E2D4BF] hover:border-[#C86D51]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-[#786A63]">
                            {f.name} ({f.category})
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-[#A6241D]" />}
                        </div>
                        <div 
                          className="text-lg font-bold text-[#29221F] truncate" 
                          style={{ fontFamily: f.fontFamily }}
                        >
                          PASTRY INN · Fresh Oven
                        </div>
                        <p className="text-[11px] text-[#8C5E48] mt-0.5 italic">
                          {f.sample}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Body Font Selection */}
              <div className="bg-white p-4 rounded-xl border border-[#E5DACF] space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#786A63] flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#30683B]" />
                  <span>Body & Paragraph Font</span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {BODY_FONT_OPTIONS.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => updateTheme({ bodyFont: b.id })}
                      className={`px-3 py-2 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                        theme.bodyFont === b.id
                          ? 'bg-[#A6241D] text-white border-[#A6241D]'
                          : 'bg-[#FAF7F2] text-[#4A3E39] border-[#DDD0BC] hover:bg-white'
                      }`}
                    >
                      {b.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Heading Scale */}
              <div className="bg-white p-4 rounded-xl border border-[#E5DACF] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-[#786A63]">
                    Headline Scale & Impact
                  </span>
                  <span className="font-bold text-[#A6241D]">
                    {Math.round(theme.headingScale * 100)}%
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Compact (90%)', scale: 0.9 },
                    { label: 'Standard (100%)', scale: 1.0 },
                    { label: 'Grand & Bold (115%)', scale: 1.15 },
                  ].map((s) => (
                    <button
                      key={s.scale}
                      onClick={() => updateTheme({ headingScale: s.scale })}
                      className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        theme.headingScale === s.scale
                          ? 'bg-[#A6241D] text-white border-[#A6241D]'
                          : 'bg-[#FAF7F2] text-[#4A3E39] border-[#DDD0BC] hover:bg-white'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: PAGE TEXTS & HEADINGS */}
          {activeTab === 'text' && (
            <div className="space-y-4">
              <div className="bg-[#EBF4ED] p-3 rounded-xl border border-[#CDE3CF] flex items-center gap-2.5 text-xs text-[#25522E]">
                <Edit3 className="w-4 h-4 text-[#30683B] shrink-0" />
                <span>
                  Edit any copy below or toggle <strong>Click-to-Edit Mode</strong> to change text directly on the page!
                </span>
              </div>

              {/* Form Fields */}
              <div className="bg-white p-4 rounded-xl border border-[#E5DACF] space-y-4">
                
                {/* Brand Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#29221F]">Bakery Brand Name</label>
                  <input
                    type="text"
                    value={content.brandName}
                    onChange={(e) => updateContent({ brandName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-sm font-semibold text-[#29221F] outline-hidden focus:border-[#A6241D]"
                    placeholder="e.g. PASTRY INN"
                  />
                </div>

                {/* Subtitle / Kicker */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#29221F]">Brand Subtitle / Kicker Tagline</label>
                  <input
                    type="text"
                    value={content.brandTagline}
                    onChange={(e) => updateContent({ brandTagline: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-xs text-[#29221F] outline-hidden focus:border-[#A6241D]"
                    placeholder="e.g. Artisanal Patisserie · Annavaram & Kakinada Region · Since 2017"
                  />
                </div>

                {/* Hero Headline */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#29221F]">Main Hero Headline</label>
                  <textarea
                    rows={2}
                    value={content.heroHeadline}
                    onChange={(e) => updateContent({ heroHeadline: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-sm text-[#29221F] outline-hidden focus:border-[#A6241D] leading-snug"
                    placeholder="Enter hero headline..."
                  />
                </div>

                {/* Hero Description */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#29221F]">Hero Story / Prose Description</label>
                  <textarea
                    rows={3}
                    value={content.heroDescription}
                    onChange={(e) => updateContent({ heroDescription: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-xs text-[#29221F] outline-hidden focus:border-[#A6241D] leading-relaxed"
                    placeholder="Welcome to..."
                  />
                </div>

                {/* Top Announcement Ribbon */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#29221F]">Top Ambient Ribbon Text</label>
                  <input
                    type="text"
                    value={content.topRibbonText}
                    onChange={(e) => updateContent({ topRibbonText: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-xs text-[#29221F] outline-hidden focus:border-[#A6241D]"
                  />
                </div>

                {/* Button Labels Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#29221F]">Primary Button</label>
                    <input
                      type="text"
                      value={content.ctaExploreText}
                      onChange={(e) => updateContent({ ctaExploreText: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-xs text-[#29221F]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#29221F]">QR Button</label>
                    <input
                      type="text"
                      value={content.ctaQrText}
                      onChange={(e) => updateContent({ ctaQrText: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-xs text-[#29221F]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#29221F]">WhatsApp Button</label>
                    <input
                      type="text"
                      value={content.ctaWhatsappText}
                      onChange={(e) => updateContent({ ctaWhatsappText: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-xs text-[#29221F]"
                    />
                  </div>
                </div>

                {/* Contact and Section Titles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#29221F]">Menu Section Title</label>
                    <input
                      type="text"
                      value={content.menuSectionTitle}
                      onChange={(e) => updateContent({ menuSectionTitle: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-xs text-[#29221F]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#29221F]">Display Phone</label>
                    <input
                      type="text"
                      value={content.displayPhone}
                      onChange={(e) => updateContent({ displayPhone: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg text-xs text-[#29221F]"
                    />
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-18 right-6 bg-[#1A100E] text-white px-3.5 py-2 rounded-xl shadow-lg border border-[#362520] text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4 text-[#86EFAC]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Footer */}
        <div className="bg-[#FAF7F2] px-6 py-3.5 border-t border-[#E8DEC8] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                resetTheme();
                showToast('Colors & fonts reset to default!');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#786A63] hover:text-[#29221F] hover:bg-[#F3EBDD] rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Colors/Fonts</span>
            </button>

            <button
              onClick={() => {
                resetAll();
                showToast('All settings reset to default!');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#A6241D] hover:bg-[#FCE8E8] rounded-lg transition-colors cursor-pointer"
            >
              <span>Reset All</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2 bg-[#A6241D] hover:bg-[#841812] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Done & Apply</span>
          </button>
        </div>

      </div>
    </div>
  );
};
