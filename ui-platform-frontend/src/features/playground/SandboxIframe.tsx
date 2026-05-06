import { useMemo } from 'react';

interface SandboxIframeProps {
    html: string | null;
    config: Record<string, any>;
}

export function SandboxIframe({ html, config }: SandboxIframeProps) {
    // config ve html değiştikçe iframe içeriğini yeniden oluşturuyoruz
    const srcDoc = useMemo(() => {
        if (!html) return '';

        // 1. HTML içindeki {{degisken}} değerlerini güncel config ile değiştir
        let processedHtml = html;
        Object.entries(config).forEach(([key, value]) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            processedHtml = processedHtml.replace(regex, String(value));
        });

        // 2. Config değerlerinden CSS Değişkenleri (--var-name) oluştur
        const cssVariables = Object.entries(config)
            .map(([key, value]) => {
                const cssKey = `--${key.replace(/_/g, '-')}`;
                const cssValue = typeof value === 'number' ? `${value}px` : value;
                return `${cssKey}: ${cssValue};`;
            })
            .join('\n');

        // 3. Iframe içine basılacak olan Saf HTML Belgesi
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <!-- Tailwind'i anında derlemesi için CDN ekliyoruz -->
                <script src="https://cdn.tailwindcss.com"></script>
                
                <style>
                    /* Özelleştirilebilir CSS Değişkenlerimizi Root'a basıyoruz */
                    :root {
                        ${cssVariables}
                    }
                    /* Önizleme alanını tam ortalamak için body ayarları */
                    body {
                        margin: 0;
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: transparent; /* Arka plandaki parlamayı görmek için */
                        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    }
                    /* Bileşene özel varsa scrollbar stilleri */
                    ::-webkit-scrollbar { width: 6px; height: 6px; }
                    ::-webkit-scrollbar-track { background: transparent; }
                    ::-webkit-scrollbar-thumb { background: rgba(156, 163, 175, 0.5); border-radius: 4px; }
                </style>
            </head>
            <body>
                ${processedHtml}
            </body>
            </html>
        `;
    }, [html, config]);

    return (
        <iframe
            srcDoc={srcDoc}
            title="Component Preview Sandbox"
            className="w-full h-full border-none bg-transparent"
            sandbox="allow-scripts allow-same-origin" // Güvenlik için sadece scriptlere izin veriyoruz
        />
    );
}