import {useState} from 'react';
import {Code2, MonitorPlay, FileCode2, Paintbrush, Smartphone, Tablet, Monitor} from 'lucide-react';
import {cn} from '../../utils/cn';
import {useComponentStore} from '../../store/useComponentStore';
import {CodeViewer} from './CodeViewer';
import {SandboxIframe} from './SandboxIframe';
import type {UIComponent} from '../../types/component';

// UIComponent tipini genişleterek raw_css desteği ekliyoruz (TS2339 hatası için)
interface ExtendedUIComponent extends UIComponent {
    raw_css?: string | null;
}

export function ComponentPlayground() {
    const [activeTab, setActiveTab] = useState<'preview' | 'react' | 'html' | 'css'>('preview');
    const [styleMode, setStyleMode] = useState<'tailwind' | 'css'>('tailwind');
    const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

    const {activeComponent, currentConfig} = useComponentStore() as {
        activeComponent: ExtendedUIComponent | null,
        currentConfig: Record<string, string | number | boolean>
    };

    if (!activeComponent) return null;

    // 1. Kodu işleyen fonksiyon (isReact parametresi kaldırıldı - ESLint hatası için)
    const getProcessedCode = (code: string | null, mode: 'tailwind' | 'css') => {
        if (!code) return '';
        let processed = code;
        Object.entries(currentConfig).forEach(([key, value]) => {
            processed = processed.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
        });

        if (mode === 'css') {
            const cleanClassName = activeComponent.slug || 'ui-component';
            // Hem class hem className için tek regex (Yükü hafifletir)
            processed = processed.replace(/(class|className)="[^"]*"/g, `$1="${cleanClassName}"`);
        }
        return processed;
    };

    // 2. Akıllı HTML -> React Çevirici (Regex düzeltildi - TS hatası için)
    const generateReactCode = (htmlCode: string | null, compName: string, mode: 'tailwind' | 'css') => {
        if (!htmlCode) return '';
        let jsx = getProcessedCode(htmlCode, mode);

        jsx = jsx.replace(/class=/g, 'className=').replace(/for=/g, 'htmlFor=').replace(/tabindex=/g, 'tabIndex=');
        // Unnecessary escape hatası için regex düzeltildi
        jsx = jsx.replace(/<(img|input|br|hr)([^>]*[^/])>/g, '<$1$2 />');

        const safeCompName = compName.replace(/[^a-zA-Z0-9]/g, '').replace(/^[a-z]/, (m) => m.toUpperCase()) || 'MyComponent';
        const cssImport = mode === 'css' ? `import './${safeCompName}.css';\n\n` : '';

        return `import React from 'react';\n\n${cssImport}export function ${safeCompName}() {\n  return (\n    ${jsx.split('\n').join('\n    ')}\n  );\n}\n`;
    };

    // 3. Düz CSS Çıktısı (Any kullanımı kaldırıldı)
    const generatePlainCss = (compName: string) => {
        if (activeComponent.raw_css) {
            return getProcessedCode(activeComponent.raw_css, 'css');
        }
        const safeClass = activeComponent.slug || 'ui-component';
        const safeCompName = compName.replace(/[^a-zA-Z0-9]/g, '').replace(/^[a-z]/, (m) => m.toUpperCase()) || 'MyComponent';
        return `/* ${safeCompName}.css */\n\n.${safeClass} {\n  /* Stil kurallarınızı buraya yazın */\n  display: flex;\n}\n`;
    };

    const getActiveCode = () => {
        if (activeTab === 'react') return activeComponent.raw_react ? getProcessedCode(activeComponent.raw_react, styleMode) : generateReactCode(activeComponent.raw_html, activeComponent.name, styleMode);
        if (activeTab === 'html') return getProcessedCode(activeComponent.raw_html, styleMode);
        if (activeTab === 'css') return generatePlainCss(activeComponent.name);
        return '';
    };

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex px-4 border-b border-border bg-surface/30 justify-between items-center z-10">
                <div className="flex">
                    <TabButton active={activeTab === 'preview'} onClick={() => setActiveTab('preview')}
                               icon={<MonitorPlay size={16}/>} label="Preview"/>
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

            <div className="flex-1 p-8 bg-background/10 relative overflow-hidden flex items-center justify-center">
                {activeTab === 'preview' ? (
                    <div className="relative group w-full h-full flex items-center justify-center overflow-auto">
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 blur-[100px] rounded-full transition-all duration-500 pointer-events-none"/>
                        <div
                            className={cn("relative transition-all duration-500 ease-out bg-transparent", viewport === 'tablet' ? "w-[768px] h-[1024px] border-[8px] border-surface-hover rounded-[2rem] shadow-2xl overflow-hidden" : viewport === 'mobile' ? "w-[375px] h-[812px] border-[12px] border-surface-hover rounded-[2.5rem] shadow-2xl overflow-hidden" : "w-full h-full")}>
                            <SandboxIframe html={activeComponent.raw_html} config={currentConfig}/>
                        </div>
                    </div>
                ) : (
                    <CodeViewer
                        code={getActiveCode()}
                        language={(activeTab === 'css' ? 'css' : activeTab === 'react' ? 'react' : 'html') as any}
                    />
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