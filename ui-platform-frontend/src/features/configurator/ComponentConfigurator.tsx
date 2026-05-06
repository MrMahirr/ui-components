import { useState, useRef, useEffect } from 'react';
import { Settings2, RotateCcw, ChevronDown, Search, Check, Sliders, Type, Grid3X3, Sparkles } from 'lucide-react';
import { ToggleControl, ColorControl, TextControl, SliderControl, SelectControl } from './InputControls';
import { useComponentStore } from '../../store/useComponentStore';
import { useGoogleFonts } from '../../hooks/useGoogleFonts';
import { cn } from '../../utils/cn';

/**
 * Custom Searchable Font Family Selector with live preview list elements.
 */
function FontSelector() {
    const { selectedFont, setSelectedFont, searchQuery, setSearchQuery, filteredFonts } = useGoogleFonts();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Self-cleaning effect to temporarily allow absolute dropdown flow outside scroll limits
    useEffect(() => {
        const container = dropdownRef.current?.closest('.overflow-y-auto');
        const aside = dropdownRef.current?.closest('aside');
        
        if (isOpen) {
            if (container) container.classList.add('!overflow-visible');
            if (aside) aside.classList.add('!overflow-visible');
        } else {
            if (container) container.classList.remove('!overflow-visible');
            if (aside) aside.classList.remove('!overflow-visible');
        }
        
        return () => {
            if (container) container.classList.remove('!overflow-visible');
            if (aside) aside.classList.remove('!overflow-visible');
        };
    }, [isOpen]);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                className="w-full flex items-center justify-between bg-background/50 hover:bg-white/[0.04] px-4 py-3 rounded-xl border border-border cursor-pointer select-none transition-all duration-200 group"
            >
                <div className="flex flex-col text-left">
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-text-muted/50 mb-0.5">Font Family</span>
                    <span className="text-xs font-bold text-text-main group-hover:text-primary transition-colors">{selectedFont}</span>
                </div>
                <ChevronDown size={14} className="text-text-muted/60 group-hover:text-text-main transition-colors" />
            </button>

            {isOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-background/95 border border-border rounded-2xl shadow-2xl backdrop-blur-xl z-50 overflow-hidden flex flex-col max-h-60">
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
                                            ? "bg-primary/10 text-primary font-bold border border-primary/20" 
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
    const { currentConfig, globalStyles, updateConfig, updateGlobalStyle, resetConfig } = useComponentStore();
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        core: true,       // Open component-specific configs by default
        spacing: false,
        typography: false,
        borders: false,
        effects: false
    });

    const fontWeights = [
        { label: 'Light', value: '300' },
        { label: 'Regular', value: '400' },
        { label: 'Medium', value: '500' },
        { label: 'Semibold', value: '600' },
        { label: 'Bold', value: '700' },
        { label: 'Black', value: '900' }
    ];

    const letterSpacings = [
        { label: 'Tighter', value: 'tighter' },
        { label: 'Tight', value: 'tight' },
        { label: 'Normal', value: 'normal' },
        { label: 'Wide', value: 'wide' },
        { label: 'Wider', value: 'wider' },
        { label: 'Widest', value: 'widest' }
    ];

    const borderRadii = [
        { label: 'None', value: '0px' },
        { label: 'Small (4px)', value: '4px' },
        { label: 'Medium (8px)', value: '8px' },
        { label: 'Large (12px)', value: '12px' },
        { label: 'X-Large (16px)', value: '16px' },
        { label: '2X-Large (24px)', value: '24px' },
        { label: '3X-Large (32px)', value: '32px' },
        { label: 'Full', value: '9999px' }
    ];

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

    const toggleSection = (section: string) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
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

            {/* Customizer Option Categories */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                
                {/* 1. Core Parameters Accordion */}
                <div className="border border-border/60 bg-surface/20 rounded-2xl relative z-[50]">
                    <button
                        onClick={() => toggleSection('core')}
                        className="w-full flex items-center justify-between px-4 py-3 bg-white/[0.01] hover:bg-white/[0.03] transition-colors cursor-pointer"
                    >
                        <div className="flex items-center gap-2 text-text-main">
                            <Sliders size={14} className="text-primary" />
                            <span className="text-xs font-black uppercase tracking-wider">Core Params</span>
                        </div>
                        <ChevronDown 
                            size={14} 
                            className={cn("text-text-muted/60 transition-transform duration-300", openSections.core ? "rotate-0" : "-rotate-90")} 
                        />
                    </button>
                    <div className={cn("grid transition-all duration-300 ease-in-out", openSections.core ? "grid-rows-[1fr] opacity-100 overflow-visible" : "grid-rows-[0fr] opacity-0 overflow-hidden")}>
                        <div className="min-h-0 p-4 space-y-4 border-t border-border/40 bg-background/5">
                            {Object.entries(currentConfig).map(([key, value]) => (
                                <div key={key} className="space-y-1.5">
                                    <label className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest block">
                                        {key.replace(/_/g, ' ')}
                                    </label>
                                    {renderControl(key, value)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. Spacing & Sizes Accordion */}
                <div className="border border-border/60 bg-surface/20 rounded-2xl relative z-[40]">
                    <button
                        onClick={() => toggleSection('spacing')}
                        className="w-full flex items-center justify-between px-4 py-3 bg-white/[0.01] hover:bg-white/[0.03] transition-colors cursor-pointer"
                    >
                        <div className="flex items-center gap-2 text-text-main">
                            <Grid3X3 size={14} className="text-primary" />
                            <span className="text-xs font-black uppercase tracking-wider">Spacing & Size</span>
                        </div>
                        <ChevronDown 
                            size={14} 
                            className={cn("text-text-muted/60 transition-transform duration-300", openSections.spacing ? "rotate-0" : "-rotate-90")} 
                        />
                    </button>
                    <div className={cn("grid transition-all duration-300 ease-in-out", openSections.spacing ? "grid-rows-[1fr] opacity-100 overflow-visible" : "grid-rows-[0fr] opacity-0 overflow-hidden")}>
                        <div className="min-h-0 p-4 space-y-4 border-t border-border/40 bg-background/5">
                            <div className="space-y-1.5">
                                <span className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest block">Padding X (Horizontal)</span>
                                <SliderControl value={globalStyles.paddingX} onChange={(val) => updateGlobalStyle('paddingX', val)} min={0} max={64} unit="px" />
                            </div>
                            <div className="space-y-1.5">
                                <span className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest block">Padding Y (Vertical)</span>
                                <SliderControl value={globalStyles.paddingY} onChange={(val) => updateGlobalStyle('paddingY', val)} min={0} max={64} unit="px" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Typography Accordion */}
                <div className="border border-border/60 bg-surface/20 rounded-2xl relative z-[30]">
                    <button
                        onClick={() => toggleSection('typography')}
                        className="w-full flex items-center justify-between px-4 py-3 bg-white/[0.01] hover:bg-white/[0.03] transition-colors cursor-pointer"
                    >
                        <div className="flex items-center gap-2 text-text-main">
                            <Type size={14} className="text-primary" />
                            <span className="text-xs font-black uppercase tracking-wider">Typography Specs</span>
                        </div>
                        <ChevronDown 
                            size={14} 
                            className={cn("text-text-muted/60 transition-transform duration-300", openSections.typography ? "rotate-0" : "-rotate-90")} 
                        />
                    </button>
                    <div className={cn("grid transition-all duration-300 ease-in-out", openSections.typography ? "grid-rows-[1fr] opacity-100 overflow-visible" : "grid-rows-[0fr] opacity-0 overflow-hidden")}>
                        <div className="min-h-0 p-4 space-y-4 border-t border-border/40 bg-background/5">
                            <div className="space-y-1.5">
                                <FontSelector />
                            </div>
                            <div className="space-y-1.5">
                                <span className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest block">Font Size</span>
                                <SliderControl value={globalStyles.fontSize} onChange={(val) => updateGlobalStyle('fontSize', val)} min={10} max={36} unit="px" />
                            </div>
                            <div className="space-y-1.5">
                                <span className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest block">Font Weight</span>
                                <SelectControl value={globalStyles.fontWeight} onChange={(val) => updateGlobalStyle('fontWeight', val)} options={fontWeights} />
                            </div>
                            <div className="space-y-1.5">
                                <span className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest block">Letter Spacing</span>
                                <SelectControl value={globalStyles.letterSpacing} onChange={(val) => updateGlobalStyle('letterSpacing', val)} options={letterSpacings} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Borders & Outlines Accordion */}
                <div className="border border-border/60 bg-surface/20 rounded-2xl relative z-[20]">
                    <button
                        onClick={() => toggleSection('borders')}
                        className="w-full flex items-center justify-between px-4 py-3 bg-white/[0.01] hover:bg-white/[0.03] transition-colors cursor-pointer"
                    >
                        <div className="flex items-center gap-2 text-text-main">
                            <Settings2 size={14} className="text-primary" />
                            <span className="text-xs font-black uppercase tracking-wider">Border Details</span>
                        </div>
                        <ChevronDown 
                            size={14} 
                            className={cn("text-text-muted/60 transition-transform duration-300", openSections.borders ? "rotate-0" : "-rotate-90")} 
                        />
                    </button>
                    <div className={cn("grid transition-all duration-300 ease-in-out", openSections.borders ? "grid-rows-[1fr] opacity-100 overflow-visible" : "grid-rows-[0fr] opacity-0 overflow-hidden")}>
                        <div className="min-h-0 p-4 space-y-4 border-t border-border/40 bg-background/5">
                            <div className="space-y-1.5">
                                <span className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest block">Border Width</span>
                                <SliderControl value={globalStyles.borderWidth} onChange={(val) => updateGlobalStyle('borderWidth', val)} min={0} max={8} unit="px" />
                            </div>
                            <div className="space-y-1.5">
                                <span className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest block">Border Radius</span>
                                <SelectControl value={globalStyles.borderRadius} onChange={(val) => updateGlobalStyle('borderRadius', val)} options={borderRadii} />
                            </div>
                            <div className="space-y-1.5">
                                <span className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest block">Border Color</span>
                                <ColorControl value={globalStyles.borderColor} onChange={(val) => updateGlobalStyle('borderColor', val)} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. Neon Glow & Effects Accordion */}
                <div className="border border-border/60 bg-surface/20 rounded-2xl relative z-[10]">
                    <button
                        onClick={() => toggleSection('effects')}
                        className="w-full flex items-center justify-between px-4 py-3 bg-white/[0.01] hover:bg-white/[0.03] transition-colors cursor-pointer"
                    >
                        <div className="flex items-center gap-2 text-text-main">
                            <Sparkles size={14} className="text-primary" />
                            <span className="text-xs font-black uppercase tracking-wider">Neon Glow & FX</span>
                        </div>
                        <ChevronDown 
                            size={14} 
                            className={cn("text-text-muted/60 transition-transform duration-300", openSections.effects ? "rotate-0" : "-rotate-90")} 
                        />
                    </button>
                    <div className={cn("grid transition-all duration-300 ease-in-out", openSections.effects ? "grid-rows-[1fr] opacity-100 overflow-visible" : "grid-rows-[0fr] opacity-0 overflow-hidden")}>
                        <div className="min-h-0 p-4 space-y-4 border-t border-border/40 bg-background/5">
                            <div className="space-y-1.5">
                                <span className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest block">Opacity</span>
                                <SliderControl value={globalStyles.opacity} onChange={(val) => updateGlobalStyle('opacity', val)} min={0} max={100} unit="%" />
                            </div>
                            <div className="space-y-1.5">
                                <span className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest block">Glow Color</span>
                                <ColorControl value={globalStyles.glowColor} onChange={(val) => updateGlobalStyle('glowColor', val)} />
                            </div>
                            <div className="space-y-1.5">
                                <span className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest block">Glow Blur</span>
                                <SliderControl value={globalStyles.glowBlur} onChange={(val) => updateGlobalStyle('glowBlur', val)} min={0} max={50} unit="px" />
                            </div>
                            <div className="space-y-1.5">
                                <span className="text-[9px] font-black text-text-muted/60 uppercase tracking-widest block">Glow Spread</span>
                                <SliderControl value={globalStyles.glowSpread} onChange={(val) => updateGlobalStyle('glowSpread', val)} min={0} max={30} unit="px" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}