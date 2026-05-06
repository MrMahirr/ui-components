import { useMemo } from 'react';

interface SandboxIframeProps {
    html: string | null;
    config: Record<string, any>;
    forcedState?: 'hover' | 'active' | 'focus' | 'disabled';
    fontFamily?: string;
}

/**
 * Highly isolated Sandbox Iframe rendering environment.
 * Dynamically resolves HTML variables and custom CSS properties, loads external Google Fonts stylesheets,
 * and executes programmatical Tailwind class mappings to emulate pseudo hover/active/focus/disabled states.
 */
export function SandboxIframe({ html, config, forcedState, fontFamily }: SandboxIframeProps) {
    const srcDoc = useMemo(() => {
        if (!html) return '';

        // 1. Swap template variables ({{label}}, etc.)
        let processedHtml = html;
        Object.entries(config).forEach(([key, value]) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            processedHtml = processedHtml.replace(regex, String(value));
        });

        // 2. Generate CSS custom properties
        const cssVariables = Object.entries(config)
            .map(([key, value]) => {
                const cssKey = `--${key.replace(/_/g, '-')}`;
                const cssValue = typeof value === 'number' ? `${value}px` : value;
                return `${cssKey}: ${cssValue};`;
            })
            .join('\n');

        // Google Font CDN link generation
        const fontLink = fontFamily 
            ? `<link rel="preconnect" href="https://fonts.googleapis.com">
               <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
               <link href="https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}:wght@300;400;500;700;900&display=swap" rel="stylesheet">`
            : '';

        const fontStyles = fontFamily
            ? `body, html { font-family: '${fontFamily}', ui-sans-serif, system-ui, -apple-system, sans-serif !important; }`
            : '';

        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://cdn.tailwindcss.com"></script>
                ${fontLink}
                <style>
                    :root {
                        ${cssVariables}
                    }
                    body {
                        margin: 0;
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: transparent;
                        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    }
                    ${fontStyles}
                    
                    ::-webkit-scrollbar { width: 6px; height: 6px; }
                    ::-webkit-scrollbar-track { background: transparent; }
                    ::-webkit-scrollbar-thumb { background: rgba(156, 163, 175, 0.5); border-radius: 4px; }
                </style>
            </head>
            <body>
                ${processedHtml}

                <script>
                    window.addEventListener('DOMContentLoaded', () => {
                        const forcedState = '${forcedState || ''}';
                        if (!forcedState) return;

                        // Find all elements to emulate specific pseudo hover/active/focus/disabled styling rules
                        document.querySelectorAll('*').forEach(el => {
                            if (forcedState === 'hover') {
                                const hoverClasses = Array.from(el.classList).filter(c => c.startsWith('hover:'));
                                hoverClasses.forEach(c => {
                                    el.classList.add(c.substring(6)); // strip 'hover:' prefix
                                });
                            }
                            if (forcedState === 'active') {
                                const activeClasses = Array.from(el.classList).filter(c => c.startsWith('active:'));
                                activeClasses.forEach(c => {
                                    el.classList.add(c.substring(7)); // strip 'active:' prefix
                                });
                            }
                            if (forcedState === 'focus') {
                                const focusClasses = Array.from(el.classList).filter(c => c.startsWith('focus:'));
                                focusClasses.forEach(c => {
                                    el.classList.add(c.substring(6)); // strip 'focus:' prefix
                                });
                            }
                            if (forcedState === 'disabled') {
                                el.setAttribute('disabled', 'true');
                                const disabledClasses = Array.from(el.classList).filter(c => c.startsWith('disabled:'));
                                disabledClasses.forEach(c => {
                                    el.classList.add(c.substring(9)); // strip 'disabled:' prefix
                                });
                            }
                        });
                    });
                </script>
            </body>
            </html>
        `;
    }, [html, config, forcedState, fontFamily]);

    return (
        <iframe
            srcDoc={srcDoc}
            title="Component Preview Sandbox"
            className="w-full h-full border-none bg-transparent"
            sandbox="allow-scripts allow-same-origin"
        />
    );
}