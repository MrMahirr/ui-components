import Swal from 'sweetalert2';

/**
 * Custom hook to show beautiful, highly styled, and theme-adaptive SweetAlert2 dialogs.
 * Leverages global CSS variables so alerts match the active theme (light/dark mode) flawlessly.
 */
export function useAlert() {
    
    /**
     * Shows a standard informational or alert popup
     */
    const showAlert = (options: { 
        title: string; 
        text?: string; 
        icon?: 'success' | 'error' | 'warning' | 'info';
    }) => {
        return Swal.fire({
            title: options.title,
            text: options.text,
            icon: options.icon || 'info',
            background: 'var(--color-background)',
            color: 'var(--color-text-main)',
            customClass: {
                popup: 'rounded-3xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl p-6',
                title: 'text-sm font-black uppercase tracking-widest text-text-main',
                htmlContainer: 'text-xs text-text-muted/80 my-4',
                confirmButton: 'px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-[10px] text-background bg-primary hover:opacity-90 transition-all border-none cursor-pointer',
            },
            buttonsStyling: false,
        });
    };

    /**
     * Shows a confirmation dialog with dynamic actions
     */
    const showConfirm = (options: {
        title: string;
        text?: string;
        icon?: 'success' | 'error' | 'warning' | 'info' | 'question';
        confirmText?: string;
        cancelText?: string;
        onConfirm: () => void;
    }) => {
        Swal.fire({
            title: options.title,
            text: options.text,
            icon: options.icon || 'warning',
            showCancelButton: true,
            confirmButtonText: options.confirmText || 'Confirm',
            cancelButtonText: options.cancelText || 'Cancel',
            background: 'var(--color-background)',
            color: 'var(--color-text-main)',
            customClass: {
                popup: 'rounded-3xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl p-8',
                title: 'text-sm font-black uppercase tracking-widest text-text-main mt-4',
                htmlContainer: 'text-xs text-text-muted/80 my-3',
                confirmButton: 'px-5 py-2.5 mx-1.5 rounded-xl font-bold uppercase tracking-wider text-[10px] text-white bg-red-500 hover:bg-red-600 transition-colors border-none cursor-pointer',
                cancelButton: 'px-5 py-2.5 mx-1.5 rounded-xl font-bold uppercase tracking-wider text-[10px] text-text-main bg-surface/80 hover:bg-surface border border-border transition-colors cursor-pointer',
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
                options.onConfirm();
            }
        });
    };

    return {
        showAlert,
        showConfirm,
    };
}
