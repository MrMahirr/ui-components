import type{UIComponent} from '../types/component';

export const DUMMY_COMPONENTS: UIComponent[] = [
    {
        id: 1,
        name: 'Neon Button',
        category: 'Buttons',
        slug: 'neon-button',
        raw_react: '<button className="neon-glow px-4 py-2 text-primary">Neon Button</button>',
        raw_html: '<button class="neon-glow px-4 py-2 text-primary">Neon Button</button>',
        default_config: {colors: {primary: '#3b82f6'}, glow: true},
    },
    {
        id: 2,
        name: 'Glassmorphism Card',
        category: 'Cards',
        slug: 'glass-card',
        raw_react: '<div className="backdrop-blur-md bg-white/10 p-6 rounded-xl">Glass Content</div>',
        raw_html: '<div class="backdrop-blur-md bg-white/10 p-6 rounded-xl">Glass Content</div>',
        default_config: {padding: '24px', blur: 'md'},
    }
];