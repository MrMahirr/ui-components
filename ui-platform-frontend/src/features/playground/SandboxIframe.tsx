import { useMemo } from 'react';
import type { GlobalStylesState } from '../../store/useComponentStore';
import { htmlToJsx } from '../../utils/html-to-jsx';

interface SandboxIframeProps {
    html: string | null;
    config: Record<string, any>;
    forcedState?: 'hover' | 'active' | 'focus' | 'disabled';
    fontFamily?: string;
    globalStyles?: GlobalStylesState;
    reactCode?: string | null;
    componentName?: string;
}

/**
 * Advanced Live React Sandbox Iframe Runner.
 * Loads React 18, React-DOM, and @babel/standalone dynamically in-browser.
 * Uses an AST-preprocessor to strip ES6 imports and mount raw/compiled JSX components.
 * Feeds Customizer variables to the component as React Props and synchronizes re-renders.
 */
export function SandboxIframe({ 
    html, 
    config, 
    forcedState, 
    fontFamily, 
    globalStyles,
    reactCode,
    componentName
}: SandboxIframeProps) {
    const srcDoc = useMemo(() => {
        // 1. Resolve component name safely to match React standards
        const componentClassName = componentName 
            ? componentName.replace(/[^a-zA-Z0-9]/g, '').replace(/^[a-z]/, (m) => m.toUpperCase())
            : 'MyComponent';

        // 2. Resolve source React code. If raw React is missing, parse raw HTML to JSX on-the-fly!
        const sourceReactCode = reactCode || htmlToJsx(html || '', componentClassName, 'tailwind');

        // Extract the actual defined function or const name from reactCode if present, fallback to derived componentClassName
        let actualComponentName = componentClassName;
        if (reactCode) {
            const funcMatch = reactCode.match(/(?:export\s+)?function\s+([a-zA-Z0-9_]+)\s*\(/);
            const constMatch = reactCode.match(/(?:export\s+)?const\s+([a-zA-Z0-9_]+)\s*=\s*(?:\(|\w+)/);
            if (funcMatch && funcMatch[1]) {
                actualComponentName = funcMatch[1];
            } else if (constMatch && constMatch[1]) {
                actualComponentName = constMatch[1];
            }
        }

        // 3. Pre-process React code to strip ES Modules keywords so Babel UMD runs it cleanly
        let cleanReactCode = sourceReactCode
            // Strip ES6 import lines
            .replace(/import\s+[\s\S]*?\s+from\s+['"].*?['"];?/g, '')
            .replace(/import\s+['"].*?['"];?/g, '')
            // Strip exports to avoid scope runtime issues
            .replace(/export\s+default\s+/g, '')
            .replace(/export\s+function\s+/g, 'function ')
            .replace(/export\s+const\s+/g, 'const ');

        // 3.5. Convert static double curly templates to active React reactive props
        // Ensure the main component function signature accepts 'props'
        const functionRegex = new RegExp(`(function\\s+${actualComponentName}\\s*)\\(\\s*\\)`);
        cleanReactCode = cleanReactCode.replace(functionRegex, '$1(props)');

        const arrowRegex = new RegExp(`(const\\s+${actualComponentName}\\s*=\\s*)\\(\\s*\\)(\\s*=>)`);
        cleanReactCode = cleanReactCode.replace(arrowRegex, '$1props$2');

        // Dynamically replace config key templates first
        Object.keys(config).forEach(key => {
            const quotedRegex = new RegExp(`['"]{{\\s*${key}\\s*}}['"]`, 'g');
            cleanReactCode = cleanReactCode.replace(quotedRegex, `props.${key}`);

            const partialQuotedRegex = new RegExp(`(['"])([^'"><\\r\\n]*?){{\\s*${key}\\s*}}([^'"><\\r\\n]*?)(['"])`, 'g');
            cleanReactCode = cleanReactCode.replace(partialQuotedRegex, '`$2\${props.' + key + '}$3`');

            const jsxTextRegex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
            cleanReactCode = cleanReactCode.replace(jsxTextRegex, `{props.${key}}`);
        });

        // Global fallback replacements for any remaining placeholders to guarantee zero rendering errors
        cleanReactCode = cleanReactCode
            .replace(/['"]{{\s*([a-zA-Z0-9_-]+)\s*}}['"]/g, 'props.$1')
            .replace(/(['"])([^'"><\r\n]*?){{\s*([a-zA-Z0-9_-]+)\s*}}([^'"><\r\n]*?)(['"])/g, '`$2${props.$3}$4`')
            .replace(/{{\s*([a-zA-Z0-9_-]+)\s*}}/g, '{props.$1}');

        // 4. Generate CSS custom properties
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
            ? `body, html, #component-preview-wrapper { font-family: '${fontFamily}', ui-sans-serif, system-ui, -apple-system, sans-serif !important; }`
            : '';

        // Generate custom CSS for layout preview wrapper (Figma adjustments)
        const compiledGlobalStyles = globalStyles ? `
            #component-preview-wrapper {
                padding: ${globalStyles.paddingY}px ${globalStyles.paddingX}px;
                border: ${globalStyles.borderWidth}px solid ${globalStyles.borderColor};
                border-radius: ${globalStyles.borderRadius};
                opacity: ${globalStyles.opacity / 100};
                font-size: ${globalStyles.fontSize}px;
                font-weight: ${globalStyles.fontWeight};
                letter-spacing: ${
                    globalStyles.letterSpacing === 'tighter' ? '-0.05em' :
                    globalStyles.letterSpacing === 'tight' ? '-0.025em' :
                    globalStyles.letterSpacing === 'wide' ? '0.025em' :
                    globalStyles.letterSpacing === 'wider' ? '0.05em' :
                    globalStyles.letterSpacing === 'widest' ? '0.1em' : '0em'
                };
                box-shadow: ${globalStyles.glowBlur > 0 ? `0 0 ${globalStyles.glowBlur}px ${globalStyles.glowSpread}px ${globalStyles.glowColor}` : 'none'};
                transition: all 0.25s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        ` : '';

        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://cdn.tailwindcss.com"></script>
                
                <!-- React 18 & ReactDOM UMD Libraries -->
                <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
                <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
                
                <!-- Live Babel Standalone Compiler -->
                <script src="https://unpkg.com/@babel/standalone/babel.min.js" crossorigin></script>
                
                <!-- Lucide Icons Web Integration -->
                <script src="https://unpkg.com/lucide@latest"></script>

                ${fontLink}
                <style>
                    :root {
                        ${cssVariables}
                    }
                    body {
                        margin: 0;
                        min-height: 100vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: flex-start;
                        padding: 2rem;
                        box-sizing: border-box;
                        background-color: transparent;
                        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    }
                    #component-preview-wrapper {
                        width: 100%;
                        max-width: 100%;
                        box-sizing: border-box;
                    }
                    ${fontStyles}
                    ${compiledGlobalStyles}
                    
                    ::-webkit-scrollbar { width: 6px; height: 6px; }
                    ::-webkit-scrollbar-track { background: transparent; }
                    ::-webkit-scrollbar-thumb { background: rgba(156, 163, 175, 0.5); border-radius: 4px; }
                </style>
            </head>
            <body>
                <div id="root" class="w-full flex items-center justify-center"></div>

                <!-- Live React Mount script compiled on the fly -->
                <script type="text/babel">
                    // Destructure standard hooks from Global React namespace for seamless usage in custom code
                    const { useState, useEffect, useRef, useMemo, useCallback } = React;

                    // 1. Raw React component injection
                    ${cleanReactCode}

                    // 2. High-fidelity layout wrapper component
                    const App = () => {
                        // Trigger forced layout states (Hover, Active, Focus, Disabled) after mount
                        useEffect(() => {
                            const forcedState = '${forcedState || ''}';
                            if (!forcedState) return;

                            document.querySelectorAll('#component-preview-wrapper *').forEach(el => {
                                if (forcedState === 'hover') {
                                    const hoverClasses = Array.from(el.classList).filter(c => c.startsWith('hover:'));
                                    hoverClasses.forEach(c => el.classList.add(c.substring(6)));
                                }
                                if (forcedState === 'active') {
                                    const activeClasses = Array.from(el.classList).filter(c => c.startsWith('active:'));
                                    activeClasses.forEach(c => el.classList.add(c.substring(7)));
                                }
                                if (forcedState === 'focus') {
                                    const focusClasses = Array.from(el.classList).filter(c => c.startsWith('focus:'));
                                    focusClasses.forEach(c => el.classList.add(c.substring(6)));
                                }
                                if (forcedState === 'disabled') {
                                    el.setAttribute('disabled', 'true');
                                    const disabledClasses = Array.from(el.classList).filter(c => c.startsWith('disabled:'));
                                    disabledClasses.forEach(c => el.classList.add(c.substring(9)));
                                }
                            });
                        }, []);

                        // Load Lucide icons dynamically after render
                        useEffect(() => {
                            if (window.lucide) {
                                window.lucide.createIcons();
                            }
                        });

                        const props = ${JSON.stringify(config)};

                        return (
                            <div id="component-preview-wrapper">
                                <${actualComponentName} {...props} />
                            </div>
                        );
                    };

                    // 3. Mount Application to container
                    const root = ReactDOM.createRoot(document.getElementById('root'));
                    root.render(<App />);
                </script>
            </body>
            </html>
        `;
    }, [html, config, forcedState, fontFamily, globalStyles, reactCode, componentName]);

    return (
        <iframe
            srcDoc={srcDoc}
            title="Component Preview Sandbox"
            className="w-full h-full border-none bg-transparent"
            sandbox="allow-scripts allow-same-origin"
        />
    );
}