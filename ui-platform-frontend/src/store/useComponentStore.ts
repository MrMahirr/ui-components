import { create } from 'zustand';
import type { UIComponent } from '../types/component'; // Senin dosyan

interface ComponentState {
    activeComponent: UIComponent | null;
    currentConfig: Record<string, any>;
    selectedFont: string;
    setActiveComponent: (comp: UIComponent) => void;
    updateConfig: (key: string, value: any) => void;
    resetConfig: () => void;
    setSelectedFont: (font: string) => void;
}

export const useComponentStore = create<ComponentState>((set) => ({
    activeComponent: null,
    currentConfig: {},
    selectedFont: 'Inter',

    setActiveComponent: (comp) => set({
        activeComponent: comp,
        currentConfig: comp.default_config || {} // Backend'den null gelirse çökmemesi için fallback
    }),

    updateConfig: (key, value) => set((state) => ({
        currentConfig: { ...state.currentConfig, [key]: value }
    })),

    resetConfig: () => set((state) => ({
        currentConfig: state.activeComponent ? state.activeComponent.default_config : {},
        selectedFont: 'Inter'
    })),

    setSelectedFont: (font) => set({ selectedFont: font })
}));