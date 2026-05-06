import type { UIComponent } from '../types/component';

export const DUMMY_COMPONENTS: UIComponent[] = [
    {
        id: 1,
        name: 'Cyber Neon Button',
        category: 'Buttons',
        slug: 'cyber-neon-button',
        raw_react: `
<button className="px-8 py-3 rounded-xl border-2 font-bold tracking-widest transition-all duration-300"
  style={{
    borderColor: '{{primary_color}}',
    color: '{{primary_color}}',
    boxShadow: '{{glow_effect}}' === 'true' ? '0 0 20px {{primary_color}}' : 'none'
  }}
>
  {{button_text}}
</button>`,
        raw_html: `
<button style="
    padding: 12px 32px;
    border-radius: 12px;
    border: 2px solid var(--primary-color, #00D2FF);
    background: transparent;
    color: var(--primary-color, #00D2FF);
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: var(--glow-effect) === 'true' ? '0 0 20px var(--primary-color)' : 'none';
">
  {{button_text}}
</button>`,
        default_config: {
            button_text: 'ACTIVATE',
            primary_color: '#00D2FF',
            glow_effect: true,
        },
    },
    {
        id: 2,
        name: 'Glassmorphism Card',
        category: 'Cards',
        slug: 'glass-card',
        raw_react: `...`,
        raw_html: `
<div style="
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(var(--blur-amount, 12)px);
    -webkit-backdrop-filter: blur(var(--blur-amount, 12)px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: var(--padding, 40)px;
    border-radius: 24px;
    color: white;
    width: 300px;
    text-align: center;
">
  <h3 style="margin: 0; color: var(--accent-color, #3A86FF);">Glass Card</h3>
  <p style="font-size: 14px; opacity: 0.6;">Modern cam efekti tasarımı.</p>
</div>`,
        default_config: {
            accent_color: '#3A86FF',
            padding: 40,
            blur_amount: 12,
        }
    }
];