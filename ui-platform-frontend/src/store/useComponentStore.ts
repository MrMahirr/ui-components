import { create } from 'zustand';
import type { UIComponent } from '../types/component';

export interface GlobalStylesState {
    paddingX: number;
    paddingY: number;
    borderRadius: string;
    borderWidth: number;
    borderColor: string;
    opacity: number;
    fontSize: number;
    fontWeight: string;
    letterSpacing: string;
    glowColor: string;
    glowBlur: number;
    glowSpread: number;
}

export const DEFAULT_GLOBAL_STYLES: GlobalStylesState = {
    paddingX: 20,
    paddingY: 20,
    borderRadius: '16px',
    borderWidth: 0,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    opacity: 100,
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 'normal',
    glowColor: 'rgba(0, 210, 255, 0.25)',
    glowBlur: 0,
    glowSpread: 0
};

interface ComponentState {
    activeComponent: UIComponent | null;
    currentConfig: Record<string, any>;
    selectedFont: string;
    globalStyles: GlobalStylesState;
    setActiveComponent: (comp: UIComponent) => void;
    updateConfig: (key: string, value: any) => void;
    updateGlobalStyle: (key: keyof GlobalStylesState, value: any) => void;
    resetConfig: () => void;
    setSelectedFont: (font: string) => void;
}

export const useComponentStore = create<ComponentState>((set) => ({
    activeComponent: null,
    currentConfig: {},
    selectedFont: 'Inter',
    globalStyles: { ...DEFAULT_GLOBAL_STYLES },

    setActiveComponent: (comp) => set({
        activeComponent: comp,
        currentConfig: comp.default_config || {},
        globalStyles: { ...DEFAULT_GLOBAL_STYLES } // Reset layout styles for newly selected component
    }),

    updateConfig: (key, value) => set((state) => ({
        currentConfig: { ...state.currentConfig, [key]: value }
    })),

    updateGlobalStyle: (key, value) => set((state) => ({
        globalStyles: { ...state.globalStyles, [key]: value }
    })),

    resetConfig: () => set((state) => ({
        currentConfig: state.activeComponent ? state.activeComponent.default_config : {},
        selectedFont: 'Inter',
        globalStyles: { ...DEFAULT_GLOBAL_STYLES }
    })),

    setSelectedFont: (font) => set({ selectedFont: font })
}));