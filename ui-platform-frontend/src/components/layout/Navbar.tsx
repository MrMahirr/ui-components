import {LayoutTemplate, Search} from 'lucide-react';
import {ThemeSwitcher} from '../ui/ThemeSwitcher';
import {useSearch} from '../../hooks/useSearch';

export function Navbar() {
    const { toggle } = useSearch();

    return (
        <header
            className="h-16 rounded-2xl border border-border bg-surface backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-10 shadow-lg">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl text-primary shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                    <LayoutTemplate size={20} strokeWidth={2.5}/>
                </div>
                <h1 className="font-bold text-lg tracking-wide bg-gradient-to-r from-text-main to-text-muted bg-clip-text text-transparent">
                    UI Platform
                </h1>
            </div>

            <div className="flex items-center gap-4">
                {/* Yeni Tema Değiştirici */}
                <ThemeSwitcher/>

                <div className="h-px w-4 bg-border rotate-90 mx-1"/>

                <div className="flex items-center gap-2 text-text-muted">
                    <button 
                        onClick={toggle}
                        title="Search components (Ctrl + K)"
                        className="cursor-pointer p-2 hover:bg-surface-hover hover:text-primary rounded-xl transition-all flex items-center justify-center"
                    >
                        <Search size={18}/>
                    </button>
                </div>
            </div>
        </header>
    );
}