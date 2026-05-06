import { Plus } from 'lucide-react'; // Yeni ikonumuz
import { useComponents } from '../../hooks/useComponents';
import { cn } from '../../utils/cn';
import { Skeleton } from '../ui/Skeleton';

interface SidebarProps {
    onSelect: (slug: string) => void;
    selectedSlug: string | null;
    // YENİ: Oluşturma moduna geçiş fonksiyonu ve aktiflik durumu
    onCreateNew: () => void;
    isCreating: boolean;
}

export function Sidebar({ onSelect, selectedSlug, onCreateNew, isCreating }: SidebarProps) {
    const { data: components, isLoading } = useComponents();

    return (
        <aside className="w-64 rounded-3xl border border-border bg-surface backdrop-blur-md flex flex-col h-full overflow-y-auto shadow-lg relative">
            {/* YENİ: + New Component Butonu (En Üstte Sabit) */}
            <div className="p-4 border-b border-border/50 sticky top-0 bg-surface/80 backdrop-blur-xl z-20">
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

            {isLoading ? (
                <div className="p-6 space-y-4">
                    <Skeleton className="h-3 w-24 mb-6 opacity-60" />
                    <div className="space-y-2.5">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-11/12" />
                        <Skeleton className="h-10 w-5/6" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-3/4" />
                        <Skeleton className="h-10 w-11/12" />
                    </div>
                </div>
            ) : (
                <nav className="p-4 space-y-1.5 mt-2">
                    <div className="text-[11px] font-bold text-text-muted/60 uppercase tracking-[0.2em] mb-4 pl-3">
                        Components
                    </div>

                    {components?.map((comp) => (
                        <button
                            key={comp.id}
                            // Tıklandığında sadece slug gönderiyoruz
                            onClick={() => onSelect(comp.slug)}
                            className={cn(
                                "cursor-pointer w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 border-l-[3px] relative overflow-hidden group",
                                // Eğer oluşturma modunda değilsek ve bu eleman seçiliyse parlat
                                !isCreating && selectedSlug === comp.slug
                                    ? "border-primary text-primary font-medium shadow-[inset_0px_0px_20px_rgba(0,210,255,0.05)]"
                                    : "border-transparent text-text-muted hover:bg-surface-hover hover:text-text-main font-medium"
                            )}
                        >
                            {!isCreating && selectedSlug === comp.slug && (
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent -z-10" />
                            )}
                            <span className="relative z-10">{comp.name}</span>
                        </button>
                    ))}
                </nav>
            )}
        </aside>
    );
}