import { useEffect } from 'react';
import { useSearch } from './useSearch';

/**
 * Custom hook that listens to global keyboard shortcuts:
 * - Ctrl+K or Cmd+K to toggle the Search Modal.
 * - Escape to close the Search Modal.
 */
export function useSearchShortcut() {
    const { toggle, setIsOpen } = useSearch();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Check for Ctrl+K or Cmd+K
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                toggle();
            }

            // Check for Escape to close
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [toggle, setIsOpen]);
}
