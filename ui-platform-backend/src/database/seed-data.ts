export const INITIAL_COMPONENTS: any[] = [
  // ==========================================
  // 1. KATEGORİ: BUTTONS (1-10)
  // ==========================================
  {
    name: 'Neon Glow Button',
    category: 'Buttons',
    slug: 'neon-glow-button',
    raw_html: `
      <button class="relative px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 border bg-transparent hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
        style="color: {{text_color}}; border-color: {{neon_color}}; box-shadow: 0 0 15px {{neon_color}};">
        {{label}}
      </button>
    `,
    raw_react: `import React from 'react';

export function NeonGlowButton() {
  return (
    <button 
      className="relative px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 border bg-transparent hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
      style={{
        color: '{{text_color}}',
        borderColor: '{{neon_color}}',
        boxShadow: '0 0 15px {{neon_color}}'
      }}
    >
      {{label}}
    </button>
  );
}`,
    default_config: { label: 'GLOW', neon_color: '#00D2FF', text_color: '#FFFFFF' },
  },
  {
    name: 'Glassmorphism Button',
    category: 'Buttons',
    slug: 'glassmorphism-button',
    raw_html: `
      <button class="px-8 py-3.5 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:bg-white/10 active:scale-95 cursor-pointer text-sm font-semibold tracking-wide"
        style="background: rgba(255, 255, 255, {{bg_opacity}}); border-color: {{border_color}}; color: {{text_color}};">
        {{label}}
      </button>
    `,
    raw_react: `import React from 'react';

export function GlassmorphismButton() {
  return (
    <button 
      className="px-8 py-3.5 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:bg-white/10 active:scale-95 cursor-pointer text-sm font-semibold tracking-wide"
      style={{
        background: 'rgba(255, 255, 255, {{bg_opacity}})',
        borderColor: '{{border_color}}',
        color: '{{text_color}}'
      }}
    >
      {{label}}
    </button>
  );
}`,
    default_config: { label: 'EXPLORE GLASS', border_color: 'rgba(255, 255, 255, 0.15)', bg_opacity: 0.05, text_color: '#FFFFFF' },
  },
  {
    name: 'Cyberpunk Glitch Button',
    category: 'Buttons',
    slug: 'cyberpunk-glitch-button',
    raw_html: `
      <div class="relative group">
        <button class="relative px-8 py-3.5 bg-transparent border-2 font-black uppercase tracking-widest text-xs cursor-pointer transition-all duration-100 active:translate-x-1"
          style="color: {{color}}; border-color: {{color}};">
          {{label}}
          <span class="absolute inset-0 bg-transparent -z-10 group-hover:bg-red-500/10 transition-colors"></span>
        </button>
        <div class="absolute -inset-1 border border-dashed pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" style="border-color: {{hover_color}};"></div>
      </div>
    `,
    raw_react: `import React from 'react';

export function CyberpunkGlitchButton() {
  return (
    <div className="relative group">
      <button 
        className="relative px-8 py-3.5 bg-transparent border-2 font-black uppercase tracking-widest text-xs cursor-pointer transition-all duration-100 active:translate-x-1"
        style={{ color: '{{color}}', borderColor: '{{color}}' }}
      >
        {{label}}
        <span className="absolute inset-0 bg-transparent -z-10 group-hover:bg-red-500/10 transition-colors"></span>
      </button>
      <div 
        className="absolute -inset-1 border border-dashed pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" 
        style={{ borderColor: '{{hover_color}}' }}
      ></div>
    </div>
  );
}`,
    default_config: { label: 'INITIALIZE', color: '#FF003C', hover_color: '#00FFDD' },
  },
  {
    name: 'Shimmer Border Button',
    category: 'Buttons',
    slug: 'shimmer-border-button',
    raw_html: `
      <button class="relative p-[1px] rounded-xl overflow-hidden cursor-pointer active:scale-98 transition-transform"
        style="background: linear-gradient(90deg, transparent 30%, {{shimmer_color}} 50%, transparent 70%); background-size: 200% 100%; animation: shimmer {{speed}}s infinite linear;">
        <span class="block px-8 py-3.5 rounded-xl bg-black/90 text-xs font-black uppercase tracking-widest text-white">
          {{label}}
        </span>
      </button>
      <style>
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
      </style>
    `,
    raw_react: `import React from 'react';

export function ShimmerBorderButton() {
  return (
    <button 
      className="relative p-[1px] rounded-xl overflow-hidden cursor-pointer active:scale-98 transition-transform"
      style={{
        background: 'linear-gradient(90deg, transparent 30%, {{shimmer_color}} 50%, transparent 70%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer {{speed}}s infinite linear'
      }}
    >
      <span className="block px-8 py-3.5 rounded-xl bg-black/90 text-xs font-black uppercase tracking-widest text-white">
        {{label}}
      </span>
    </button>
  );
}`,
    default_config: { label: 'SHIMMER', shimmer_color: '#6366F1', speed: 2 },
  },
  {
    name: 'Magnetic Spring Button',
    category: 'Buttons',
    slug: 'magnetic-spring-button',
    raw_html: `
      <button class="px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 ease-out border shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
        style="background: {{color}}; color: #000; border-color: {{color}};">
        {{label}}
      </button>
    `,
    raw_react: `import React from 'react';

export function MagneticSpringButton() {
  return (
    <button 
      className="px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 ease-out border shadow-lg hover:shadow-xl active:scale-95 cursor-pointer hover:scale-105"
      style={{
        background: '{{color}}',
        color: '#000',
        borderColor: '{{color}}'
      }}
    >
      {{label}}
    </button>
  );
}`,
    default_config: { label: 'SPRING LOAD', color: '#10B981' },
  },
  {
    name: 'Double Border Pulse Button',
    category: 'Buttons',
    slug: 'double-pulse-button',
    raw_html: `
      <button class="relative px-8 py-3.5 rounded-xl border border-border bg-surface text-text-main font-bold uppercase tracking-wider text-xs transition-all hover:border-primary cursor-pointer active:scale-95 group">
        {{label}}
        <span class="absolute inset-0 rounded-xl border opacity-0 group-hover:opacity-100 group-hover:scale-115 transition-all duration-500 pointer-events-none" style="border-color: {{pulse_color}};"></span>
      </button>
    `,
    raw_react: `import React from 'react';

export function DoubleBorderPulseButton() {
  return (
    <button className="relative px-8 py-3.5 rounded-xl border border-border bg-surface text-text-main font-bold uppercase tracking-wider text-xs transition-all hover:border-primary cursor-pointer active:scale-95 group">
      {{label}}
      <span 
        className="absolute inset-0 rounded-xl border opacity-0 group-hover:opacity-100 group-hover:scale-115 transition-all duration-500 pointer-events-none" 
        style={{ borderColor: '{{pulse_color}}' }}
      ></span>
    </button>
  );
}`,
    default_config: { label: 'PULSE EFFECT', pulse_color: '#A855F7' },
  },
  {
    name: 'Liquid Fill Button',
    category: 'Buttons',
    slug: 'liquid-fill-button',
    raw_html: `
      <button class="relative px-8 py-3.5 overflow-hidden rounded-xl border font-bold uppercase tracking-wider text-xs cursor-pointer active:scale-95 group transition-all"
        style="color: {{border_color}}; border-color: {{border_color}};">
        <span class="relative z-10 transition-colors duration-300 group-hover:text-black">{{label}}</span>
        <div class="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" style="background: {{fill_color}};"></div>
      </button>
    `,
    raw_react: `import React from 'react';

export function LiquidFillButton() {
  return (
    <button 
      className="relative px-8 py-3.5 overflow-hidden rounded-xl border font-bold uppercase tracking-wider text-xs cursor-pointer active:scale-95 group transition-all"
      style={{ color: '{{border_color}}', borderColor: '{{border_color}}' }}
    >
      <span className="relative z-10 transition-colors duration-300 group-hover:text-black">{{label}}</span>
      <div 
        className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" 
        style={{ background: '{{fill_color}}' }}
      ></div>
    </button>
  );
}`,
    default_config: { label: 'LIQUID WATER', fill_color: '#F43F5E', border_color: '#F43F5E' },
  },
  {
    name: 'Underline Wave Button',
    category: 'Buttons',
    slug: 'underline-wave-button',
    raw_html: `
      <button class="relative px-4 py-2 bg-transparent border-none text-sm font-semibold tracking-wider cursor-pointer group"
        style="color: {{text_color}};">
        {{label}}
        <span class="absolute left-0 bottom-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" style="background: {{hover_color}};"></span>
      </button>
    `,
    raw_react: `import React from 'react';

export function UnderlineWaveButton() {
  return (
    <button 
      className="relative px-4 py-2 bg-transparent border-none text-sm font-semibold tracking-wider cursor-pointer group"
      style={{ color: '{{text_color}}' }}
    >
      {{label}}
      <span 
        className="absolute left-0 bottom-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" 
        style={{ background: '{{hover_color}}' }}
      ></span>
    </button>
  );
}`,
    default_config: { label: 'HOVER SLIDE', hover_color: '#F59E0B', text_color: '#FFFFFF' },
  },
  {
    name: 'Retro Arcade Button',
    category: 'Buttons',
    slug: 'retro-arcade-button',
    raw_html: `
      <button class="px-6 py-3 border-4 font-mono font-black uppercase text-xs cursor-pointer select-none active:translate-x-1 active:translate-y-1 active:shadow-none"
        style="color: {{color}}; border-color: {{color}}; background: #000; box-shadow: 4px 4px 0px {{color}};">
        {{label}}
      </button>
    `,
    raw_react: `import React from 'react';

export function RetroArcadeButton() {
  return (
    <button 
      className="px-6 py-3 border-4 font-mono font-black uppercase text-xs cursor-pointer select-none active:translate-x-1 active:translate-y-1 active:shadow-none"
      style={{
        color: '{{color}}',
        borderColor: '{{color}}',
        background: '#000',
        boxShadow: '4px 4px 0px {{color}}'
      }}
    >
      {{label}}
    </button>
  );
}`,
    default_config: { label: 'START GAME', color: '#3B82F6' },
  },
  {
    name: 'Expand Arrow Button',
    category: 'Buttons',
    slug: 'expand-arrow-button',
    raw_html: `
      <button class="flex items-center gap-2 px-8 py-3.5 bg-white text-black hover:gap-4 transition-all duration-300 font-bold rounded-2xl cursor-pointer text-xs uppercase tracking-widest">
        <span>{{label}}</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
        </svg>
      </button>
    `,
    raw_react: `import React from 'react';

export function ExpandArrowButton() {
  return (
    <button className="flex items-center gap-2 px-8 py-3.5 bg-white text-black hover:gap-4 transition-all duration-300 font-bold rounded-2xl cursor-pointer text-xs uppercase tracking-widest">
      <span>{{label}}</span>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
      </svg>
    </button>
  );
}`,
    default_config: { label: 'CONTINUE' },
  },

  // ==========================================
  // 2. KATEGORİ: CARDS & DISPLAYS (11-20)
  // ==========================================
  {
    name: '3D Tilt Parallax Card',
    category: 'Cards',
    slug: '3d-tilt-parallax-card',
    raw_html: `
      <div class="w-72 h-[380px] rounded-3xl border border-border backdrop-blur-md flex flex-col p-6 transition-all duration-500 ease-out hover:scale-102 hover:rotate-2 shadow-2xl cursor-pointer"
        style="background: {{card_bg}};">
        <div class="text-[10px] font-black tracking-widest text-primary uppercase mb-2">INTELLIGENCE</div>
        <h3 class="text-xl font-bold mb-4">{{title}}</h3>
        <p class="text-xs text-text-muted leading-relaxed mb-6">{{desc}}</p>
        <div class="mt-auto flex items-center justify-between">
          <span class="text-[10px] font-mono tracking-widest text-text-muted/60">SYS_V2.0</span>
          <div class="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
        </div>
      </div>
    `,
    raw_react: `import React from 'react';

export function ThreeDTiltParallaxCard() {
  return (
    <div 
      className="w-72 h-[380px] rounded-3xl border border-border backdrop-blur-md flex flex-col p-6 transition-all duration-500 ease-out hover:scale-102 hover:rotate-2 shadow-2xl cursor-pointer"
      style={{ background: '{{card_bg}}' }}
    >
      <div className="text-[10px] font-black tracking-widest text-primary uppercase mb-2">INTELLIGENCE</div>
      <h3 className="text-xl font-bold mb-4">{{title}}</h3>
      <p className="text-xs text-text-muted leading-relaxed mb-6">{{desc}}</p>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-[10px] font-mono tracking-widest text-text-muted/60">SYS_V2.0</span>
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
      </div>
    </div>
  );
}`,
    default_config: { title: 'QUANTUM GRID', desc: 'Real-time multi-threaded cluster mesh networks processing global transaction logs.', card_bg: 'rgba(255, 255, 255, 0.02)' },
  },
  {
    name: 'Edge Glow Border Card',
    category: 'Cards',
    slug: 'edge-glow-card',
    raw_html: `
      <div class="relative w-72 h-80 rounded-2xl overflow-hidden p-[1px] group cursor-pointer">
        <div class="absolute inset-0 bg-transparent transition-all group-hover:scale-110" 
          style="background: radial-gradient(circle at center, {{glow_color}} 0%, transparent 80%);"></div>
        <div class="relative h-full w-full bg-[#05050A]/95 rounded-2xl p-6 flex flex-col">
          <span class="text-[9px] font-mono text-text-muted">{{category_tag}}</span>
          <h3 class="text-md font-bold mt-2 text-white group-hover:text-primary transition-colors">{{title}}</h3>
          <p class="text-xs text-text-muted mt-3 leading-relaxed">{{text}}</p>
        </div>
      </div>
    `,
    raw_react: `import React from 'react';

export function EdgeGlowBorderCard() {
  return (
    <div className="relative w-72 h-80 rounded-2xl overflow-hidden p-[1px] group cursor-pointer">
      <div 
        className="absolute inset-0 bg-transparent transition-all group-hover:scale-110" 
        style={{ background: 'radial-gradient(circle at center, {{glow_color}} 0%, transparent 80%)' }}
      ></div>
      <div className="relative h-full w-full bg-[#05050A]/95 rounded-2xl p-6 flex flex-col">
        <span className="text-[9px] font-mono text-text-muted">{{category_tag}}</span>
        <h3 className="text-md font-bold mt-2 text-white group-hover:text-primary transition-colors">{{title}}</h3>
        <p className="text-xs text-text-muted mt-3 leading-relaxed">{{text}}</p>
      </div>
    </div>
  );
}`,
    default_config: { title: 'NEURAL FLUIDS', text: 'Simulating complex particle trajectories inside liquid glass compartments.', category_tag: 'MODULE_04', glow_color: '#00D2FF' },
  },
  {
    name: 'Glassmorphism Profile Card',
    category: 'Cards',
    slug: 'glass-profile-card',
    raw_html: `
      <div class="w-80 rounded-3xl border p-6 backdrop-blur-xl flex flex-col items-center text-center shadow-xl"
        style="background: rgba(255, 255, 255, 0.03); border-color: rgba(255, 255, 255, 0.08);">
        <div class="w-20 h-20 rounded-full mb-4 border-2 p-1" style="border-color: {{theme_color}};">
          <div class="w-full h-full rounded-full bg-cover" style="background-image: url('{{avatar_url}}');"></div>
        </div>
        <h4 class="text-md font-bold text-white">{{username}}</h4>
        <span class="text-xs text-text-muted mt-1">{{role}}</span>
        <div class="flex gap-4 mt-6 w-full">
          <button class="flex-1 py-2.5 rounded-xl font-bold text-xs uppercase cursor-pointer transition-all hover:opacity-90 text-black"
            style="background: {{theme_color}};">Follow</button>
        </div>
      </div>
    `,
    raw_react: `import React from 'react';

export function GlassmorphismProfileCard() {
  return (
    <div 
      className="w-80 rounded-3xl border p-6 backdrop-blur-xl flex flex-col items-center text-center shadow-xl"
      style={{ background: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.08)' }}
    >
      <div className="w-20 h-20 rounded-full mb-4 border-2 p-1" style={{ borderColor: '{{theme_color}}' }}>
        <div className="w-full h-full rounded-full bg-cover bg-center" style={{ backgroundImage: "url('{{avatar_url}}')" }}></div>
      </div>
      <h4 className="text-md font-bold text-white">{{username}}</h4>
      <span className="text-xs text-text-muted mt-1">{{role}}</span>
      <div className="flex gap-4 mt-6 w-full">
        <button 
          className="flex-1 py-2.5 rounded-xl font-bold text-xs uppercase cursor-pointer transition-all hover:opacity-90 text-black animate-pulse"
          style={{ background: '{{theme_color}}' }}
        >
          Follow
        </button>
      </div>
    </div>
  );
}`,
    default_config: { username: 'Elena Rostova', role: 'Chief Creative Officer', theme_color: '#00D2FF', avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
  },
  {
    name: 'Slanted Hover Reveal Card',
    category: 'Cards',
    slug: 'slanted-reveal-card',
    raw_html: `
      <div class="relative w-72 h-80 overflow-hidden rounded-3xl border border-border bg-surface flex flex-col justify-end p-6 cursor-pointer group">
        <div class="absolute inset-0 -skew-y-6 translate-y-3/4 group-hover:translate-y-0 transition-transform duration-500 ease-out"
          style="background: {{hover_bg}};"></div>
        <div class="relative z-10">
          <h3 class="text-lg font-black uppercase text-white group-hover:text-black transition-colors">{{title}}</h3>
          <p class="text-xs text-text-muted group-hover:text-black/80 transition-colors mt-2">{{desc}}</p>
        </div>
      </div>
    `,
    raw_react: `import React from 'react';

export function SlantedHoverRevealCard() {
  return (
    <div className="relative w-72 h-80 overflow-hidden rounded-3xl border border-border bg-surface flex flex-col justify-end p-6 cursor-pointer group">
      <div 
        className="absolute inset-0 -skew-y-6 translate-y-3/4 group-hover:translate-y-0 transition-transform duration-500 ease-out"
        style={{ background: '{{hover_bg}}' }}
      ></div>
      <div className="relative z-10">
        <h3 className="text-lg font-black uppercase text-white group-hover:text-black transition-colors">{{title}}</h3>
        <p className="text-xs text-text-muted group-hover:text-black/80 transition-colors mt-2">{{desc}}</p>
      </div>
    </div>
  );
}`,
    default_config: { title: 'EXPLORATION', desc: 'Journeying deep into virtual cyber spaces and interactive WebGL shaders.', hover_bg: '#8B5CF6' },
  },
  {
    name: 'Retro CRT Display Card',
    category: 'Cards',
    slug: 'retro-crt-card',
    raw_html: `
      <div class="w-80 bg-black border-2 border-green-500 rounded-2xl overflow-hidden p-4 relative font-mono shadow-[0_0_20px_rgba(34,197,94,0.15)]">
        <div class="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none"></div>
        <div class="flex items-center justify-between border-b border-green-500/30 pb-2 mb-4">
          <span class="text-[10px] text-green-500/80">{{title}}</span>
          <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        </div>
        <div class="text-xs text-green-400 space-y-1">
          <p>> {{status_text}}</p>
          <p>> LATENCY: 14MS</p>
          <p>> ACCESS: GRANTED</p>
        </div>
      </div>
    `,
    raw_react: `import React from 'react';

export function RetroCRTDisplayCard() {
  return (
    <div className="w-80 bg-black border-2 border-green-500 rounded-2xl overflow-hidden p-4 relative font-mono shadow-[0_0_20px_rgba(34,197,94,0.15)]">
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none"></div>
      <div className="flex items-center justify-between border-b border-green-500/30 pb-2 mb-4">
        <span className="text-[10px] text-green-500/80">{{title}}</span>
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
      </div>
      <div className="text-xs text-green-400 space-y-1">
        <p>&gt; {{status_text}}</p>
        <p>&gt; LATENCY: 14MS</p>
        <p>&gt; ACCESS: GRANTED</p>
      </div>
    </div>
  );
}`,
    default_config: { title: 'MAINFRAME_V1', status_text: 'ONLINE SYSTEM RUNNING.' },
  },
  {
    name: 'Holographic Foil Card',
    category: 'Cards',
    slug: 'holo-foil-card',
    raw_html: `
      <div class="relative w-72 h-96 rounded-3xl border p-6 overflow-hidden flex flex-col justify-end cursor-pointer group"
        style="background: rgba(255,255,255,0.02); border-color: rgba(255,255,255,0.06);">
        <div class="absolute inset-0 bg-gradient-to-tr from-pink-500/10 via-cyan-500/10 to-yellow-500/10 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000 ease-out"></div>
        <h3 class="text-xl font-bold text-white z-10">{{title}}</h3>
        <p class="text-xs text-text-muted mt-2 z-10">{{text}}</p>
      </div>
    `,
    raw_react: `import React from 'react';

export function HolographicFoilCard() {
  return (
    <div 
      className="relative w-72 h-96 rounded-3xl border p-6 overflow-hidden flex flex-col justify-end cursor-pointer group"
      style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 via-cyan-500/10 to-yellow-500/10 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000 ease-out"></div>
      <h3 className="text-xl font-bold text-white z-10">{{title}}</h3>
      <p className="text-xs text-text-muted mt-2 z-10">{{text}}</p>
    </div>
  );
}`,
    default_config: { title: 'AURORA GLINT', text: 'Capturing electromagnetic noise patterns across cosmic satellite transponders.' },
  },
  {
    name: 'Diagnostic System HUD Card',
    category: 'Cards',
    slug: 'hud-card',
    raw_html: `
      <div class="w-80 rounded-2xl border border-red-500/30 bg-[#0F0505] p-5 font-mono shadow-lg">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></div>
          <span class="text-xs text-red-500 font-bold uppercase tracking-widest">{{label}}</span>
        </div>
        <div class="text-3xl font-black text-white mb-4">{{value}}</div>
        <div class="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div class="h-full bg-red-500" style="width: {{percent}}%;"></div>
        </div>
      </div>
    `,
    raw_react: `import React from 'react';

export function DiagnosticSystemHUDCard() {
  return (
    <div className="w-80 rounded-2xl border border-red-500/30 bg-[#0F0505] p-5 font-mono shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></div>
        <span className="text-xs text-red-500 font-bold uppercase tracking-widest">{{label}}</span>
      </div>
      <div className="text-3xl font-black text-white mb-4">{{value}}</div>
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-red-500" style={{ width: '{{percent}}%' }}></div>
      </div>
    </div>
  );
}`,
    default_config: { label: 'CORE OVERLOAD', value: '94.8%', percent: 94 },
  },
  {
    name: 'Neumorphism Dark Card',
    category: 'Cards',
    slug: 'neumorph-card',
    raw_html: `
      <div class="w-72 h-80 rounded-[2.5rem] bg-[#0E0F14] flex flex-col items-center justify-center text-center p-6"
        style="box-shadow: 12px 12px 24px #07070a, -12px -12px 24px #15171e;">
        <h3 class="text-lg font-bold text-white">{{title}}</h3>
        <p class="text-xs text-text-muted mt-3 px-4">{{desc}}</p>
      </div>
    `,
    raw_react: `import React from 'react';

export function NeumorphismDarkCard() {
  return (
    <div 
      className="w-72 h-80 rounded-[2.5rem] bg-[#0E0F14] flex flex-col items-center justify-center text-center p-6"
      style={{ boxShadow: '12px 12px 24px #07070a, -12px -12px 24px #15171e' }}
    >
      <h3 className="text-lg font-bold text-white">{{title}}</h3>
      <p className="text-xs text-text-muted mt-3 px-4">{{desc}}</p>
    </div>
  );
}`,
    default_config: { title: 'SOFT SHADOWS', desc: 'Symmetrical neumorphic bevels creating organic physical depth inside flat viewports.' },
  },
  {
    name: 'Isometric Floating Card',
    category: 'Cards',
    slug: 'isometric-card',
    raw_html: `
      <div class="w-64 h-80 rounded-2xl bg-[#00D2FF] text-black font-black p-6 flex flex-col justify-between transition-transform duration-500 hover:translate-y-[-10px]"
        style="transform: rotateX(51deg) rotateZ(43deg); box-shadow: 10px 10px 0px #037C96;">
        <span class="text-xs font-mono">NODE_01</span>
        <h4 class="text-2xl mt-4 leading-none">{{label}}</h4>
      </div>
    `,
    raw_react: `import React from 'react';

export function IsometricFloatingCard() {
  return (
    <div 
      className="w-64 h-80 rounded-2xl bg-[#00D2FF] text-black font-black p-6 flex flex-col justify-between transition-all duration-500 hover:translate-y-[-10px] hover:shadow-2xl"
      style={{
        transform: 'rotateX(51deg) rotateZ(43deg)',
        boxShadow: '10px 10px 0px #037C96'
      }}
    >
      <span className="text-xs font-mono">NODE_01</span>
      <h4 className="text-2xl mt-4 leading-none">{{label}}</h4>
    </div>
  );
}`,
    default_config: { label: 'ISOMETRIC MESH' },
  },
  {
    name: 'Expandable Detail Card',
    category: 'Cards',
    slug: 'expandable-detail-card',
    raw_html: `
      <div class="w-80 rounded-3xl border border-border bg-surface p-6 flex flex-col cursor-pointer transition-all duration-300 group">
        <h3 class="text-md font-bold text-white group-hover:text-primary transition-colors">{{title}}</h3>
        <p class="text-xs text-text-muted leading-relaxed mt-2">{{summary}}</p>
        <div class="max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-500 ease-out">
          <p class="text-[11px] text-text-muted/60 mt-4 pt-4 border-t border-white/5">{{details}}</p>
        </div>
      </div>
    `,
    raw_react: `import React from 'react';

export function ExpandableDetailCard() {
  return (
    <div className="w-80 rounded-3xl border border-border bg-surface p-6 flex flex-col cursor-pointer transition-all duration-300 group">
      <h3 className="text-md font-bold text-white group-hover:text-primary transition-colors">{{title}}</h3>
      <p className="text-xs text-text-muted leading-relaxed mt-2">{{summary}}</p>
      <div className="max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-500 ease-out">
        <p className="text-[11px] text-text-muted/60 mt-4 pt-4 border-t border-white/5">{{details}}</p>
      </div>
    </div>
  );
}`,
    default_config: { title: 'REVEAL MODULE', summary: 'Hover over this element to disclose full payload.', details: 'Payload includes full structural components, localized translations, and user token mappings.' },
  },

  // ==========================================
  // 3. KATEGORİ: TEXT EFFECTS (21-30)
  // ==========================================
  {
    name: 'Liquid Morphing Text',
    category: 'Text',
    slug: 'liquid-morphing-text',
    raw_html: `
      <div class="liquid-wrapper" style="filter: url(#gooey); color: {{text_color}}; font-size: {{font_size}}px; font-weight: 900;">
        <span class="morph-target">{{text_content}}</span>
      </div>
      <svg style="display:none;"><defs><filter id="gooey"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" /></filter></defs></svg>
    `,
    raw_react: `import React from 'react';

export function LiquidMorphingText() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div 
        className="liquid-wrapper" 
        style={{
          filter: 'url(#gooey)',
          color: '{{text_color}}',
          fontSize: '{{font_size}}px',
          fontWeight: 900
        }}
      >
        <span className="morph-target">{{text_content}}</span>
      </div>
      <svg style={{ display: 'none' }}>
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}`,
    default_config: { text_content: 'LIQUID', text_color: '#00D2FF', font_size: 60 },
  },
  {
    name: 'Glitch Cyberpunk Text',
    category: 'Text',
    slug: 'glitch-cyberpunk-text',
    raw_html: `
      <div class="glitch-box relative font-black text-white uppercase" data-text="{{text}}" style="font-size: {{f_size}}px; --intensity: {{glitch_intensity}};">
        {{text}}
      </div>
      <style>
        .glitch-box::before, .glitch-box::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .glitch-box::before { left: 2px; text-shadow: -2px 0 #ff00c1; clip: rect(44px, 450px, 56px, 0); animation: glitch-1 var(--intensity)s infinite linear alternate-reverse; }
        .glitch-box::after { left: -2px; text-shadow: -2px 0 #00fff9; clip: rect(10px, 450px, 30px, 0); animation: glitch-2 var(--intensity)s infinite linear alternate-reverse; }
        @keyframes glitch-1 { 0% { clip: rect(20px, 9999px, 40px, 0); } 100% { clip: rect(10px, 9999px, 30px, 0); } }
        @keyframes glitch-2 { 0% { clip: rect(60px, 9999px, 80px, 0); } 100% { clip: rect(70px, 9999px, 90px, 0); } }
      </style>
    `,
    raw_react: `import React from 'react';

export function GlitchCyberpunkText() {
  return (
    <div 
      className="glitch-box relative font-black text-white uppercase tracking-widest" 
      data-text="{{text}}"
      style={{
        fontSize: '{{f_size}}px',
        // @ts-ignore
        '--intensity': '{{glitch_intensity}}'
      }}
    >
      {{text}}
    </div>
  );
}`,
    default_config: { text: 'CYBERPUNK', glitch_intensity: 0.5, f_size: 50 },
  },
  {
    name: 'Gradient Shimmer Text',
    category: 'Text',
    slug: 'gradient-shimmer-text',
    raw_html: `
      <span class="font-black uppercase tracking-wider bg-gradient-to-r from-white via-primary to-white bg-[length:200%_auto] bg-clip-text text-transparent"
        style="font-size: {{font_size}}px; animation: shimmer {{speed}}s infinite linear;">
        {{text}}
      </span>
      <style>
        @keyframes shimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
      </style>
    `,
    raw_react: `import React from 'react';

export function GradientShimmerText() {
  return (
    <span 
      className="font-black uppercase tracking-wider bg-gradient-to-r from-white via-primary to-white bg-[length:200%_auto] bg-clip-text text-transparent"
      style={{
        fontSize: '{{font_size}}px',
        animation: 'shimmer {{speed}}s infinite linear'
      }}
    >
      {{text}}
    </span>
  );
}`,
    default_config: { text: 'SHINY METALLIC', speed: 2, font_size: 40 },
  },
  {
    name: 'Terminal Typist Text',
    category: 'Text',
    slug: 'terminal-typist-text',
    raw_html: `
      <div class="font-mono text-sm flex items-center gap-1.5" style="color: {{color}};">
        <span>$</span>
        <span class="border-r-2 border-current pr-1 animate-typing">{{text}}</span>
      </div>
      <style>
        @keyframes blink { 50% { border-color: transparent; } }
        .animate-typing { animation: blink 0.8s step-end infinite; }
      </style>
    `,
    raw_react: `import React from 'react';

export function TerminalTypistText() {
  return (
    <div className="font-mono text-sm flex items-center gap-1.5" style={{ color: '{{color}}' }}>
      <span>$</span>
      <span className="border-r-2 border-current pr-1 animate-pulse">{{text}}</span>
    </div>
  );
}`,
    default_config: { text: 'Fetching network details...', color: '#10B981' },
  },
  {
    name: 'Elastic Character Stagger Text',
    category: 'Text',
    slug: 'elastic-stagger-text',
    raw_html: `
      <div class="flex gap-1.5 font-black uppercase text-4xl text-white">
        <span class="hover:scale-y-150 transition-transform origin-bottom duration-300 cursor-default" style="color: {{hover_color}};">{{char1}}</span>
        <span class="hover:scale-y-150 transition-transform origin-bottom duration-300 cursor-default" style="color: {{hover_color}};">{{char2}}</span>
        <span class="hover:scale-y-150 transition-transform origin-bottom duration-300 cursor-default" style="color: {{hover_color}};">{{char3}}</span>
        <span class="hover:scale-y-150 transition-transform origin-bottom duration-300 cursor-default" style="color: {{hover_color}};">{{char4}}</span>
      </div>
    `,
    raw_react: `import React from 'react';

export function ElasticCharacterStaggerText() {
  return (
    <div className="flex gap-1.5 font-black uppercase text-4xl text-white">
      <span className="hover:scale-y-150 transition-transform origin-bottom duration-300 cursor-default" style={{ color: '{{hover_color}}' }}>{{char1}}</span>
      <span className="hover:scale-y-150 transition-transform origin-bottom duration-300 cursor-default" style={{ color: '{{hover_color}}' }}>{{char2}}</span>
      <span className="hover:scale-y-150 transition-transform origin-bottom duration-300 cursor-default" style={{ color: '{{hover_color}}' }}>{{char3}}</span>
      <span className="hover:scale-y-150 transition-transform origin-bottom duration-300 cursor-default" style={{ color: '{{hover_color}}' }}>{{char4}}</span>
    </div>
  );
}`,
    default_config: { char1: 'F', char2: 'L', char3: 'E', char4: 'X', hover_color: '#F43F5E' },
  },
  {
    name: 'Matrix Rain Text',
    category: 'Text',
    slug: 'matrix-rain-text',
    raw_html: `
      <div class="font-mono text-lg font-bold flex flex-col items-center select-none" style="color: {{text_color}};">
        <span class="animate-bounce">{{char1}}</span>
        <span class="opacity-80">{{char2}}</span>
        <span class="opacity-50">{{char3}}</span>
        <span class="opacity-20">{{char4}}</span>
      </div>
    `,
    raw_react: `import React from 'react';

export function MatrixRainText() {
  return (
    <div className="font-mono text-lg font-bold flex flex-col items-center select-none" style={{ color: '{{text_color}}' }}>
      <span className="animate-bounce">{{char1}}</span>
      <span className="opacity-80">{{char2}}</span>
      <span className="opacity-50">{{char3}}</span>
      <span className="opacity-20">{{char4}}</span>
    </div>
  );
}`,
    default_config: { char1: 'A', char2: '0', char3: 'K', char4: '9', text_color: '#22C55E' },
  },
  {
    name: 'Flickering Neon Light Text',
    category: 'Text',
    slug: 'flicker-neon-text',
    raw_html: `
      <span class="font-bold text-3xl uppercase tracking-widest text-white"
        style="text-shadow: 0 0 10px {{glow_color}}, 0 0 20px {{glow_color}}; animation: flicker {{flicker_speed}}s infinite alternate;">
        {{text}}
      </span>
      <style>
        @keyframes flicker { 0%, 100% { opacity: 1; } 41% { opacity: 0.95; } 42% { opacity: 0.3; } 43% { opacity: 0.95; } }
      </style>
    `,
    raw_react: `import React from 'react';

export function FlickeringNeonLightText() {
  return (
    <span 
      className="font-bold text-3xl uppercase tracking-widest text-white"
      style={{
        textShadow: '0 0 10px {{glow_color}}, 0 0 20px {{glow_color}}',
        animation: 'flicker {{flicker_speed}}s infinite alternate'
      }}
    >
      {{text}}
    </span>
  );
}`,
    default_config: { text: 'NEON WAVE', glow_color: '#EC4899', flicker_speed: 0.4 },
  },
  {
    name: 'Vaporwave Sunset Text',
    category: 'Text',
    slug: 'vaporwave-sunset-text',
    raw_html: `
      <h1 class="text-5xl font-black uppercase italic tracking-widest bg-gradient-to-b bg-clip-text text-transparent"
        style="background-image: linear-gradient({{color1}}, {{color2}});">
        {{text}}
      </h1>
    `,
    raw_react: `import React from 'react';

export function VaporwaveSunsetText() {
  return (
    <h1 
      className="text-5xl font-black uppercase italic tracking-widest bg-gradient-to-b bg-clip-text text-transparent"
      style={{
        backgroundImage: 'linear-gradient({{color1}}, {{color2}})'
      }}
    >
      {{text}}
    </h1>
  );
}`,
    default_config: { text: 'VAPORS', color1: '#FF007F', color2: '#7F00FF' },
  },
  {
    name: 'Text Background Image Mask',
    category: 'Text',
    slug: 'text-image-mask',
    raw_html: `
      <div class="bg-clip-text text-transparent bg-cover bg-center font-black uppercase leading-none tracking-tighter"
        style="font-size: {{font_size}}px; background-image: url('{{img_url}}');">
        {{text}}
      </div>
    `,
    raw_react: `import React from 'react';

export function TextBackgroundImageMask() {
  return (
    <div 
      className="bg-clip-text text-transparent bg-cover bg-center font-black uppercase leading-none tracking-tighter"
      style={{
        fontSize: '{{font_size}}px',
        backgroundImage: "url('{{img_url}}')"
      }}
    >
      {{text}}
    </div>
  );
}`,
    default_config: { text: 'WAVE', font_size: 90, img_url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=500' },
  },
  {
    name: 'Variable Weight Stretch Text',
    category: 'Text',
    slug: 'stretch-text',
    raw_html: `
      <div class="font-black text-3xl uppercase tracking-wider text-white"
        style="animation: stretch {{speed}}s infinite ease-in-out alternate;">
        {{text}}
      </div>
      <style>
        @keyframes stretch { 0% { letter-spacing: 0.1em; } 100% { letter-spacing: 0.6em; } }
      </style>
    `,
    raw_react: `import React from 'react';

export function VariableWeightStretchText() {
  return (
    <div 
      className="font-black text-3xl uppercase tracking-wider text-white"
      style={{
        animation: 'stretch {{speed}}s infinite ease-in-out alternate'
      }}
    >
      {{text}}
    </div>
  );
}`,
    default_config: { text: 'STRETCH', speed: 2 },
  },

  // ==========================================
  // 4. KATEGORİ: LOADERS & PROGRESS (31-40)
  // ==========================================
  {
    name: 'Gooey Sphere Loader',
    category: 'Loaders',
    slug: 'gooey-loader',
    raw_html: `
      <div class="relative flex gap-4 p-6" style="filter: url(#goo); background: transparent;">
        <div class="w-6 h-6 rounded-full animate-bounce" style="background: {{color}}; animation-delay: 0s;"></div>
        <div class="w-6 h-6 rounded-full animate-bounce" style="background: {{color}}; animation-delay: 0.2s;"></div>
        <div class="w-6 h-6 rounded-full animate-bounce" style="background: {{color}}; animation-delay: 0.4s;"></div>
      </div>
      <svg style="display:none;"><defs><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" /></filter></defs></svg>
    `,
    raw_react: `import React from 'react';

export function GooeySphereLoader() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex gap-4 p-6" style={{ filter: 'url(#goo)' }}>
        <div className="w-6 h-6 rounded-full animate-bounce" style={{ background: '{{color}}', animationDelay: '0s' }}></div>
        <div className="w-6 h-6 rounded-full animate-bounce" style={{ background: '{{color}}', animationDelay: '0.2s' }}></div>
        <div className="w-6 h-6 rounded-full animate-bounce" style={{ background: '{{color}}', animationDelay: '0.4s' }}></div>
      </div>
      <svg style={{ display: 'none' }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}`,
    default_config: { color: '#00D2FF' },
  },
  {
    name: 'Cyber Ring Spinner',
    category: 'Loaders',
    slug: 'cyber-ring-spinner',
    raw_html: `
      <div class="relative w-16 h-16 flex items-center justify-center">
        <div class="absolute inset-0 rounded-full border-4 border-dashed animate-spin" style="border-color: {{color1}}; animation-duration: {{speed}}s;"></div>
        <div class="absolute w-10 h-10 rounded-full border-4 border-dotted animate-spin" style="border-color: {{color2}}; animation-duration: 2s; animation-direction: reverse;"></div>
      </div>
    `,
    raw_react: `import React from 'react';

export function CyberRingSpinner() {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <div 
        className="absolute inset-0 rounded-full border-4 border-dashed animate-spin" 
        style={{ borderColor: '{{color1}}', animationDuration: '{{speed}}s' }}
      ></div>
      <div 
        className="absolute w-10 h-10 rounded-full border-4 border-dotted animate-spin" 
        style={{ borderColor: '{{color2}}', animationDuration: '2s', animationDirection: 'reverse' }}
      ></div>
    </div>
  );
}`,
    default_config: { color1: '#00D2FF', color2: '#EF4444', speed: 1.5 },
  },
  {
    name: 'Infinity Laser Loop',
    category: 'Loaders',
    slug: 'infinity-laser-loop',
    raw_html: `
      <div class="relative w-20 h-10 flex items-center justify-center">
        <svg class="w-full h-full" viewBox="0 0 100 50">
          <path fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="4" d="M25,25 C25,12.5 12.5,12.5 12.5,25 C12.5,37.5 25,37.5 25,25 C25,12.5 75,37.5 75,25 C75,12.5 87.5,12.5 87.5,25 C87.5,37.5 75,37.5 75,25 C75,12.5 25,37.5 25,25 Z" />
          <path class="draw-path" fill="none" stroke="{{color}}" stroke-width="4" d="M25,25 C25,12.5 12.5,12.5 12.5,25 C12.5,37.5 25,37.5 25,25 C25,12.5 75,37.5 75,25 C75,12.5 87.5,12.5 87.5,25 C87.5,37.5 75,37.5 75,25 C75,12.5 25,37.5 25,25 Z" />
        </svg>
        <style>
          .draw-path { stroke-dasharray: 200; stroke-dashoffset: 200; animation: draw {{speed}}s infinite linear; }
          @keyframes draw { 0% { stroke-dashoffset: 200; } 100% { stroke-dashoffset: 0; } }
        </style>
      </div>
    `,
    raw_react: `import React from 'react';

export function InfinityLaserLoop() {
  return (
    <div className="relative w-20 h-10 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 100 50">
        <path fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" d="M25,25 C25,12.5 12.5,12.5 12.5,25 C12.5,37.5 25,37.5 25,25 C25,12.5 75,37.5 75,25 C75,12.5 87.5,12.5 87.5,25 C87.5,37.5 75,37.5 75,25 C75,12.5 25,37.5 25,25 Z" />
        <path className="draw-path" fill="none" stroke="{{color}}" strokeWidth="4" d="M25,25 C25,12.5 12.5,12.5 12.5,25 C12.5,37.5 25,37.5 25,25 C25,12.5 75,37.5 75,25 C75,12.5 87.5,12.5 87.5,25 C87.5,37.5 75,37.5 75,25 C75,12.5 25,37.5 25,25 Z" />
      </svg>
    </div>
  );
}`,
    default_config: { color: '#10B981', speed: 2 },
  },
  {
    name: 'Retro Arcade Loader',
    category: 'Loaders',
    slug: 'retro-arcade-loader',
    raw_html: `
      <div class="flex flex-col items-center gap-3 font-mono">
        <div class="flex gap-2">
          <div class="w-4 h-4 bg-primary animate-bounce" style="animation-delay: 0s;"></div>
          <div class="w-4 h-4 bg-primary animate-bounce" style="animation-delay: 0.15s;"></div>
          <div class="w-4 h-4 bg-primary animate-bounce" style="animation-delay: 0.3s;"></div>
        </div>
        <span class="text-[10px] text-primary/80 uppercase tracking-widest animate-pulse">{{text}}</span>
      </div>
    `,
    raw_react: `import React from 'react';

export function RetroArcadeLoader() {
  return (
    <div className="flex flex-col items-center gap-3 font-mono">
      <div className="flex gap-2">
        <div className="w-4 h-4 bg-primary animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-4 h-4 bg-primary animate-bounce" style={{ animationDelay: '0.15s' }}></div>
        <div className="w-4 h-4 bg-primary animate-bounce" style={{ animationDelay: '0.3s' }}></div>
      </div>
      <span className="text-[10px] text-primary/80 uppercase tracking-widest animate-pulse">{{text}}</span>
    </div>
  );
}`,
    default_config: { text: 'LOADING...' },
  },
  {
    name: 'Pulsing Neural Node',
    category: 'Loaders',
    slug: 'neural-node-loader',
    raw_html: `
      <div class="relative w-12 h-12 flex items-center justify-center">
        <div class="absolute w-4 h-4 rounded-full" style="background: {{node_color}};"></div>
        <div class="absolute w-12 h-12 rounded-full border animate-ping" style="border-color: {{node_color}}; animation-duration: {{pulse_speed}}s;"></div>
      </div>
    `,
    raw_react: `import React from 'react';

export function PulsingNeuralNode() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <div class="absolute w-4 h-4 rounded-full" style={{ background: '{{node_color}}' }}></div>
      <div 
        className="absolute w-12 h-12 rounded-full border animate-ping" 
        style={{ borderColor: '{{node_color}}', animationDuration: '{{pulse_speed}}s' }}
      ></div>
    </div>
  );
}`,
    default_config: { node_color: '#A855F7', pulse_speed: 1.5 },
  },
  {
    name: 'Liquid Fill Wave Loader',
    category: 'Loaders',
    slug: 'liquid-fill-wave',
    raw_html: `
      <div class="relative w-16 h-16 rounded-full border-2 overflow-hidden flex items-center justify-center bg-transparent"
        style="border-color: {{wave_color}};">
        <div class="absolute bottom-0 left-0 w-full animate-pulse"
          style="background: {{wave_color}}; height: {{fill_percent}}%; opacity: 0.7;"></div>
        <span class="relative z-10 text-xs font-black text-white select-none">{{fill_percent}}%</span>
      </div>
    `,
    raw_react: `import React from 'react';

export function LiquidFillWaveLoader() {
  return (
    <div 
      className="relative w-16 h-16 rounded-full border-2 overflow-hidden flex items-center justify-center bg-transparent"
      style={{ borderColor: '{{wave_color}}' }}
    >
      <div 
        className="absolute bottom-0 left-0 w-full animate-pulse"
        style={{ background: '{{wave_color}}', height: '{{fill_percent}}%', opacity: 0.7 }}
      ></div>
      <span className="relative z-10 text-xs font-black text-white select-none">{{fill_percent}}%</span>
    </div>
  );
}`,
    default_config: { fill_percent: 75, wave_color: '#3B82F6' },
  },
  {
    name: 'Dotted Spiral Vortex',
    category: 'Loaders',
    slug: 'spiral-vortex-loader',
    raw_html: `
      <div class="relative flex items-center justify-center animate-spin" style="width: {{size}}px; height: {{size}}px; animation-duration: 3s;">
        <div class="absolute w-2 h-2 rounded-full top-0" style="background: {{dot_color}};"></div>
        <div class="absolute w-2 h-2 rounded-full right-0 opacity-80" style="background: {{dot_color}};"></div>
        <div class="absolute w-2 h-2 rounded-full bottom-0 opacity-50" style="background: {{dot_color}};"></div>
        <div class="absolute w-2 h-2 rounded-full left-0 opacity-20" style="background: {{dot_color}};"></div>
      </div>
    `,
    raw_react: `import React from 'react';

export function DottedSpiralVortex() {
  return (
    <div 
      className="relative flex items-center justify-center animate-spin" 
      style={{ width: '{{size}}px', height: '{{size}}px', animationDuration: '3s' }}
    >
      <div className="absolute w-2 h-2 rounded-full top-0" style={{ background: '{{dot_color}}' }}></div>
      <div className="absolute w-2 h-2 rounded-full right-0 opacity-80" style={{ background: '{{dot_color}}' }}></div>
      <div className="absolute w-2 h-2 rounded-full bottom-0 opacity-50" style={{ background: '{{dot_color}}' }}></div>
      <div className="absolute w-2 h-2 rounded-full left-0 opacity-20" style={{ background: '{{dot_color}}' }}></div>
    </div>
  );
}`,
    default_config: { size: 50, dot_color: '#EC4899' },
  },
  {
    name: 'Bouncing 3D Cubes',
    category: 'Loaders',
    slug: 'bouncing-3d-cubes',
    raw_html: `
      <div class="flex gap-1">
        <div class="w-3 h-6 bg-primary animate-bounce" style="animation-delay: 0s;"></div>
        <div class="w-3 h-6 bg-primary animate-bounce" style="animation-delay: 0.1s;"></div>
        <div class="w-3 h-6 bg-primary animate-bounce" style="animation-delay: 0.2s;"></div>
      </div>
    `,
    raw_react: `import React from 'react';

export function Bouncing3DCubes() {
  return (
    <div className="flex gap-1">
      <div className="w-3 h-6 bg-primary animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="w-3 h-6 bg-primary animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-3 h-6 bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
  );
}`,
    default_config: {},
  },
  {
    name: 'DNA Helix Spinner',
    category: 'Loaders',
    slug: 'dna-helix-spinner',
    raw_html: `
      <div class="flex gap-3">
        <div class="w-2.5 h-2.5 rounded-full animate-ping" style="background: {{color1}}; animation-delay: 0s;"></div>
        <div class="w-2.5 h-2.5 rounded-full animate-ping" style="background: {{color2}}; animation-delay: 0.3s;"></div>
      </div>
    `,
    raw_react: `import React from 'react';

export function DNAHelixSpinner() {
  return (
    <div className="flex gap-3">
      <div className="w-2.5 h-2.5 rounded-full animate-ping" style={{ background: '{{color1}}', animationDelay: '0s' }}></div>
      <div className="w-2.5 h-2.5 rounded-full animate-ping" style={{ background: '{{color2}}', animationDelay: '0.3s' }}></div>
    </div>
  );
}`,
    default_config: { color1: '#10B981', color2: '#0EA5E9' },
  },
  {
    name: 'Shimmer Line Progress',
    category: 'Loaders',
    slug: 'shimmer-line-progress',
    raw_html: `
      <div class="w-72 h-2.5 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
        <div class="h-full rounded-full transition-all duration-1000 ease-out" 
          style="width: {{percent}}%; background: linear-gradient(90deg, {{color}} 0%, #fff 50%, {{color}} 100%); background-size: 200% 100%; animation: bar-shimmer 2s infinite linear;"></div>
        <style>
          @keyframes bar-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        </style>
      </div>
    `,
    raw_react: `import React from 'react';

export function ShimmerLineProgress() {
  return (
    <div className="w-72 h-2.5 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
      <div 
        className="h-full rounded-full transition-all duration-1000 ease-out" 
        style={{
          width: '{{percent}}%',
          background: 'linear-gradient(90deg, {{color}} 0%, #fff 50%, {{color}} 100%)',
          backgroundSize: '200% 100%',
          animation: 'bar-shimmer 2s infinite linear'
        }}
      ></div>
    </div>
  );
}`,
    default_config: { percent: 70, color: '#8B5CF6' },
  },

  // ==========================================
  // 5. KATEGORİ: BACKGROUNDS & OVERLAYS (41-50)
  // ==========================================
  {
    name: 'Neural Noise Mesh',
    category: 'Backgrounds',
    slug: 'neural-noise-mesh',
    raw_html: `
      <div class="mesh-bg" style="background: radial-gradient(circle at center, {{glow_color}} 0%, transparent 70%); opacity: {{opacity}};">
        <div class="noise-overlay"></div>
      </div>
      <style>
        .mesh-bg { width: 400px; height: 300px; border-radius: 20px; position: relative; overflow: hidden; }
        .noise-overlay { position: absolute; inset: -200%; background-image: url('https://grainy-gradients.vercel.app/noise.svg'); filter: contrast(150%) brightness(1000%); animation: noise {{speed}}s steps(2) infinite; }
        @keyframes noise { 0% { transform: translate(0,0); } 10% { transform: translate(-5%,-5%); } 100% { transform: translate(5%,5%); } }
      </style>
    `,
    raw_react: `import React from 'react';

export function NeuralNoiseMesh() {
  return (
    <div 
      className="mesh-bg" 
      style={{
        background: 'radial-gradient(circle at center, {{glow_color}} 0%, transparent 70%)',
        opacity: '{{opacity}}'
      }}
    >
      <div className="noise-overlay"></div>
    </div>
  );
}`,
    default_config: { glow_color: '#3A86FF', opacity: 0.4, speed: 0.8 },
  },
  {
    name: 'Animated Cyber Grid',
    category: 'Backgrounds',
    slug: 'cyber-grid',
    raw_html: `
      <div class="grid-container" style="--grid-color: {{color}}; --speed: {{speed}}s;">
        <div class="grid-plane"></div>
      </div>
      <style>
        .grid-container { width: 100%; height: 300px; perspective: 500px; background: #000; overflow: hidden; border-radius: 20px; }
        .grid-plane { position: absolute; width: 200%; height: 200%; bottom: -50%; left: -50%; background-image: linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px); background-size: 40px 40px; transform: rotateX(60deg); animation: move var(--speed) linear infinite; opacity: 0.3; }
        @keyframes move { from { background-position: 0 0; } to { background-position: 0 40px; } }
      </style>
    `,
    raw_react: `import React from 'react';

export function AnimatedCyberGrid() {
  return (
    <div className="grid-container" style={{
      // @ts-ignore
      '--grid-color': '{{color}}',
      '--speed': '{{speed}}s'
    }}>
      <div className="grid-plane"></div>
    </div>
  );
}`,
    default_config: { color: '#00ff00', speed: 2 },
  },
  {
    name: 'Cosmic Starfield',
    category: 'Backgrounds',
    slug: 'cosmic-starfield',
    raw_html: `
      <div class="relative w-full h-80 bg-black overflow-hidden rounded-3xl flex items-center justify-center">
        <div class="absolute w-1 h-1 rounded-full bg-white animate-ping" style="top: 20%; left: 30%; animation-duration: {{speed}}s;"></div>
        <div class="absolute w-1.5 h-1.5 rounded-full bg-white animate-pulse" style="top: 50%; left: 70%; animation-duration: 2.5s;"></div>
        <div class="absolute w-1 h-1 rounded-full bg-white animate-ping" style="top: 80%; left: 10%; animation-duration: 4s;"></div>
        <div class="absolute w-2 h-2 rounded-full bg-white/20" style="top: 10%; left: 80%;"></div>
        <span class="text-[10px] font-mono tracking-widest text-white/40">COSMOS DEEP FIELD</span>
      </div>
    `,
    raw_react: `import React from 'react';

export function CosmicStarfield() {
  return (
    <div className="relative w-full h-80 bg-black overflow-hidden rounded-3xl flex items-center justify-center">
      <div className="absolute w-1 h-1 rounded-full bg-white animate-ping" style={{ top: '20%', left: '30%', animationDuration: '{{speed}}s' }}></div>
      <div className="absolute w-1.5 h-1.5 rounded-full bg-white animate-pulse" style={{ top: '50%', left: '70%', animationDuration: '2.5s' }}></div>
      <div className="absolute w-1 h-1 rounded-full bg-white animate-ping" style={{ top: '80%', left: '10%', animationDuration: '4s' }}></div>
      <div className="absolute w-2 h-2 rounded-full bg-white/20" style={{ top: '10%', left: '80%' }}></div>
      <span className="text-[10px] font-mono tracking-widest text-white/40">COSMOS DEEP FIELD</span>
    </div>
  );
}`,
    default_config: { speed: 1.5 },
  },
  {
    name: 'Aurora Wave Glow',
    category: 'Backgrounds',
    slug: 'aurora-wave-glow',
    raw_html: `
      <div class="relative w-full h-80 overflow-hidden rounded-3xl flex items-center justify-center bg-black">
        <div class="absolute inset-0 bg-gradient-to-tr filter blur-[40px] opacity-30 animate-pulse"
          style="background-image: linear-gradient(45deg, {{color1}}, {{color2}}); animation-duration: {{speed}}s;"></div>
        <span class="relative text-[10px] text-white/30 tracking-widest uppercase font-black">SOLAR AURORA MESH</span>
      </div>
    `,
    raw_react: `import React from 'react';

export function AuroraWaveGlow() {
  return (
    <div className="relative w-full h-80 overflow-hidden rounded-3xl flex items-center justify-center bg-black">
      <div 
        className="absolute inset-0 bg-gradient-to-tr filter blur-[40px] opacity-30 animate-pulse"
        style={{
          backgroundImage: 'linear-gradient(45deg, {{color1}}, {{color2}})',
          animationDuration: '{{speed}}s'
        }}
      ></div>
      <span className="relative text-[10px] text-white/30 tracking-widest uppercase font-black">SOLAR AURORA MESH</span>
    </div>
  );
}`,
    default_config: { color1: '#00f2ff', color2: '#ff007f', speed: 8 },
  },
  {
    name: 'CRT Scanline Retro Overlay',
    category: 'Backgrounds',
    slug: 'crt-scanline-overlay',
    raw_html: `
      <div class="relative w-full h-80 bg-black overflow-hidden rounded-3xl flex items-center justify-center font-mono">
        <div class="absolute inset-0 pointer-events-none z-10"
          style="background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.05), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.05)); background-size: 100% 4px, 6px 100%; opacity: {{opacity}};"></div>
        <span class="text-green-500 animate-pulse text-xs">> SIGNAL DETECTED: AUTO_OS_V1.3</span>
      </div>
    `,
    raw_react: `import React from 'react';

export function CRTScanlineRetroOverlay() {
  return (
    <div className="relative w-full h-80 bg-black overflow-hidden rounded-3xl flex items-center justify-center font-mono">
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.05), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.05))',
          backgroundSize: '100% 4px, 6px 100%',
          opacity: '{{opacity}}'
        }}
      ></div>
      <span className="text-green-500 animate-pulse text-xs">&gt; SIGNAL DETECTED: AUTO_OS_V1.3</span>
    </div>
  );
}`,
    default_config: { opacity: 0.5 },
  },
  {
    name: 'Matrix Digital Code Cascade',
    category: 'Backgrounds',
    slug: 'matrix-cascade',
    raw_html: `
      <div class="w-full h-80 bg-black rounded-3xl flex items-center justify-center text-xs font-mono" style="color: {{text_color}};">
        <div class="flex gap-4 animate-pulse">
          <div class="flex flex-col"><span>1</span><span>0</span><span>1</span><span>0</span></div>
          <div class="flex flex-col"><span>0</span><span>1</span><span>0</span><span>1</span></div>
          <div class="flex flex-col"><span>1</span><span>1</span><span>0</span><span>0</span></div>
        </div>
      </div>
    `,
    raw_react: `import React from 'react';

export function MatrixDigitalCodeCascade() {
  return (
    <div className="w-full h-80 bg-black rounded-3xl flex items-center justify-center text-xs font-mono" style={{ color: '{{text_color}}' }}>
      <div className="flex gap-4 animate-pulse">
        <div className="flex flex-col"><span>1</span><span>0</span><span>1</span><span>0</span></div>
        <div className="flex flex-col"><span>0</span><span>1</span><span>0</span><span>1</span></div>
        <div className="flex flex-col"><span>1</span><span>1</span><span>0</span><span>0</span></div>
      </div>
    </div>
  );
}`,
    default_config: { text_color: '#00FF66' },
  },
  {
    name: 'Bokeh Floating Orbs',
    category: 'Backgrounds',
    slug: 'bokeh-orbs',
    raw_html: `
      <div class="relative w-full h-80 overflow-hidden bg-black rounded-3xl flex items-center justify-center">
        <div class="absolute w-24 h-24 rounded-full filter blur-[20px] animate-pulse opacity-40" style="background: {{orb_color}}; top: 20%; left: 10%; animation-duration: {{speed}}s;"></div>
        <div class="absolute w-32 h-32 rounded-full filter blur-[30px] animate-pulse opacity-30" style="background: {{orb_color}}; bottom: 10%; right: 10%; animation-duration: 4s;"></div>
        <span class="text-white/20 text-[9px] uppercase tracking-widest font-mono">BOKEH DEPTH FIELD</span>
      </div>
    `,
    raw_react: `import React from 'react';

export function BokehFloatingOrbs() {
  return (
    <div className="relative w-full h-80 overflow-hidden bg-black rounded-3xl flex items-center justify-center">
      <div className="absolute w-24 h-24 rounded-full filter blur-[20px] animate-pulse opacity-40" style={{ background: '{{orb_color}}', top: '20%', left: '10%', animationDuration: '{{speed}}s' }}></div>
      <div className="absolute w-32 h-32 rounded-full filter blur-[30px] animate-pulse opacity-30" style={{ background: '{{orb_color}}', bottom: '10%', right: '10%', animationDuration: '4s' }}></div>
      <span className="text-white/20 text-[9px] uppercase tracking-widest font-mono">BOKEH DEPTH FIELD</span>
    </div>
  );
}`,
    default_config: { orb_color: '#FFD700', speed: 5 },
  },
  {
    name: 'Liquid Floating Metaballs',
    category: 'Backgrounds',
    slug: 'liquid-metaballs',
    raw_html: `
      <div class="relative w-full h-80 bg-black overflow-hidden rounded-3xl flex items-center justify-center" style="filter: url(#metaball-filter);">
        <div class="absolute w-16 h-16 rounded-full animate-bounce" style="background: {{blob_color}}; animation-duration: {{speed}}s;"></div>
        <div class="absolute w-20 h-20 rounded-full animate-bounce" style="background: {{blob_color}}; animation-duration: 4s; animation-delay: 1s;"></div>
      </div>
      <svg style="display:none;"><defs><filter id="metaball-filter"><feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="goo" /></filter></defs></svg>
    `,
    raw_react: `import React from 'react';

export function LiquidFloatingMetaballs() {
  return (
    <div className="relative w-full h-80 bg-black overflow-hidden rounded-3xl flex items-center justify-center" style={{ filter: 'url(#metaball-filter)' }}>
      <div className="absolute w-16 h-16 rounded-full animate-bounce" style={{ background: '{{blob_color}}', animationDuration: '{{speed}}s' }}></div>
      <div className="absolute w-20 h-20 rounded-full animate-bounce" style={{ background: '{{blob_color}}', animationDuration: '4s', animationDelay: '1s' }}></div>
      <svg style={{ display: 'none' }}>
        <defs>
          <filter id="metaball-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}`,
    default_config: { blob_color: '#F43F5E', speed: 3 },
  },
  {
    name: 'Geometric Connect Nodes',
    category: 'Backgrounds',
    slug: 'connect-nodes',
    raw_html: `
      <div class="relative w-full h-80 bg-black rounded-3xl flex flex-wrap gap-6 p-10 overflow-hidden items-center justify-center">
        <div class="w-2.5 h-2.5 rounded-full animate-ping" style="background: {{node_color}};"></div>
        <div class="w-2.5 h-2.5 rounded-full animate-ping" style="background: {{node_color}}; animation-delay: 0.5s;"></div>
        <div class="w-2.5 h-2.5 rounded-full animate-ping" style="background: {{node_color}}; animation-delay: 1s;"></div>
      </div>
    `,
    raw_react: `import React from 'react';

export function GeometricConnectNodes() {
  return (
    <div className="relative w-full h-80 bg-black rounded-3xl flex flex-wrap gap-6 p-10 overflow-hidden items-center justify-center">
      <div className="w-2.5 h-2.5 rounded-full animate-ping" style={{ background: '{{node_color}}' }}></div>
      <div className="w-2.5 h-2.5 rounded-full animate-ping" style={{ background: '{{node_color}}', animationDelay: '0.5s' }}></div>
      <div className="w-2.5 h-2.5 rounded-full animate-ping" style={{ background: '{{node_color}}', animationDelay: '1s' }}></div>
    </div>
  );
}`,
    default_config: { node_color: '#38BDF8' },
  },
  {
    name: 'Holographic Grid Portal',
    category: 'Backgrounds',
    slug: 'grid-portal',
    raw_html: `
      <div class="relative w-full h-80 bg-black rounded-3xl flex items-center justify-center overflow-hidden">
        <div class="absolute w-64 h-64 border-4 rounded-full animate-spin"
          style="border-color: {{grid_color}}; animation-duration: {{speed}}s; border-style: double;"></div>
        <span class="text-[9px] font-mono tracking-widest text-white/50">PORTAL INITIATED</span>
      </div>
    `,
    raw_react: `import React from 'react';

export function HolographicGridPortal() {
  return (
    <div className="relative w-full h-80 bg-black rounded-3xl flex items-center justify-center overflow-hidden">
      <div 
        className="absolute w-64 h-64 border-4 rounded-full animate-spin"
        style={{
          borderColor: '{{grid_color}}',
          animationDuration: '{{speed}}s',
          borderStyle: 'double'
        }}
      ></div>
      <span className="text-[9px] font-mono tracking-widest text-white/50">PORTAL INITIATED</span>
    </div>
  );
}`,
    default_config: { grid_color: '#8B5CF6', speed: 10 },
  }
];
