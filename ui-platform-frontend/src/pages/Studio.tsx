import {useEffect, useState} from 'react';
import {Sidebar} from '../components/layout/Sidebar';
import {Navbar} from '../components/layout/Navbar';
import {ComponentPlayground} from '../features/playground/ComponentPlayground';
import {ComponentConfigurator} from '../features/configurator/ComponentConfigurator';
import {useComponentBySlug, useDeleteComponent} from '../hooks/useComponents';
import {useComponentStore} from '../store/useComponentStore';
import {ComponentEditor} from '../features/editor/ComponentEditor';
import {Trash2, Edit3} from 'lucide-react'; // Aksiyon ikonları
import type {UIComponent} from '../types/component';
import {useSearchShortcut} from '../hooks/useSearchShortcut';
import {SearchModal} from '../features/search/SearchModal';
import {useAlert} from '../hooks/useAlert';
import {Skeleton} from '../components/ui/Skeleton';

export function Studio() {
    // --- Register keyboard shortcuts for search (Ctrl + K) ---
    useSearchShortcut();

    // --- States ---
    const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [editingComponent, setEditingComponent] = useState<UIComponent | null>(null);

    // --- Hooks & Store ---
    const {data: component, isLoading} = useComponentBySlug(selectedSlug || '');
    const {setActiveComponent, activeComponent} = useComponentStore();
    const deleteMutation = useDeleteComponent();
    const {showConfirm} = useAlert();

    // Seçilen bileşeni store'a aktar
    useEffect(() => {
        if (component && !isCreating && !editingComponent) {
            setActiveComponent(component);
        }
    }, [component, setActiveComponent, isCreating, editingComponent]);

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
                title: 'Bileşeni Sil',
                text: `"${activeComponent.name}" bileşenini silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`,
                icon: 'warning',
                confirmText: 'Evet, Sil',
                cancelText: 'Vazgeç',
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

    // Form modunda mıyız? (Yeni kayıt veya Düzenleme)
    const isFormMode = isCreating || !!editingComponent;

    return (
        <div className="h-screen w-full flex flex-col p-4 gap-4 bg-background font-sans text-text-main overflow-hidden">
            <Navbar/>

            <div className="flex flex-1 gap-4 overflow-hidden">
                {/* SOL PANEL */}
                <Sidebar
                    onSelect={handleSelectComponent}
                    selectedSlug={selectedSlug}
                    onCreateNew={handleCreateNew}
                    isCreating={isFormMode}
                />

                {/* SAĞ İÇERİK ALANI */}
                <div className="flex-1 flex flex-col gap-4 overflow-hidden">

                    {/* ÜST: Playground / Editor */}
                    <main
                        className="flex-1 rounded-3xl border border-border bg-surface backdrop-blur-xl overflow-hidden relative shadow-2xl flex flex-col">
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
                                        {/* Background Pulse Glow */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/5 blur-[80px] rounded-full animate-pulse" />
                                        {/* Center component mockup */}
                                        <div className="flex flex-col items-center gap-4">
                                            <Skeleton className="h-12 w-40 rounded-2xl" />
                                            <Skeleton className="h-3 w-28 opacity-60" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : !selectedSlug ? (
                            <div
                                className="flex items-center justify-center h-full opacity-30 tracking-widest text-sm uppercase font-bold italic">
                                Bir Bileşen Seçin veya Yeni Oluşturun
                            </div>
                        ) : (
                            <ComponentPlayground/>
                        )}
                    </main>

                    {/* ALT: Configurator & Actions */}
                    {!isFormMode && selectedSlug && (activeComponent || isLoading) && (
                        <aside
                            className="h-72 rounded-3xl border border-border bg-surface/50 backdrop-blur-xl overflow-hidden shadow-lg flex flex-col">
                            {/* Toolbar */}
                            <div
                                className="px-6 py-3 border-b border-white/5 bg-white/5 flex justify-between items-center">
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
                                                title="Bileşeni Düzenle"
                                            >
                                                <Edit3 size={16}/>
                                            </button>
                                            <button
                                                onClick={handleDelete}
                                                className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-all cursor-pointer"
                                                title="Bileşeni Sil"
                                            >
                                                <Trash2 size={16}/>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Ayarlar Listesi */}
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
                                    <ComponentConfigurator/>
                                )}
                            </div>
                        </aside>
                    )}
                </div>
            </div>
            
            {/* Global Search Dialog */}
            <SearchModal onSelect={handleSelectComponent} />
        </div>
    );
}