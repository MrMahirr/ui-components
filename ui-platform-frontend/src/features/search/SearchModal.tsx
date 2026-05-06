import { useState, useEffect, useRef } from 'react';
import { Search, X, CornerDownLeft, Sparkles, Layout } from 'lucide-react';
import { useComponents } from '../../hooks/useComponents';
import { useSearch } from '../../hooks/useSearch';
import { cn } from '../../utils/cn';

interface SearchModalProps {
    onSelect: (slug: string) => void;
}

export function SearchModal({ onSelect }: SearchModalProps) {
    const { isOpen, setIsOpen } = useSearch();
    const { data: components } = useComponents();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    // Filter components based on searchQuery (by name, category, or slug)
    const filteredComponents = components?.filter(comp => 
        comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.slug.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    // Auto-focus input, reset state when the search modal is opened
    useEffect(() => {
        if (isOpen) {
            // Slight delay ensures the DOM is fully rendered and ready to focus
            const timer = setTimeout(() => inputRef.current?.focus(), 50);
            setSearchQuery('');
            setActiveIndex(0);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Keep active index clamped within bounds when search results change
    useEffect(() => {
        setActiveIndex(0);
    }, [searchQuery]);

    // Close on click outside of modal content
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, setIsOpen]);

    // Handle interactive keyboard controls
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setActiveIndex((prev) => 
                    filteredComponents.length > 0 
                        ? (prev + 1) % filteredComponents.length 
                        : 0
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActiveIndex((prev) => 
                    filteredComponents.length > 0 
                        ? (prev - 1 + filteredComponents.length) % filteredComponents.length 
                        : 0
                );
                break;
            case 'Enter':
                e.preventDefault();
                if (filteredComponents.length > 0 && filteredComponents[activeIndex]) {
                    onSelect(filteredComponents[activeIndex].slug);
                    setIsOpen(false);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setIsOpen(false);
                break;
            default:
                break;
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-background/50 backdrop-blur-[1px] z-50 flex items-center justify-center px-4 transition-all duration-300">
            {/* Modal Container */}
            <div 
                ref={modalRef}
                onKeyDown={handleKeyDown}
                className="w-full max-w-xl bg-background/95 border border-border rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 flex flex-col transition-all duration-300 animate-in fade-in zoom-in-95 duration-150"
            >
                {/* Search Bar */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-surface/50">
                    <Search className="text-primary animate-pulse" size={18} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search components by name, category, or slug..."
                        className="flex-1 bg-transparent border-none text-text-main placeholder-text-muted/40 outline-none text-sm font-sans"
                    />
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black text-text-muted/70 bg-surface border border-border px-1.5 py-0.5 rounded-md uppercase tracking-wider select-none">
                            ESC
                        </span>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="p-1 text-text-muted hover:text-white transition-colors rounded-lg cursor-pointer"
                            aria-label="Close search"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>

                {/* Search Results Area */}
                <div className="flex-1 max-h-[350px] overflow-y-auto p-3 space-y-1">
                    {filteredComponents.length === 0 ? (
                        <div className="py-12 flex flex-col items-center justify-center text-center opacity-60">
                            <Sparkles className="text-primary/40 mb-3 animate-bounce" size={32} />
                            <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-1">No components found</p>
                            <p className="text-[11px] text-text-muted/70">Try searching for another keyword or category</p>
                        </div>
                    ) : (
                        <>
                            <div className="text-[10px] font-black text-text-muted/40 uppercase tracking-[0.2em] px-4 py-2">
                                Matching Components ({filteredComponents.length})
                            </div>
                            {filteredComponents.map((comp, idx) => {
                                const isSelected = idx === activeIndex;
                                return (
                                    <button
                                        key={comp.id}
                                        onClick={() => {
                                            onSelect(comp.slug);
                                            setIsOpen(false);
                                        }}
                                        className={cn(
                                            "w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all text-left cursor-pointer border-l-2",
                                            isSelected 
                                                ? "bg-primary/10 border-primary text-primary font-medium pl-5 shadow-[inset_0_0_20px_rgba(0,210,255,0.05)]"
                                                : "bg-transparent border-transparent text-text-muted hover:bg-surface-hover hover:text-text-main"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "p-1.5 rounded-lg border transition-all",
                                                isSelected 
                                                    ? "bg-primary/20 border-primary/30 text-primary" 
                                                    : "bg-surface border-border text-text-muted"
                                            )}>
                                                <Layout size={14} />
                                            </div>
                                            <div>
                                                <div className={cn(
                                                    "text-sm font-semibold transition-colors",
                                                    isSelected ? "text-primary" : "text-text-main"
                                                )}>
                                                    {comp.name}
                                                </div>
                                                <div className="text-[10px] text-text-muted/60 flex items-center gap-1.5 mt-0.5">
                                                    <span>{comp.category}</span>
                                                    <span>•</span>
                                                    <span className="font-mono">{comp.slug}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {isSelected && (
                                            <div className="flex items-center gap-1 text-[10px] font-black text-primary/80 uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20 animate-in fade-in slide-in-from-right-1 duration-100">
                                                <span>Select</span>
                                                <CornerDownLeft size={10} strokeWidth={2.5} />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </>
                    )}
                </div>

                {/* Footer navigation cues */}
                <div className="px-5 py-3 border-t border-border bg-surface/30 flex items-center justify-between text-[10px] text-text-muted/60 select-none">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <span className="font-sans font-bold bg-surface border border-border px-1 rounded">↓↑</span> Navigate
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="font-sans font-bold bg-surface border border-border px-1 rounded">↵</span> Select
                        </span>
                    </div>
                    <div>
                        <span className="flex items-center gap-1">
                            <span className="font-sans font-bold bg-surface border border-border px-1.5 py-0.5 rounded">Ctrl + K</span> to search anywhere
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
