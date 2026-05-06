import { useState, useMemo } from 'react';
import { useComponentStore } from '../store/useComponentStore';

export const POPULAR_FONTS = [
    'Inter',
    'Roboto',
    'Poppins',
    'Montserrat',
    'Outfit',
    'Lora',
    'Playfair Display',
    'Fira Code',
    'JetBrains Mono',
    'Space Grotesk',
    'Syncopate',
    'Cinzel',
    'Bebas Neue',
    'Cabin',
    'Ubuntu',
    'Syne',
    'Plus Jakarta Sans',
    'Clash Display',
    'Cabinet Grotesk',
    'Satoshi'
];

/**
 * SOLID compliant custom hook to manage selected font state, search filtering,
 * and automated Google Fonts API link injection strings.
 */
export function useGoogleFonts() {
    const { selectedFont, setSelectedFont } = useComponentStore();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFonts = useMemo(() => {
        if (!searchQuery) return POPULAR_FONTS;
        return POPULAR_FONTS.filter(font =>
            font.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    const googleFontLink = useMemo(() => {
        if (!selectedFont) return '';
        const formattedName = selectedFont.replace(/ /g, '+');
        return `https://fonts.googleapis.com/css2?family=${formattedName}:wght@300;400;500;700;900&display=swap`;
    }, [selectedFont]);

    return {
        selectedFont,
        setSelectedFont,
        searchQuery,
        setSearchQuery,
        filteredFonts,
        googleFontLink,
    };
}
