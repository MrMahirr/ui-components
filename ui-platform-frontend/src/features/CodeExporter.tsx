import { useComponentStore } from '../store/useComponentStore';
import { useMemo, useState } from 'react';

export function CodeExporter() {
    const { activeComponent, currentConfig } = useComponentStore();
    const [copied, setCopied] = useState(false);

    // HTML içindeki {{degisken}} yapılarını güncel ayarlarla değiştiriyoruz
    const finalCode = useMemo(() => {
        if (!activeComponent?.raw_html) return '';

        let html = activeComponent.raw_html;
        Object.entries(currentConfig).forEach(([key, value]) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            html = html.replace(regex, String(value));
        });

        return html;
    }, [activeComponent, currentConfig]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(finalCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Kopyalama başarısız!', err);
        }
    };

    if (!activeComponent) return null;

    return (
        <div className="mt-8 border border-white/10 rounded-xl overflow-hidden bg-[#0A0A0A]">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                <span className="text-xs font-mono text-white/50">HTML & CSS</span>
                <button
                    onClick={handleCopy}
                    className="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 rounded-md transition-colors font-medium cursor-pointer"
                >
                    {copied ? 'Kopyalandı! ✅' : 'Kodu Kopyala 📋'}
                </button>
            </div>
            <div className="p-4 overflow-x-auto max-h-64 overflow-y-auto">
        <pre className="text-xs font-mono text-green-400/80 leading-relaxed">
          <code>{finalCode}</code>
        </pre>
            </div>
        </div>
    );
}