import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export const ToggleControl = ({ checked, onChange }: { checked: boolean, onChange: (val: boolean) => void }) => (
    <label className="relative inline-flex items-center cursor-pointer">
        <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="sr-only peer"
        />
        <div className="w-10 h-5 bg-border rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
    </label>
);

/**
 * Premium Figma-like Popover Color Picker.
 * Features an interactive popup, standard color canvas, Hex manual inputs,
 * and 8 pre-compiled cosmic/neon hotkeys for fast design testing.
 */
export const ColorControl = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Self-cleaning effect to temporarily allow absolute popover flow outside scroll limits
    useEffect(() => {
        const container = popoverRef.current?.closest('.overflow-y-auto');
        const aside = popoverRef.current?.closest('aside');
        
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

    const presets = [
        '#00D2FF', // Cyan Neon
        '#6366F1', // Indigo
        '#10B981', // Emerald
        '#8B5CF6', // Purple
        '#EC4899', // Pink
        '#EF4444', // Red
        '#F59E0B', // Amber
        '#FAFAFA', // White
    ];

    const getSafeHex = (colorString: string) => {
        const cleaned = colorString.trim();
        if (cleaned.startsWith('#') && (cleaned.length === 7 || cleaned.length === 4)) {
            return cleaned;
        }
        return '#00D2FF'; // Cyan fallback
    };

    return (
        <div className="relative w-full" ref={popoverRef}>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                className="w-full flex items-center justify-between bg-background/50 hover:bg-white/[0.04] p-2.5 rounded-xl border border-border cursor-pointer select-none transition-all duration-200 group"
            >
                <div className="flex items-center gap-3">
                    <div 
                        className="w-5 h-5 rounded-lg border border-white/10 shadow-lg group-hover:scale-105 transition-transform"
                        style={{ backgroundColor: value }}
                    />
                    <span className="text-[11px] font-mono font-bold text-text-main uppercase tracking-widest">{value}</span>
                </div>
                <ChevronDown size={14} className="text-text-muted/60 group-hover:text-text-main transition-colors" />
            </button>

            {isOpen && (
                <div className="absolute left-0 right-0 mt-2 p-4 bg-background/95 border border-border/80 rounded-2xl shadow-2xl backdrop-blur-xl z-50 space-y-4">
                    <div className="space-y-1.5">
                        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-text-muted/50 block">Custom Palette</span>
                        <div className="relative h-12 w-full rounded-xl overflow-hidden border border-white/5 shadow-inner">
                            <input
                                type="color"
                                value={getSafeHex(value)}
                                onChange={(e) => onChange(e.target.value)}
                                className="absolute inset-0 w-full h-full p-0 border-0 bg-transparent cursor-pointer scale-125"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-text-muted/50 block">Presets</span>
                        <div className="grid grid-cols-4 gap-2">
                            {presets.map((preset) => (
                                <button
                                    key={preset}
                                    onClick={() => {
                                        onChange(preset);
                                        setIsOpen(false);
                                    }}
                                    className="w-8 h-8 rounded-lg border border-white/10 cursor-pointer transition-transform hover:scale-110 relative"
                                    style={{ backgroundColor: preset }}
                                    title={preset}
                                >
                                    {value.toLowerCase() === preset.toLowerCase() && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                                            <Check size={12} className="text-white" strokeWidth={3} />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-text-muted/50 block">HEX Code</span>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="w-full bg-background/60 border border-border rounded-lg px-2.5 py-1.5 text-[11px] font-mono text-text-main focus:border-primary transition-all outline-none"
                            placeholder="#000000"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export const TextControl = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => (
    <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background/40 border border-border rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all outline-none"
    />
);

/**
 * Premium layout slider element with custom glowing indicators.
 */
export const SliderControl = ({ 
    value, 
    onChange, 
    min, 
    max, 
    unit = '' 
}: { 
    value: number; 
    onChange: (val: number) => void; 
    min: number; 
    max: number; 
    unit?: string; 
}) => (
    <div className="flex items-center gap-4 w-full select-none">
        <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="flex-1 h-1.5 rounded-full bg-border/40 appearance-none cursor-pointer accent-primary focus:outline-none"
        />
        <span className="text-[10px] font-mono font-bold text-text-main w-12 text-right bg-white/5 border border-white/5 py-1 px-2 rounded-lg">
            {value}{unit}
        </span>
    </div>
);

/**
 * Clean, glassmorphic dropdown list with standard options lists.
 */
export const SelectControl = ({
    value,
    onChange,
    options
}: {
    value: string;
    onChange: (val: string) => void;
    options: { label: string; value: string }[];
}) => (
    <div className="relative w-full">
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-background/50 hover:bg-white/[0.04] p-2.5 pr-8 rounded-xl border border-border text-xs text-text-main font-semibold outline-none cursor-pointer appearance-none transition-all duration-200"
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-surface text-text-main">
                    {opt.label}
                </option>
            ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted/60">
            <ChevronDown size={14} />
        </div>
    </div>
);