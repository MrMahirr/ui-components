import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '../../utils/cn';

interface CodeViewerProps {
    code: string;
    language: 'react' | 'html';
}

export function CodeViewer({ code, language }: CodeViewerProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Kopyalama başarısız:', err);
        }
    };

    return (
        <div className="w-full h-full relative flex items-center justify-center">
            {/* Copy Butonu Sağ Üstte İzole Edildi */}
            <button
                onClick={handleCopy}
                className={cn(
                    "absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border cursor-pointer",
                    copied
                        ? "bg-green-500/10 border-green-500 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                        : "bg-surface border-border text-text-muted hover:text-primary hover:border-primary/50"
                )}
            >
                {copied ? <><Check size={14} strokeWidth={3} className="animate-bounce" /> Copied!</> : <><Copy size={14} /> Copy Code</>}
            </button>

            <pre className="w-full h-full max-w-4xl p-8 bg-surface/30 backdrop-blur-md rounded-3xl overflow-x-auto text-xs font-mono border border-border shadow-2xl">
                <code className={language === 'react' ? 'text-primary' : 'text-green-400'}>
                    {code}
                </code>
            </pre>
        </div>
    );
}