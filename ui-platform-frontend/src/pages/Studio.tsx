import { useEffect, useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Navbar } from '../components/layout/Navbar';
import { ComponentPlayground } from '../features/playground/ComponentPlayground';
import { ComponentConfigurator } from '../features/configurator/ComponentConfigurator';
import { useComponentBySlug, useDeleteComponent } from '../hooks/useComponents';
import { useComponentStore } from '../store/useComponentStore';
import { ComponentEditor } from '../features/editor/ComponentEditor';
import { Trash2, Edit3 } from 'lucide-react';
import type { UIComponent } from '../types/component';
import { useSearchShortcut } from '../hooks/useSearchShortcut';
import { SearchModal } from '../features/search/SearchModal';
import { useAlert } from '../hooks/useAlert';
import { Skeleton } from '../components/ui/Skeleton';
import { cn } from '../utils/cn';

/**
 * Main UI Studio workspace page.
 * Features categorized listings, responsive preview frames, customizer panels,
 * and draggable layout partitioners to dynamically resize layout panels.
 */
export function Studio() {
    useSearchShortcut();

    // --- States ---
    const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [editingComponent, setEditingComponent] = useState<UIComponent | null>(null);

    // Dynamic panel height resizer states
    const [configHeight, setConfigHeight] = useState(280); // Default 280px (close to h-72)
    const [isDragging, setIsDragging] = useState(false);

    // --- Hooks & Store ---
    const { data: component, isLoading } = useComponentBySlug(selectedSlug || '');
    const { setActiveComponent, activeComponent } = useComponentStore();
    const deleteMutation = useDeleteComponent();
    const { showConfirm } = useAlert();

    // Bind selected component details to store
    useEffect(() => {
        if (component && !isCreating && !editingComponent) {
            setActiveComponent(component);
        }
    }, [component, setActiveComponent, isCreating, editingComponent]);

    // Track mouse dragging movements globally
    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            const container = document.getElementById('right-content-container');
            if (container) {
                const rect = container.getBoundingClientRect();
                // Height calculation is relative to the bottom bounds of the container
                const newHeight = rect.bottom - e.clientY;
                // Boundary locks: Minimum size of 160px, maximum size is container height minus 120px
                const clampedHeight = Math.max(160, Math.min(rect.height - 120, newHeight));
                setConfigHeight(clampedHeight);
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    // --- Handlers ---
    const handleSelectComponent = (slug: string) => {
        setIsCreating(false);
        setEditingComponent(null);
        setSelectedSlug(slug);
    };

    const handleCreateNew = () => {
        setIsCreating(true);
        setEditingComponent(null);
        setSelectedSlug(null);
    };

    const handleEdit = () => {
        if (activeComponent) {
            setEditingComponent(activeComponent);
            setIsCreating(false);
        }
    };

    const handleDelete = () => {
        if (activeComponent) {
            showConfirm({
                title: 'Delete Component',
                text: `Are you sure you want to delete "${activeComponent.name}"? This action cannot be undone.`,
                icon: 'warning',
                confirmText: 'Yes, Delete',
                cancelText: 'Cancel',
                onConfirm: () => {
                    deleteMutation.mutate(activeComponent.id, {
                        onSuccess: () => {
                            setSelectedSlug(null);
                            setEditingComponent(null);
                        }
                    });
                }
            });
        }
    };

    const isFormMode = isCreating || !!editingComponent;

    return (
        <div className="h-screen w-full flex flex-col p-4 gap-4 bg-background font-sans text-text-main overflow-hidden relative">
            <Navbar />

            {/* Drag Interaction Overlay Guard (prevents preview iframe from swallowing mousemove events) */}
            {isDragging && (
                <div className="fixed inset-0 z-50 cursor-row-resize bg-transparent select-none" />
            )}

            <div className="flex flex-1 gap-4 overflow-hidden">
                {/* SOL PANEL */}
                <Sidebar
                    onSelect={handleSelectComponent}
                    selectedSlug={selectedSlug}
                    onCreateNew={handleCreateNew}
                    isCreating={isFormMode}
                />

                {/* SAĞ İÇERİK ALANI */}
                <div id="right-content-container" className="flex-1 flex flex-col gap-4 overflow-hidden relative">

                    {/* ÜST: Playground / Editor */}
                    <main className="flex-1 rounded-3xl border border-border bg-surface backdrop-blur-xl overflow-hidden relative shadow-2xl flex flex-col">
                        {isFormMode ? (
                            <ComponentEditor
                                initialData={editingComponent}
                                onSuccess={() => {
                                    setIsCreating(false);
                                    setEditingComponent(null);
                                }}
                            />
                        ) : isLoading && selectedSlug ? (
                            <div className="flex-1 flex flex-col h-full w-full">
                                {/* Header Tabs Skeleton */}
                                <div className="flex px-6 py-4 border-b border-border bg-surface/30 justify-between items-center select-none">
                                    <div className="flex gap-4">
                                        <Skeleton className="h-4 w-16" />
                                        <Skeleton className="h-4 w-16" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                    <div className="flex gap-2">
                                        <Skeleton className="h-6 w-12" />
                                        <Skeleton className="h-6 w-20" />
                                    </div>
                                </div>
                                {/* Preview Body Skeleton */}
                                <div className="flex-1 p-8 flex items-center justify-center bg-background/10">
                                    <div className="relative w-full max-w-lg h-64 flex items-center justify-center">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/5 blur-[80px] rounded-full animate-pulse" />
                                        <div className="flex flex-col items-center gap-4">
                                            <Skeleton className="h-12 w-40 rounded-2xl" />
                                            <Skeleton className="h-3 w-28 opacity-60" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : !selectedSlug ? (
                            <div className="flex items-center justify-center h-full opacity-30 tracking-widest text-sm uppercase font-bold italic">
                                Select a Component or Create New
                            </div>
                        ) : (
                            <ComponentPlayground />
                        )}
                    </main>

                    {/* ALT: Configurator & Actions */}
                    {!isFormMode && selectedSlug && (activeComponent || isLoading) && (
                        <>
                            {/* Drag Resizer Divider Bar */}
                            <div
                                onMouseDown={() => setIsDragging(true)}
                                className={cn(
                                    "h-1.5 -my-1.5 hover:h-2 rounded-full cursor-row-resize flex items-center justify-center relative z-30 transition-all duration-150 group select-none",
                                    isDragging ? "bg-primary/50 shadow-[0_0_15px_rgba(0,210,255,0.4)]" : "bg-border/20 hover:bg-primary/30"
                                )}
                            >
                                <div className={cn(
                                    "w-12 h-1 rounded-full transition-colors",
                                    isDragging ? "bg-primary" : "bg-white/15 group-hover:bg-primary/45"
                                )} />
                            </div>

                            <aside
                                style={{ height: `${configHeight}px` }}
                                className="rounded-3xl border border-border bg-surface/50 backdrop-blur-xl overflow-hidden shadow-lg flex flex-col"
                            >
                                {/* Toolbar */}
                                <div className="px-6 py-3 border-b border-white/5 bg-white/5 flex justify-between items-center select-none">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                                        Configuration & Actions
                                    </span>
                                    <div className="flex items-center gap-2">
                                        {isLoading ? (
                                            <>
                                                <Skeleton className="h-8 w-8" />
                                                <Skeleton className="h-8 w-8" />
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={handleEdit}
                                                    className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-all cursor-pointer"
                                                    title="Edit Component"
                                                >
                                                    <Edit3 size={16} />
                                                </button>
                                                <button
                                                    onClick={handleDelete}
                                                    className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-all cursor-pointer"
                                                    title="Delete Component"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Configurator parameters container */}
                                <div className="flex-1 overflow-y-auto">
                                    {isLoading ? (
                                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="space-y-2">
                                                <Skeleton className="h-3 w-24 opacity-60" />
                                                <Skeleton className="h-10 w-full" />
                                            </div>
                                            <div className="space-y-2">
                                                <Skeleton className="h-3 w-20 opacity-60" />
                                                <Skeleton className="h-10 w-full" />
                                            </div>
                                            <div className="space-y-2">
                                                <Skeleton className="h-3 w-28 opacity-60" />
                                                <Skeleton className="h-10 w-full" />
                                            </div>
                                        </div>
                                    ) : (
                                        <ComponentConfigurator />
                                    )}
                                </div>
                            </aside>
                        </>
                    )}
                </div>
            </div>

            {/* Global Search Dialog */}
            <SearchModal onSelect={handleSelectComponent} />
        </div>
    );
}