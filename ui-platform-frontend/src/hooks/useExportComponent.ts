import { useState, useRef } from 'react';
import { useComponentStore } from '../store/useComponentStore';

/**
 * SOLID compliant hook encapsulating Clipboard Copy and component Blob Export actions.
 * Manages reactive states for copy success icons and animated global Toast feedback.
 */
export function useExportComponent() {
    const [copied, setCopied] = useState(false);
    const [toastActive, setToastActive] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const { activeComponent } = useComponentStore();

    // Use refs to clear previous timeouts if user clicks in rapid succession
    const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    /**
     * Copies code text to clipboard and triggers a stylish Toast notification.
     */
    const copyToClipboard = async (text: string, label = 'Code') => {
        try {
            await navigator.clipboard.writeText(text);

            // Clear previous timeouts if any
            if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
            if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);

            setCopied(true);
            setToastMessage(`${label} successfully copied to clipboard!`);
            setToastActive(true);

            copyTimeoutRef.current = setTimeout(() => {
                setCopied(false);
            }, 2000);

            toastTimeoutRef.current = setTimeout(() => {
                setToastActive(false);
            }, 3000);
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
        }
    };

    /**
     * Downloads code text as an actual file using the browser Blob API.
     */
    const downloadComponent = (code: string, extension: 'tsx' | 'html' | 'css') => {
        try {
            if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);

            const slug = activeComponent?.slug || 'component';
            const filename = `${slug}.${extension}`;

            const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            URL.revokeObjectURL(url);

            setToastMessage(`Successfully downloaded ${filename}!`);
            setToastActive(true);

            toastTimeoutRef.current = setTimeout(() => {
                setToastActive(false);
            }, 3000);
        } catch (err) {
            console.error('Failed to download component:', err);
        }
    };

    return {
        copied,
        toastActive,
        toastMessage,
        copyToClipboard,
        downloadComponent,
    };
}
