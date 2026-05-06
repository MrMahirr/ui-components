import {useState} from 'react';
import type {UIComponent} from '../types/component';
import {Code2, MonitorPlay, FileCode2} from 'lucide-react';
import {cn} from '../utils/cn';

interface PlaygroundProps {
    component: UIComponent;
}

export function ComponentPlayground({component}: PlaygroundProps) {
    const [activeTab, setActiveTab] = useState<'preview' | 'react' | 'html'>('preview');

    return (
        <div
            className="flex flex-col h-full bg-background text-text-main rounded-2xl border border-border overflow-hidden">
            {/* Üst Bilgi */}
            <div className="p-6 border-b border-border bg-surface">
                <h2 className="text-2xl font-bold">{component.name}</h2>
                <span
                    className="text-sm text-text-muted mt-1 bg-background px-2 py-1 rounded-md inline-block border border-border">
          {component.category}
        </span>
            </div>

            {/* Tab Menüsü */}
            <div className="flex px-4 border-b border-border bg-surface/50">
                <TabButton active={activeTab === 'preview'} onClick={() => setActiveTab('preview')}
                           icon={<MonitorPlay size={16}/>} label="Preview"/>
                <TabButton active={activeTab === 'react'} onClick={() => setActiveTab('react')}
                           icon={<Code2 size={16}/>} label="React"/>
                <TabButton active={activeTab === 'html'} onClick={() => setActiveTab('html')}
                           icon={<FileCode2 size={16}/>} label="HTML"/>
            </div>

            {/* İçerik Alanı */}
            <div className="flex-1 p-8 bg-background relative overflow-auto flex items-center justify-center">
                {activeTab === 'preview' && (
                    <div
                        className="p-8 border border-dashed border-border rounded-xl w-full h-full flex items-center justify-center">
                        {/* Şimdilik bileşen ismini yazıyoruz, ileride gerçek bileşeni render edeceğiz */}
                        <span className="text-text-muted animate-pulse">{component.name} Bileşeni Buraya Gelecek</span>
                    </div>
                )}

                {activeTab === 'react' && (
                    <pre
                        className="w-full h-full p-4 bg-surface rounded-xl overflow-x-auto text-sm font-mono text-primary-glow border border-border">
            <code>{component.raw_react}</code>
          </pre>
                )}

                {activeTab === 'html' && (
                    <pre
                        className="w-full h-full p-4 bg-surface rounded-xl overflow-x-auto text-sm font-mono text-green-400 border border-border">
            <code>{component.raw_html}</code>
          </pre>
                )}
            </div>
        </div>
    );
}

// Alt Bileşen: Tab Butonları
function TabButton({active, onClick, icon, label}: {
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2",
                active ? "border-primary text-primary" : "border-transparent text-text-muted hover:text-text-main"
            )}
        >
            {icon} {label}
        </button>
    );
}