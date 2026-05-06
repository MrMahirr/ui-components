import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../config/ThemeContext';
import { cn } from '../../utils/cn';

export function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative flex h-9 w-16 items-center rounded-full bg-surface border border-border p-1 cursor-pointer transition-colors duration-500 hover:border-primary/50"
        >
            {/* Kayan Yuvarlak Panel */}
            <div
                className={cn(
                    "absolute h-7 w-7 rounded-full bg-primary shadow-[0_0_10px_rgba(0,210,255,0.4)] transition-all duration-500 ease-in-out flex items-center justify-center",
                    theme === 'dark' ? "translate-x-7" : "translate-x-0"
                )}
            >
                {theme === 'dark' ? (
                    <Moon size={14} className="text-background" fill="currentColor" />
                ) : (
                    <Sun size={14} className="text-background" fill="currentColor" />
                )}
            </div>

            {/* Arka Plan İkonları (Statik) */}
            <div className="flex w-full justify-between px-1.5 text-text-muted/40">
                <Sun size={14} />
                <Moon size={14} />
            </div>
        </button>
    );
}