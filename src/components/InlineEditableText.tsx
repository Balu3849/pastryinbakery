import React, { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { useCustomizer } from '../utils/customizerContext';

interface InlineEditableTextProps {
  contentKey: keyof import('../types').SiteContent;
  value: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  multiline?: boolean;
}

export const InlineEditableText: React.FC<InlineEditableTextProps> = ({
  contentKey,
  value,
  as: Component = 'span',
  className = '',
  multiline = false,
}) => {
  const { isInlineEditMode, updateContent, openCustomizer } = useCustomizer();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  // Sync draft if external value changes
  React.useEffect(() => {
    setDraft(value);
  }, [value]);

  const handleSave = (e?: React.SyntheticEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    updateContent({ [contentKey]: draft });
    setIsEditing(false);
  };

  const handleCancel = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setDraft(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <span className="relative inline-block w-full" onClick={(e) => e.stopPropagation()}>
        {multiline ? (
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full p-2 bg-white text-[#29221F] border-2 border-[#A6241D] rounded-lg shadow-md text-sm outline-hidden font-sans"
            rows={3}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave(e);
              if (e.key === 'Escape') handleCancel(e);
            }}
            className="w-full p-1.5 bg-white text-[#29221F] border-2 border-[#A6241D] rounded-lg shadow-md text-inherit outline-hidden font-inherit"
            autoFocus
          />
        )}
        <span className="flex items-center gap-1 mt-1 justify-end">
          <button
            onClick={handleSave}
            className="p-1 bg-[#30683B] text-white rounded hover:bg-[#25522E] cursor-pointer"
            title="Save changes"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 bg-[#A6241D] text-white rounded hover:bg-[#841812] cursor-pointer"
            title="Cancel"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      </span>
    );
  }

  return (
    <Component
      className={`${className} ${
        isInlineEditMode 
          ? 'relative group cursor-pointer hover:outline-dashed hover:outline-2 hover:outline-[#A6241D] hover:rounded-sm transition-all' 
          : ''
      }`}
      onClick={(e) => {
        if (isInlineEditMode) {
          e.stopPropagation();
          setIsEditing(true);
        }
      }}
      title={isInlineEditMode ? 'Click to edit text directly' : undefined}
    >
      {value}
      {isInlineEditMode && (
        <span 
          className="inline-flex items-center ml-1.5 opacity-60 group-hover:opacity-100 transition-opacity align-middle text-[#A6241D]"
          title="Click to edit"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </span>
      )}
    </Component>
  );
};
