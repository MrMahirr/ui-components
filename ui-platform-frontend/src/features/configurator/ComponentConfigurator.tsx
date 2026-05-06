// src/features/configurator/ComponentConfigurator.tsx
import { Settings2, RotateCcw } from 'lucide-react';
import { ToggleControl, ColorControl, TextControl } from './InputControls';
import { useComponentStore } from '../../store/useComponentStore';

export function ComponentConfigurator() {
    // Zustand Store'dan verileri çekiyoruz
    const { currentConfig, updateConfig, resetConfig } = useComponentStore();

    const renderControl = (key: string, value: any) => {
        if (typeof value === 'boolean') {
            return <ToggleControl checked={value} onChange={(val) => updateConfig(key, val)} />;
        }
        if (typeof value === 'string' && value.startsWith('#')) {
            return <ColorControl value={value} onChange={(val) => updateConfig(key, val)} />;
        }
        return <TextControl value={value} onChange={(val) => updateConfig(key, val)} />;
    };

    // Eğer config boşsa (henüz bileşen seçilmediyse) paneli boş göster
    if (Object.keys(currentConfig).length === 0) return null;

    return (
        <div className="h-full flex flex-col w-full">
            {/* Header */}
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface/40">
                <div className="flex items-center gap-2 text-primary">
                    <Settings2 size={16} />
                    <span className="font-bold text-xs tracking-widest uppercase">Customizer</span>
                </div>
                <button
                    onClick={resetConfig}
                    className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 rounded-lg text-text-muted transition-all text-xs border border-border cursor-pointer"
                >
                    <RotateCcw size={14} />
                    Reset
                </button>
            </div>

            {/* Kontrol Listesi */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {Object.entries(currentConfig).map(([key, value]) => (
                    <div key={key} className="space-y-3">
                        <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] block">
                            {key.replace(/_/g, ' ')}
                        </label>
                        <div className="flex items-center min-h-[40px]">
                            {renderControl(key, value)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}