import { useEffect, useMemo, useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { useComponents } from '../../hooks/useComponents';
import { cn } from '../../utils/cn';
import { Skeleton } from '../ui/Skeleton';
import { groupBy } from '../../utils/group-by';

interface SidebarProps {
    onSelect: (slug: string) => void;
    selectedSlug: string | null;
    onCreateNew: () => void;
    isCreating: boolean;
}

/**
 * Premium documentation/UI-Kit style Sidebar with Accordion groupings.
 * Features auto-expanding active categories, count badges, and smooth layout height animations.
 */
export function Sidebar({ onSelect, selectedSlug, onCreateNew, isCreating }: SidebarProps) {
    const { data: components, isLoading } = useComponents();
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

    // 1. Group components by category and sort alphabetically (both headers and items)
    const groupedComponents = useMemo(() => {
        if (!components) return {};
        const groups = groupBy(components, 'category');
        
        // Sort group headers alphabetically
        const sortedKeys = Object.keys(groups).sort();
        const sortedGroups: typeof groups = {};
        
        sortedKeys.forEach(key => {
            // Sort children alphabetically by name
            sortedGroups[key] = [...groups[key]].sort((a, b) => a.name.localeCompare(b.name));
        });
        
        return sortedGroups;
    }, [components]);

    // 2. Automatically expand the accordion containing the currently selected component slug
    useEffect(() => {
        if (selectedSlug && components) {
            const activeComp = components.find(c => c.slug === selectedSlug);
            if (activeComp && activeComp.category) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setOpenCategories(prev => ({
                    ...prev,
                    [activeComp.category]: true
                }));
            }
        }
    }, [selectedSlug, components]);

    const toggleCategory = (category: string) => {
        setOpenCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    return (
        <aside className="w-64 rounded-3xl border border-border bg-surface backdrop-blur-md flex flex-col h-full overflow-hidden shadow-lg relative select-none">
            {/* Action Header Button */}
            <div className="p-4 border-b border-border/50 bg-surface/80 backdrop-blur-xl z-20">
                <button
                    onClick={onCreateNew}
                    className={cn(
                        "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-[0.15em] transition-all duration-300 border cursor-pointer",
                        isCreating
                            ? "bg-primary/20 border-primary text-primary shadow-[0_0_20px_rgba(0,210,255,0.2)]"
                            : "bg-surface-hover border-border text-text-main hover:border-primary/50 hover:text-primary"
                    )}
                >
                    <Plus size={16} strokeWidth={3} />
                    New Component
                </button>
            </div>

            {/* Scrollable Navigation Area */}
            <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                    /* Beautiful simulated Accordion Skeleton loading */
                    <div className="p-5 space-y-5 select-none">
                        {/* Group 1 Loading */}
                        <div className="space-y-2.5">
                            <div className="flex items-center justify-between px-3">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4 rounded-full" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                                <Skeleton className="h-4 w-6 rounded-full opacity-60" />
                            </div>
                            <div className="pl-6 space-y-2">
                                <Skeleton className="h-9 w-full" />
                                <Skeleton className="h-9 w-11/12" />
                            </div>
                        </div>

                        {/* Group 2 Loading */}
                        <div className="space-y-2.5">
                            <div className="flex items-center justify-between px-3">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4 rounded-full" />
                                    <Skeleton className="h-3 w-16" />
                                </div>
                                <Skeleton className="h-4 w-6 rounded-full opacity-60" />
                            </div>
                            <div className="pl-6 space-y-2">
                                <Skeleton className="h-9 w-5/6" />
                                <Skeleton className="h-9 w-full" />
                            </div>
                        </div>

                        {/* Group 3 Loading */}
                        <div className="space-y-2.5 opacity-50">
                            <div className="flex items-center justify-between px-3">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4 rounded-full" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                                <Skeleton className="h-4 w-6 rounded-full" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <nav className="p-4 space-y-1.5">
                        <div className="text-[10px] font-black text-text-muted/50 uppercase tracking-[0.25em] mb-4 pl-3">
                            Component Library
                        </div>

                        {Object.entries(groupedComponents).map(([category, items]) => {
                            const isOpen = !!openCategories[category];
                            return (
                                <div key={category} className="border-b border-border/10 last:border-none pb-1.5 last:pb-0">
                                    {/* Category Header (Accordion Trigger) */}
                                    <button
                                        onClick={() => toggleCategory(category)}
                                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.03] active:scale-[0.99] transition-all text-left group cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2">
                                            <ChevronDown
                                                size={14}
                                                strokeWidth={2.5}
                                                className={cn(
                                                    "text-text-muted/50 group-hover:text-text-main transition-transform duration-300",
                                                    isOpen ? "transform rotate-0" : "transform -rotate-90"
                                                )}
                                            />
                                            <span className="text-xs font-bold tracking-wider uppercase text-text-muted group-hover:text-text-main transition-colors">
                                                {category}
                                            </span>
                                        </div>
                                        {/* Count Badge */}
                                        <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-text-muted/80 backdrop-blur-md">
                                            {items.length}
                                        </span>
                                    </button>

                                    {/* Sub-components list using high-performance CSS grid height animation */}
                                    <div
                                        className={cn(
                                            "grid transition-all duration-300 ease-in-out overflow-hidden",
                                            isOpen ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0 pointer-events-none"
                                        )}
                                    >
                                        <div className="min-h-0 overflow-hidden space-y-1 pl-5 pr-1 py-1">
                                            {items.map((comp) => {
                                                const isActive = !isCreating && selectedSlug === comp.slug;
                                                return (
                                                    <button
                                                        key={comp.id}
                                                        onClick={() => onSelect(comp.slug)}
                                                        className={cn(
                                                            "cursor-pointer w-full text-left px-4 py-2.5 rounded-xl text-xs transition-all duration-300 border-l-[3px] relative overflow-hidden group",
                                                            isActive
                                                                ? "border-primary text-primary font-bold bg-primary/5 shadow-[inset_0px_0px_15px_rgba(0,210,255,0.04)]"
                                                                : "border-transparent text-text-muted hover:bg-white/[0.03] hover:text-text-main font-medium"
                                                        )}
                                                    >
                                                        {isActive && (
                                                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent -z-10" />
                                                        )}
                                                        <span className="relative z-10 transition-transform group-hover:translate-x-0.5 inline-block duration-200">
                                                            {comp.name}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </nav>
                )}
            </div>
        </aside>
    );
}