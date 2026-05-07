import {useState} from 'react';
import {Code2, MonitorPlay, FileCode2, Paintbrush, Smartphone, Tablet, Monitor, Grid} from 'lucide-react';
import {cn} from '../../utils/cn';
import {useComponentStore, type GlobalStylesState} from '../../store/useComponentStore';
import {CodeViewer} from './CodeViewer';
import {SandboxIframe} from './SandboxIframe';
import {VariationGrid} from './VariationGrid';
import type {UIComponent} from '../../types/component';
import {htmlToJsx} from '../../utils/html-to-jsx';

// UIComponent tipini genişleterek raw_css desteği ekliyoruz (TS2339 hatası için)
interface ExtendedUIComponent extends UIComponent {
    raw_css?: string | null;
}

export function ComponentPlayground() {
    const [activeTab, setActiveTab] = useState<'preview' | 'variations' | 'react' | 'html' | 'css'>('preview');
    const [styleMode, setStyleMode] = useState<'tailwind' | 'css'>('tailwind');
    const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

    const {activeComponent, currentConfig, selectedFont, globalStyles} = useComponentStore() as {
        activeComponent: ExtendedUIComponent | null,
        currentConfig: Record<string, string | number | boolean>,
        selectedFont: string,
        globalStyles: GlobalStylesState
    };

    if (!activeComponent) return null;

    // 1. Kodu işleyen fonksiyon (isReact parametresi kaldırıldı - ESLint hatası için)
    const getProcessedCode = (code: string | null, mode: 'tailwind' | 'css') => {
        if (!code) return '';
        let processed = code;
        Object.entries(currentConfig).forEach(([key, value]) => {
            processed = processed.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), String(value));
        });

        if (mode === 'css') {
            const cleanClassName = activeComponent.slug || 'ui-component';
            // Hem class hem className için tek regex (Yükü hafifletir)
            processed = processed.replace(/(class|className)="[^"]*"/g, `$1="${cleanClassName}"`);
        }
        return processed;
    };

    // 2. Akıllı HTML -> React Çevirici (Yüksek Doğruluklu AST Derleyicisi ile)
    const generateReactCode = (htmlCode: string | null, compName: string, mode: 'tailwind' | 'css') => {
        if (!htmlCode) return '';
        const resolvedHtml = getProcessedCode(htmlCode, mode);
        return htmlToJsx(resolvedHtml, compName, mode, globalStyles, selectedFont);
    };

    // Helper to generate styles matching Figma global styles layout configurator
    const generateWrapperStyles = () => {
        if (!globalStyles) return null;
        const styles: Record<string, string | number> = {};
        
        styles.padding = `"${globalStyles.paddingY}px ${globalStyles.paddingX}px"`;
        
        if (globalStyles.borderWidth > 0) {
            styles.border = `"${globalStyles.borderWidth}px solid ${globalStyles.borderColor}"`;
        }
        if (globalStyles.borderRadius && globalStyles.borderRadius !== '0px') {
            styles.borderRadius = `"${globalStyles.borderRadius}"`;
        }
        if (globalStyles.opacity !== 100) {
            styles.opacity = globalStyles.opacity / 100;
        }
        if (globalStyles.fontSize && globalStyles.fontSize !== 14) {
            styles.fontSize = `"${globalStyles.fontSize}px"`;
        }
        if (globalStyles.fontWeight && globalStyles.fontWeight !== '400') {
            styles.fontWeight = `"${globalStyles.fontWeight}"`;
        }
        if (globalStyles.letterSpacing && globalStyles.letterSpacing !== 'normal') {
            const spacingValue = 
                globalStyles.letterSpacing === 'tighter' ? '-0.05em' :
                globalStyles.letterSpacing === 'tight' ? '-0.025em' :
                globalStyles.letterSpacing === 'wide' ? '0.025em' :
                globalStyles.letterSpacing === 'wider' ? '0.05em' :
                globalStyles.letterSpacing === 'widest' ? '0.1em' : '0em';
            styles.letterSpacing = `"${spacingValue}"`;
        }
        if (selectedFont && selectedFont !== 'Inter') {
            styles.fontFamily = `"'${selectedFont}', sans-serif"`;
        }
        if (globalStyles.glowBlur > 0) {
            styles.boxShadow = `"0 0 ${globalStyles.glowBlur}px ${globalStyles.glowSpread}px ${globalStyles.glowColor}"`;
        }
        
        return styles;
    };

    const getReactWrapperStyleString = () => {
        const styles = generateWrapperStyles();
        if (!styles || Object.keys(styles).length === 0) return '';
        const props = Object.entries(styles)
            .map(([key, val]) => `${key}: ${val}`)
            .join(', ');
        return ` style={{ ${props} }}`;
    };

    // 2.5. Ham React Kodu Şablon Değişkeni İşleyici ile Global Layout Entegrasyonu
    const getProcessedReactCode = (reactCode: string) => {
        let processed = reactCode;
        Object.entries(currentConfig).forEach(([key, value]) => {
            processed = processed.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), String(value));
        });

        const stylePropsStr = getReactWrapperStyleString();
        if (stylePropsStr) {
            // Find return statement block (e.g. return ( ... );)
            const returnRegex = /(return\s*\(\s*)([\s\S]*?)(\s*\);)/;
            if (returnRegex.test(processed)) {
                processed = processed.replace(returnRegex, (_, retStart, body, retEnd) => {
                    // Prevent duplicate wrapping
                    if (body.includes('className="ui-component-wrapper"')) {
                        return `${retStart}${body}${retEnd}`;
                    }
                    // Indent the original JSX block
                    const indentedBody = body.split('\n').map((line: string) => `  ${line}`).join('\n');
                    return `${retStart}<div className="ui-component-wrapper"${stylePropsStr}>\n${indentedBody}\n  </div>${retEnd}`;
                });
            }
        }
        return processed;
    };

    // Akıllı HTML Çıktısı (Yarım Kalmış Yerleşim ve Efektleri Giydirme)
    const getProcessedHtml = (htmlCode: string | null) => {
        if (!htmlCode) return '';
        const processed = getProcessedCode(htmlCode, styleMode);
        
        if (globalStyles) {
            const rules: string[] = [];
            rules.push(`padding: ${globalStyles.paddingY}px ${globalStyles.paddingX}px;`);
            if (globalStyles.borderWidth > 0) {
                rules.push(`border: ${globalStyles.borderWidth}px solid ${globalStyles.borderColor};`);
            }
            if (globalStyles.borderRadius && globalStyles.borderRadius !== '0px') {
                rules.push(`border-radius: ${globalStyles.borderRadius};`);
            }
            if (globalStyles.opacity !== 100) {
                rules.push(`opacity: ${globalStyles.opacity / 100};`);
            }
            if (globalStyles.fontSize && globalStyles.fontSize !== 14) {
                rules.push(`font-size: ${globalStyles.fontSize}px;`);
            }
            if (globalStyles.fontWeight && globalStyles.fontWeight !== '400') {
                rules.push(`font-weight: ${globalStyles.fontWeight};`);
            }
            if (globalStyles.letterSpacing && globalStyles.letterSpacing !== 'normal') {
                const spacingValue = 
                    globalStyles.letterSpacing === 'tighter' ? '-0.05em' :
                    globalStyles.letterSpacing === 'tight' ? '-0.025em' :
                    globalStyles.letterSpacing === 'wide' ? '0.025em' :
                    globalStyles.letterSpacing === 'wider' ? '0.05em' :
                    globalStyles.letterSpacing === 'widest' ? '0.1em' : '0em';
                rules.push(`letter-spacing: ${spacingValue};`);
            }
            if (selectedFont && selectedFont !== 'Inter') {
                rules.push(`font-family: '${selectedFont}', sans-serif;`);
            }
            if (globalStyles.glowBlur > 0) {
                rules.push(`box-shadow: 0 0 ${globalStyles.glowBlur}px ${globalStyles.glowSpread}px ${globalStyles.glowColor};`);
            }

            if (rules.length > 0) {
                return `<div class="ui-component-wrapper" style="${rules.join(' ')}">\n  ${processed.split('\n').join('\n  ')}\n</div>`;
            }
        }
        return processed;
    };

    // 3. Düz CSS Çıktısı (Any kullanımı kaldırıldı)
    const generatePlainCss = (compName: string) => {
        let baseCss: string;
        if (activeComponent.raw_css) {
            baseCss = getProcessedCode(activeComponent.raw_css, 'css');
        } else {
            const safeClass = activeComponent.slug || 'ui-component';
            const safeCompName = compName.replace(/[^a-zA-Z0-9]/g, '').replace(/^[a-z]/, (m) => m.toUpperCase()).replace(/^[0-9]/, (m) => `Comp${m}`) || 'MyComponent';
            baseCss = `/* ${safeCompName}.css */\n\n.${safeClass} {\n  /* Stil kurallarınızı buraya yazın */\n  display: flex;\n}\n`;
        }

        if (globalStyles) {
            const rules: string[] = [];
            rules.push(`  padding: ${globalStyles.paddingY}px ${globalStyles.paddingX}px;`);
            if (globalStyles.borderWidth > 0) {
                rules.push(`  border: ${globalStyles.borderWidth}px solid ${globalStyles.borderColor};`);
            }
            if (globalStyles.borderRadius && globalStyles.borderRadius !== '0px') {
                rules.push(`  border-radius: ${globalStyles.borderRadius};`);
            }
            if (globalStyles.opacity !== 100) {
                rules.push(`  opacity: ${globalStyles.opacity / 100};`);
            }
            if (globalStyles.fontSize && globalStyles.fontSize !== 14) {
                rules.push(`  font-size: ${globalStyles.fontSize}px;`);
            }
            if (globalStyles.fontWeight && globalStyles.fontWeight !== '400') {
                rules.push(`  font-weight: ${globalStyles.fontWeight};`);
            }
            if (globalStyles.letterSpacing && globalStyles.letterSpacing !== 'normal') {
                const spacingValue = 
                    globalStyles.letterSpacing === 'tighter' ? '-0.05em' :
                    globalStyles.letterSpacing === 'tight' ? '-0.025em' :
                    globalStyles.letterSpacing === 'wide' ? '0.025em' :
                    globalStyles.letterSpacing === 'wider' ? '0.05em' :
                    globalStyles.letterSpacing === 'widest' ? '0.1em' : '0em';
                rules.push(`  letter-spacing: ${spacingValue};`);
            }
            if (selectedFont && selectedFont !== 'Inter') {
                rules.push(`  font-family: '${selectedFont}', sans-serif;`);
            }
            if (globalStyles.glowBlur > 0) {
                rules.push(`  box-shadow: 0 0 ${globalStyles.glowBlur}px ${globalStyles.glowSpread}px ${globalStyles.glowColor};`);
            }

            if (rules.length > 0) {
                baseCss += `\n/* Global Customizer Wrapper Styles */\n.ui-component-wrapper {\n${rules.join('\n')}\n}\n`;
            }
        }
        return baseCss;
    };

    const getActiveCode = () => {
        if (activeTab === 'react') {
            if (activeComponent.raw_react) {
                return getProcessedReactCode(activeComponent.raw_react);
            }
            return generateReactCode(activeComponent.raw_html, activeComponent.name, styleMode);
        }
        if (activeTab === 'html') return getProcessedHtml(activeComponent.raw_html);
        if (activeTab === 'css') return generatePlainCss(activeComponent.name);
        return '';
    };

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex px-4 border-b border-border bg-surface/30 justify-between items-center z-10 select-none">
                <div className="flex">
                    <TabButton active={activeTab === 'preview'} onClick={() => setActiveTab('preview')}
                               icon={<MonitorPlay size={16}/>} label="Preview"/>
                    <TabButton active={activeTab === 'variations'} onClick={() => setActiveTab('variations')}
                               icon={<Grid size={16}/>} label="Variations"/>
                    <TabButton active={activeTab === 'react'} onClick={() => setActiveTab('react')}
                               icon={<Code2 size={16}/>} label="React"/>
                    <TabButton active={activeTab === 'html'} onClick={() => setActiveTab('html')}
                               icon={<FileCode2 size={16}/>} label="HTML"/>
                    {styleMode === 'css' && (
                        <TabButton active={activeTab === 'css'} onClick={() => setActiveTab('css')}
                                   icon={<Paintbrush size={16}/>} label="CSS"/>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {activeTab === 'preview' && (
                        <div
                            className="flex items-center gap-1 bg-background/50 p-1 rounded-lg border border-border/50">
                            <ViewportButton active={viewport === 'mobile'} onClick={() => setViewport('mobile')}
                                            icon={<Smartphone size={14}/>}/>
                            <ViewportButton active={viewport === 'tablet'} onClick={() => setViewport('tablet')}
                                            icon={<Tablet size={14}/>}/>
                            <ViewportButton active={viewport === 'desktop'} onClick={() => setViewport('desktop')}
                                            icon={<Monitor size={14}/>}/>
                        </div>
                    )}

                    <div className="flex items-center gap-1 bg-background/50 p-1 rounded-lg border border-border/50">
                        <button onClick={() => {
                            setStyleMode('tailwind');
                            if (activeTab === 'css') setActiveTab('react');
                        }}
                                className={cn("px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-md transition-all cursor-pointer", styleMode === 'tailwind' ? "bg-primary text-background shadow-md" : "text-text-muted hover:text-text-main")}>Tailwind
                        </button>
                        <button onClick={() => setStyleMode('css')}
                                className={cn("px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-md transition-all cursor-pointer", styleMode === 'css' ? "bg-primary text-background shadow-md" : "text-text-muted hover:text-text-main")}>Plain
                            CSS
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-background/10 relative overflow-hidden flex items-center justify-center">
                {activeTab === 'preview' ? (
                    <div className="relative group w-full h-full p-8 flex items-center justify-center overflow-auto">
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 blur-[100px] rounded-full transition-all duration-500 pointer-events-none"/>
                        <div
                            className={cn("relative transition-all duration-500 ease-out bg-transparent", viewport === 'tablet' ? "w-[768px] h-[1024px] border-[8px] border-surface-hover rounded-[2rem] shadow-2xl overflow-hidden" : viewport === 'mobile' ? "w-[375px] h-[812px] border-[12px] border-surface-hover rounded-[2.5rem] shadow-2xl overflow-hidden" : "w-full h-full")}>
                            <SandboxIframe 
                                html={activeComponent.raw_html} 
                                config={currentConfig} 
                                fontFamily={selectedFont} 
                                globalStyles={globalStyles}
                                reactCode={activeComponent.raw_react}
                                componentName={activeComponent.name}
                            />
                        </div>
                    </div>
                ) : activeTab === 'variations' ? (
                    <VariationGrid />
                ) : (
                    <div className="w-full h-full p-8 flex items-center justify-center">
                        <CodeViewer
                            code={getActiveCode()}
                            language={(activeTab === 'css' ? 'css' : activeTab === 'react' ? 'react' : 'html') as 'react' | 'html' | 'css'}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

function TabButton({active, onClick, icon, label}: {
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string
}) {
    return (
        <button onClick={onClick}
                className={cn("flex items-center gap-2 px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2 cursor-pointer", active ? "border-primary text-primary" : "border-transparent text-text-muted hover:text-text-main")}>
            {icon} {label}
        </button>
    );
}

function ViewportButton({active, onClick, icon}: { active: boolean; onClick: () => void; icon: React.ReactNode }) {
    return (
        <button onClick={onClick}
                className={cn("p-2 rounded-md transition-all cursor-pointer", active ? "bg-primary text-background shadow-md" : "text-text-muted hover:text-text-main hover:bg-white/5")}>
            {icon}
        </button>
    );
}