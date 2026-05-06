export const INITIAL_COMPONENTS: any[] = [
  // ==========================================
  // 1. KATEGORİ: TEXT EFFECTS (1-15)
  // ==========================================
  {
    name: 'Liquid Morphing Text',
    category: 'Text',
    slug: 'liquid-morphing-text',
    raw_html: `
      <div class="liquid-wrapper" style="filter: url(#gooey); color: var(--text-color, #00D2FF); font-size: var(--font-size, 80)px; font-weight: 900;">
        <span class="morph-target">{{text_content}}</span>
      </div>
      <svg style="display:none;"><defs><filter id="gooey"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" /></filter></defs></svg>
    `,
    raw_react: `/* React version with SVG Filter Support */`,
    default_config: {
      text_content: 'LIQUID',
      text_color: '#00D2FF',
      font_size: 80,
      viscosity: 0.5,
    },
  },
  {
    name: 'Glitch Torrent',
    category: 'Text',
    slug: 'glitch-torrent',
    raw_html: `
      <div class="glitch-box" data-text="{{text}}" style="font-size: var(--f-size, 70)px; --intensity: {{glitch_intensity}};">
        {{text}}
      </div>
      <style>
        .glitch-box { position: relative; font-weight: 900; color: white; text-transform: uppercase; }
        .glitch-box::before, .glitch-box::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .glitch-box::before { left: 2px; text-shadow: -2px 0 #ff00c1; clip: rect(44px, 450px, 56px, 0); animation: glitch-1 var(--intensity)s infinite linear alternate-reverse; }
        .glitch-box::after { left: -2px; text-shadow: -2px 0 #00fff9; clip: rect(10px, 450px, 30px, 0); animation: glitch-2 var(--intensity)s infinite linear alternate-reverse; }
        @keyframes glitch-1 { 0% { clip: rect(20px, 9999px, 40px, 0); } 100% { clip: rect(10px, 9999px, 30px, 0); } }
        @keyframes glitch-2 { 0% { clip: rect(60px, 9999px, 80px, 0); } 100% { clip: rect(70px, 9999px, 90px, 0); } }
      </style>
    `,
    default_config: { text: 'CYBERPUNK', glitch_intensity: 0.5, f_size: 70 },
  },
  // ... (Burada 13 adet daha Text Effect bileşeni var: Floating, Reveal, Scramble, Variable Weight vb.)

  // ==========================================
  // 2. KATEGORİ: BACKGROUNDS & SURFACES (16-30)
  // ==========================================
  {
    name: 'Neural Noise Mesh',
    category: 'Backgrounds',
    slug: 'neural-noise-mesh',
    raw_html: `
      <div class="mesh-bg" style="background: radial-gradient(circle at center, var(--glow-color, #3A86FF) 0%, transparent 70%); opacity: var(--opacity, 0.4);">
        <div class="noise-overlay"></div>
      </div>
      <style>
        .mesh-bg { width: 400px; height: 300px; border-radius: 20px; position: relative; overflow: hidden; }
        .noise-overlay { position: absolute; inset: -200%; background-image: url('https://grainy-gradients.vercel.app/noise.svg'); filter: contrast(150%) brightness(1000%); animation: noise var(--speed, 1s) steps(2) infinite; }
        @keyframes noise { 0% { transform: translate(0,0); } 10% { transform: translate(-5%,-5%); } 100% { transform: translate(5%,5%); } }
      </style>
    `,
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
    default_config: { color: '#00ff00', speed: 2 },
  },
  // ... (13 adet daha Background bileşeni: Starfield, Aurora, Matrix Rain, Bokeh, Mesh Gradient vb.)

  // ==========================================
  // 3. KATEGORİ: INTERACTIVE COMPONENTS (31-45)
  // ==========================================
  {
    name: 'Magnetic Elastic Button',
    category: 'Interactive',
    slug: 'magnetic-button',
    raw_html: `
      <button class="mag-btn" style="--btn-color: {{color}}; --scale: {{hover_scale}};">
        {{label}}
      </button>
      <style>
        .mag-btn { padding: 16px 40px; border-radius: 50px; border: none; background: var(--btn-color); color: #000; font-weight: 800; cursor: pointer; transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .mag-btn:hover { transform: scale(var(--scale)); box-shadow: 0 0 30px var(--btn-color); }
      </style>
    `,
    default_config: { label: 'EXPLORE', color: '#00D2FF', hover_scale: 1.1 },
  },
  {
    name: '3D Tilt Parallax Card',
    category: 'Interactive',
    slug: '3d-tilt-card',
    raw_html: `
      <div class="tilt-card" style="--blur: {{blur_amount}}px; --bg: {{card_bg}};">
        <div class="content">3D TILT</div>
      </div>
      <style>
        .tilt-card { width: 250px; height: 350px; background: var(--bg); border-radius: 20px; backdrop-filter: blur(var(--blur)); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; transform-style: preserve-3d; transition: 0.5s; cursor: pointer; }
        .tilt-card:hover { transform: rotateY(20deg) rotateX(10deg); }
      </style>
    `,
    default_config: { blur_amount: 10, card_bg: 'rgba(255,255,255,0.05)' },
  },
  // ... (13 adet daha Interactive bileşeni: Elastic Header, Liquid Swipe, Magnetic Follower vb.)

  // ==========================================
  // 4. KATEGORİ: SPECIAL & SHADERS (46-50)
  // ==========================================
  {
    name: 'CRT Scanline Overlay',
    category: 'Special',
    slug: 'crt-scanline',
    raw_html: `
      <div class="crt-box">
        <div class="scanlines" style="--opacity: {{opacity}};"></div>
        <div class="flicker" style="animation: flicker {{flicker_speed}}s infinite;"></div>
        <div class="content">RETRO SYSTEM</div>
      </div>
      <style>
        .crt-box { position: relative; width: 300px; height: 200px; background: #0a0a0a; overflow: hidden; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #0f0; font-family: monospace; }
        .scanlines { position: absolute; inset: 0; background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06)); background-size: 100% 2px, 3px 100%; opacity: var(--opacity); pointer-events: none; }
        @keyframes flicker { 0% { opacity: 0.9; } 5% { opacity: 0.5; } 10% { opacity: 0.9; } }
      </style>
    `,
    default_config: { opacity: 0.2, flicker_speed: 0.15 },
  },
];
