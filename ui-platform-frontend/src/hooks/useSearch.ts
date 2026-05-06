import { create } from 'zustand';

interface SearchState {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    toggle: () => void;
}

const useSearchStore = create<SearchState>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen }),
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

/**
 * Custom hook to manage the global search modal state.
 * Employs Zustand under the hood for highly responsive, lightweight state management.
 */
export function useSearch() {
    const isOpen = useSearchStore((state) => state.isOpen);
    const setIsOpen = useSearchStore((state) => state.setIsOpen);
    const toggle = useSearchStore((state) => state.toggle);

    return {
        isOpen,
        setIsOpen,
        toggle,
    };
}
