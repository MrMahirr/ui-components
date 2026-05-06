import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind class'larını güvenli bir şekilde birleştirir.
 * Örn: cn('bg-blue-500', isHovered && 'bg-blue-600')
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}