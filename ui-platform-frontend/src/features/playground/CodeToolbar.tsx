import { Copy, Check, Download, Info } from 'lucide-react';
import { useExportComponent } from '../../hooks/useExportComponent';
import { cn } from '../../utils/cn';

interface CodeToolbarProps {
    code: string;
    language: 'react' | 'html' | 'css';
}

/**
 * High-fidelity, cosmic-themed Code Toolbar overlaying the CodeViewer area.
 * Presents copy indicators, file download triggers, and floating micro-animations.
 */
export function CodeToolbar({ code, language }: CodeToolbarProps) {
    const {
        copied,
        toastActive,
        toastMessage,
        copyToClipboard,
        downloadComponent,
    } = useExportComponent();

    const handleCopy = () => {
        const labelMap: Record<string, string> = {
            react: 'React (JSX)',
            html: 'HTML5',
            css: 'CSS Stylesheet',
        };
        copyToClipboard(code, labelMap[language] || 'Code');
    };

    const handleDownload = () => {
        const extMap: Record<string, 'tsx' | 'html' | 'css'> = {
            react: 'tsx',
            html: 'html',
            css: 'css',
        };
        downloadComponent(code, extMap[language] || 'html');
    };

    return (
        <>
            {/* Main Toolbar Panel */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2 select-none">
                {/* Language Badge */}
                <span className="px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] bg-white/5 border border-white/10 text-text-muted/80 backdrop-blur-md">
                    {language}
                </span>

                {/* Component Download Button */}
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border border-white/10 bg-white/5 text-text-muted hover:text-primary hover:border-primary/40 hover:shadow-[0_0_15px_rgba(0,210,255,0.1)] active:scale-95 cursor-pointer backdrop-blur-md"
                    title={`Bileşeni .${language === 'react' ? 'tsx' : language === 'html' ? 'html' : 'css'} olarak indir`}
                >
                    <Download size={13} strokeWidth={2.5} />
                    Download
                </button>

                {/* Component Copy Button */}
                <button
                    onClick={handleCopy}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border cursor-pointer backdrop-blur-md active:scale-95",
                        copied
                            ? "bg-green-500/10 border-green-500/30 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.15)]"
                            : "bg-white/5 border-white/10 text-text-muted hover:text-primary hover:border-primary/40"
                    )}
                >
                    {copied ? (
                        <>
                            <Check size={13} strokeWidth={3} className="animate-bounce" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy size={13} strokeWidth={2.5} />
                            Copy Code
                        </>
                    )}
                </button>
            </div>

            {/* Cosmic Glassmorphism Toast Alert */}
            <div
                className={cn(
                    "fixed top-6 right-6 z-[100] flex items-center gap-3.5 px-6 py-4 rounded-2xl border bg-background/85 backdrop-blur-xl shadow-2xl transition-all duration-500 ease-out transform pointer-events-none select-none",
                    toastActive
                        ? "opacity-100 translate-y-0 scale-100 border-primary/25 shadow-[0_15px_40px_rgba(0,210,255,0.15)]"
                        : "opacity-0 -translate-y-4 scale-95 border-transparent"
                )}
            >
                <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(0,210,255,0.15)]">
                    <Info size={15} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-primary">System Notification</span>
                    <p className="text-xs font-bold text-text-main/90 leading-tight">
                        {toastMessage}
                    </p>
                </div>
            </div>
        </>
    );
}
