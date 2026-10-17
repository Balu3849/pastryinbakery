import React, { useState } from 'react';
import { Palette, Type, FileText, Sparkles, SlidersHorizontal, ChevronRight, Edit3 } from 'lucide-react';
import { useCustomizer } from '../utils/customizerContext';

export const ThemeCustomizerFloatingButton: React.FC = () => {
  const { openCustomizer, theme, isInlineEditMode, toggleInlineEditMode } = useCustomizer();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <aside aria-label="Page Customizer" className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-2 print:hidden">
      {/* Quick popup options when expanded */}
      {isOpenMenu && (
        <div className="bg-white/95 backdrop-blur-md p-2 rounded-2xl border border-[#DDD0BC] shadow-xl space-y-1 w-48 animate-in slide-in-from-bottom-2 duration-150">
          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#786A63] border-b border-[#EFE7D8] flex items-center justify-between">
            <span>Visual Studio</span>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primaryColor }} />
          </div>

          <button
            onClick={() => {
              openCustomizer('colors');
              setIsOpenMenu(false);
            }}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#29221F] hover:bg-[#FAF7F2] rounded-lg transition-colors text-left cursor-pointer"
          >
            <Palette className="w-3.5 h-3.5 text-[#A6241D]" />
            <span>Edit Colours</span>
          </button>

          <button
            onClick={() => {
              openCustomizer('fonts');
              setIsOpenMenu(false);
            }}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#29221F] hover:bg-[#FAF7F2] rounded-lg transition-colors text-left cursor-pointer"
          >
            <Type className="w-3.5 h-3.5 text-[#30683B]" />
            <span>Edit Fonts</span>
          </button>

          <button
            onClick={() => {
              openCustomizer('text');
              setIsOpenMenu(false);
            }}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#29221F] hover:bg-[#FAF7F2] rounded-lg transition-colors text-left cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Edit Page Texts</span>
          </button>

          <div className="pt-1 border-t border-[#EFE7D8]">
            <button
              onClick={() => {
                toggleInlineEditMode();
                setIsOpenMenu(false);
              }}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg transition-colors text-left cursor-pointer ${
                isInlineEditMode 
                  ? 'bg-[#EBF4ED] text-[#25522E] font-semibold' 
                  : 'text-[#5A4E48] hover:bg-[#FAF7F2]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Edit3 className="w-3.5 h-3.5 text-[#30683B]" />
                <span>Click-to-Edit</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isInlineEditMode ? 'bg-[#30683B] text-white' : 'bg-[#DDD0BC]/50 text-[#786A63]'}`}>
                {isInlineEditMode ? 'ON' : 'OFF'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Main Trigger Pill Button */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setIsOpenMenu(prev => !prev)}
          className="flex items-center gap-2 px-3 py-2 bg-white/95 hover:bg-white text-[#29221F] border border-[#DDD0BC] shadow-lg hover:shadow-xl rounded-full text-xs font-semibold transition-all backdrop-blur-md cursor-pointer hover:border-[#A6241D] group"
          title="Open Page Customizer for Colors, Fonts and Texts"
        >
          <span 
            className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs transition-transform group-hover:scale-110"
            style={{ backgroundColor: theme.primaryColor }}
          />
          <Palette className="w-3.5 h-3.5 text-[#A6241D]" />
          <span className="hidden sm:inline">Customize Page</span>
          <span className="text-[10px] bg-[#FAF7F2] border border-[#DDD0BC] px-1.5 py-0.5 rounded-full text-[#786A63]">
            Edit
          </span>
        </button>
      </div>
    </aside>
  );
};
