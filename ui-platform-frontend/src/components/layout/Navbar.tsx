import { LayoutTemplate, Search, Bell, User } from 'lucide-react';

export function Navbar() {
    return (
        <header className="h-16 border-b border-border bg-surface flex items-center justify-between px-6 shrink-0 z-10 relative">
            {/* Sol Kısım: Logo ve Başlık */}
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <LayoutTemplate size={20} />
                </div>
                <h1 className="font-bold text-lg tracking-wide text-text-main">
                    UI Platform
                </h1>
            </div>

            {/* Sağ Kısım: Araçlar ve Profil */}
            <div className="flex items-center gap-4 text-text-muted">
                <button className="p-2 hover:bg-surface-hover hover:text-text-main rounded-lg transition-colors">
                    <Search size={18} />
                </button>
                <button className="p-2 hover:bg-surface-hover hover:text-text-main rounded-lg transition-colors">
                    <Bell size={18} />
                </button>

                <div className="h-8 w-8 ml-2 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary cursor-pointer hover:bg-primary/30 transition-colors">
                    <User size={16} />
                </div>
            </div>
        </header>
    );
}