import { useState, useRef, useEffect } from 'react';
import { Settings2, RotateCcw, ChevronDown, Search, Check } from 'lucide-react';
import { ToggleControl, ColorControl, TextControl } from './InputControls';
import { useComponentStore } from '../../store/useComponentStore';
import { useGoogleFonts } from '../../hooks/useGoogleFonts';
import { cn } from '../../utils/cn';

/**
 * Custom Searchable Font Family Selector.
 * Allows quick lookup and displays each font preview inline.
 */
function FontSelector() {
    const { selectedFont, setSelectedFont, searchQuery, setSearchQuery, filteredFonts } = useGoogleFonts();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Auto-close when clicking outside of the element boundaries
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {/* Combobox Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between bg-background/50 hover:bg-white/[0.04] px-4 py-3 rounded-xl border border-border cursor-pointer select-none transition-all duration-200 group"
            >
                <div className="flex flex-col text-left">
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-text-muted/50 mb-0.5">Typography</span>
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors">{selectedFont}</span>
                </div>
                <ChevronDown size={14} className="text-text-muted/60 group-hover:text-text-main transition-colors" />
            </button>

            {/* Dropdown Box */}
            {isOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-background/95 border border-border rounded-2xl shadow-2xl backdrop-blur-xl z-50 overflow-hidden flex flex-col max-h-60">
                    {/* Live search input */}
                    <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-border/50 bg-white/[0.01]">
                        <Search size={13} className="text-text-muted/50" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search font..."
                            className="w-full bg-transparent text-xs text-text-main outline-none placeholder:text-text-muted/40"
                        />
                    </div>

                    {/* Scrollable list of fonts with inline font-family preview */}
                    <div className="overflow-y-auto flex-1 p-1.5 space-y-0.5">
                        {filteredFonts.length === 0 ? (
                            <div className="text-[10px] font-bold text-center text-text-muted/40 py-4 select-none">No fonts matched</div>
                        ) : (
                            filteredFonts.map(font => (
                                <button
                                    key={font}
                                    onClick={() => {
                                        setSelectedFont(font);
                                        setIsOpen(false);
                                        setSearchQuery('');
                                    }}
                                    className={cn(
                                        "w-full text-left px-3 py-2 rounded-lg text-xs transition-all cursor-pointer flex items-center justify-between",
                                        selectedFont === font 
                                            ? "bg-primary/10 text-primary font-bold border border-primary/20 shadow-[0_0_15px_rgba(0,210,255,0.02)]" 
                                            : "text-text-muted hover:bg-white/[0.03] hover:text-text-main border border-transparent"
                                    )}
                                    style={{ fontFamily: `'${font}', sans-serif` }}
                                >
                                    <span>{font}</span>
                                    {selectedFont === font && <Check size={12} strokeWidth={3} />}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export function ComponentConfigurator() {
    const { currentConfig, updateConfig, resetConfig } = useComponentStore();

    // Custom helper checking if values represent CSS colors (Hex, rgb, rgba, hsl, hsla, or contain 'color')
    const isColorValue = (key: string, value: any): boolean => {
        if (typeof value !== 'string') return false;
        const valClean = value.trim().toLowerCase();
        return (
            key.toLowerCase().includes('color') ||
            valClean.startsWith('#') ||
            valClean.startsWith('rgb(') ||
            valClean.startsWith('rgba(') ||
            valClean.startsWith('hsl(') ||
            valClean.startsWith('hsla(')
        );
    };

    const renderControl = (key: string, value: any) => {
        if (typeof value === 'boolean') {
            return <ToggleControl checked={value} onChange={(val) => updateConfig(key, val)} />;
        }
        if (isColorValue(key, value)) {
            return <ColorControl value={value} onChange={(val) => updateConfig(key, val)} />;
        }
        return <TextControl value={value} onChange={(val) => updateConfig(key, val)} />;
    };

    if (Object.keys(currentConfig).length === 0) return null;

    return (
        <div className="h-full flex flex-col w-full select-none">
            {/* Header */}
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface/40">
                <div className="flex items-center gap-2 text-primary">
                    <Settings2 size={16} />
                    <span className="font-bold text-xs tracking-widest uppercase">Customizer</span>
                </div>
                <button
                    onClick={resetConfig}
                    className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 rounded-lg text-text-muted hover:text-text-main transition-all text-[11px] font-black uppercase tracking-wider border border-border cursor-pointer"
                >
                    <RotateCcw size={13} />
                    Reset
                </button>
            </div>

            {/* Controller Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* 1. Global typography font family selector */}
                <div className="space-y-2">
                    <FontSelector />
                </div>

                <div className="border-t border-border/40 my-4" />

                {/* 2. List of component parameters (Colors, toggles, text parameters) */}
                {Object.entries(currentConfig).map(([key, value]) => (
                    <div key={key} className="space-y-3">
                        <label className="text-[10px] font-black text-text-muted/60 uppercase tracking-[0.2em] block">
                            {key.replace(/_/g, ' ')}
                        </label>
                        <div className="flex items-center min-h-[40px]">
                            {renderControl(key, value)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}