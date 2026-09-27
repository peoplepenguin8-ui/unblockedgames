/**
 * PlayVault - Unblocked Games Portal
 * Pure standard JavaScript entry point compatible with GitHub Pages & Vite
 */

// Embedded fallback games data so the page renders instantly even if fetch is blocked
const DEFAULT_GAMES = [
  {
    id: "2048",
    title: "2048 Classic",
    category: "Puzzle",
    description: "Slide numbered tiles across the 4x4 grid and combine matching numbers to reach the legendary 2048 tile.",
    iframe: '<iframe src="./games/2048/index.html" title="2048 Classic" allowfullscreen="true" style="border:0;width:100%;height:100%;"></iframe>',
    iframeUrl: "./games/2048/index.html",
    controls: ["Arrow Keys / WASD to slide tiles", "Swipe on touch devices"],
    rating: 4.9,
    plays: 28400,
    tags: ["Numbers", "Brain", "Logic", "Casual"],
    isFeatured: true,
    themeColor: "#38bdf8"
  },
  {
    id: "snake",
    title: "Retro Snake",
    category: "Arcade",
    description: "The timeless arcade snake game reconstructed with neon cyber graphics, speed progression, and sound effects.",
    iframe: '<iframe src="./games/snake/index.html" title="Retro Snake" allowfullscreen="true" style="border:0;width:100%;height:100%;"></iframe>',
    iframeUrl: "./games/snake/index.html",
    controls: ["Arrow Keys / WASD to direct the snake", "Space to pause / restart", "On-screen D-pad for mobile"],
    rating: 4.8,
    plays: 35200,
    tags: ["Classic", "Reflex", "Retro", "Neon"],
    isFeatured: true,
    themeColor: "#10b981"
  },
  {
    id: "tetris",
    title: "Tetris Block Master",
    category: "Puzzle",
    description: "Clear horizontal lines by rotating and placing falling polyomino tetrominoes. Features ghost projections and level acceleration.",
    iframe: '<iframe src="./games/tetris/index.html" title="Tetris Block Master" allowfullscreen="true" style="border:0;width:100%;height:100%;"></iframe>',
    iframeUrl: "./games/tetris/index.html",
    controls: ["Left / Right to move piece", "Up Arrow to rotate", "Down Arrow for soft drop", "Space for hard drop"],
    rating: 4.9,
    plays: 41800,
    tags: ["Blocks", "Strategy", "Classic", "Soviet"],
    isFeatured: true,
    themeColor: "#06b6d4"
  },
  {
    id: "space-invaders",
    title: "Space Invaders 2D",
    category: "Action",
    description: "Pilot your starship cannon and annihilate descending alien waves before they breach earth defense perimeters.",
    iframe: '<iframe src="./games/space-invaders/index.html" title="Space Invaders 2D" allowfullscreen="true" style="border:0;width:100%;height:100%;"></iframe>',
    iframeUrl: "./games/space-invaders/index.html",
    controls: ["A / D or Arrow Keys to steer ship", "Spacebar / W to fire lasers", "On-screen buttons for touch"],
    rating: 4.7,
    plays: 22100,
    tags: ["Shooter", "Sci-Fi", "Alien", "Retro"],
    isFeatured: false,
    themeColor: "#f43f5e"
  },
  {
    id: "flappy",
    title: "Flappy Sky Dash",
    category: "Arcade",
    description: "Guide your bird through tricky pipe obstacles. Test your rhythm and timing to set new personal best records.",
    iframe: '<iframe src="./games/flappy/index.html" title="Flappy Sky Dash" allowfullscreen="true" style="border:0;width:100%;height:100%;"></iframe>',
    iframeUrl: "./games/flappy/index.html",
    controls: ["Spacebar / Tap screen to flap wings", "Timing is essential"],
    rating: 4.6,
    plays: 56700,
    tags: ["Physics", "Challenging", "Skill", "Runner"],
    isFeatured: true,
    themeColor: "#f59e0b"
  },
  {
    id: "dino",
    title: "T-Rex Desert Runner",
    category: "Action",
    description: "The famous offline browser runner! Leap over cacti and dodge swooping pterodactyls across the desert floor.",
    iframe: '<iframe src="./games/dino/index.html" title="T-Rex Desert Runner" allowfullscreen="true" style="border:0;width:100%;height:100%;"></iframe>',
    iframeUrl: "./games/dino/index.html",
    controls: ["Space / Up Arrow to jump", "Down Arrow to duck under flying creatures", "Tap screen to jump on mobile"],
    rating: 4.9,
    plays: 68900,
    tags: ["Endless", "Dinosaur", "Offline", "Speed"],
    isFeatured: true,
    themeColor: "#38bdf8"
  },
  {
    id: "breakout",
    title: "Neon Breakout",
    category: "Arcade",
    description: "Deflect the high-speed ball with your paddle to destroy colored neon bricks across progressive stages.",
    iframe: '<iframe src="./games/breakout/index.html" title="Neon Breakout" allowfullscreen="true" style="border:0;width:100%;height:100%;"></iframe>',
    iframeUrl: "./games/breakout/index.html",
    controls: ["Mouse / Touch to slide paddle", "A / D or Arrow Keys on keyboard", "Space to launch ball"],
    rating: 4.7,
    plays: 19400,
    tags: ["Bricks", "Paddle", "Arcade", "Color"],
    isFeatured: false,
    themeColor: "#fbbf24"
  },
  {
    id: "pong",
    title: "Cyber Pong",
    category: "Sports",
    description: "The granddaddy of video games upgraded with cyber aesthetics. Play against an intelligent AI bot or challenge a friend locally.",
    iframe: '<iframe src="./games/pong/index.html" title="Cyber Pong" allowfullscreen="true" style="border:0;width:100%;height:100%;"></iframe>',
    iframeUrl: "./games/pong/index.html",
    controls: ["Player 1: W / S or Mouse/Touch", "Player 2: Up / Down Arrows", "First player to 7 points wins"],
    rating: 4.8,
    plays: 17800,
    tags: ["Multiplayer", "Sports", "Table Tennis", "Retro"],
    isFeatured: false,
    themeColor: "#38bdf8"
  },
  {
    id: "minesweeper",
    title: "Minesweeper Classic",
    category: "Puzzle",
    description: "Uncover safe tiles without triggering hidden explosive mines. Use logic and numerical clues to clear the minefield.",
    iframe: '<iframe src="./games/minesweeper/index.html" title="Minesweeper Classic" allowfullscreen="true" style="border:0;width:100%;height:100%;"></iframe>',
    iframeUrl: "./games/minesweeper/index.html",
    controls: ["Left Click to dig safe ground", "Right Click to plant warning flags", "Click the face to restart board"],
    rating: 4.6,
    plays: 14300,
    tags: ["Logic", "Mines", "Strategy", "Classic"],
    isFeatured: false,
    themeColor: "#ef4444"
  },
  {
    id: "racer",
    title: "Speed Drift Highway",
    category: "Action",
    description: "High-octane top-down driving challenge. Weave through heavy commuter traffic, rack up drift points, and avoid collisions.",
    iframe: '<iframe src="./games/racer/index.html" title="Speed Drift Highway" allowfullscreen="true" style="border:0;width:100%;height:100%;"></iframe>',
    iframeUrl: "./games/racer/index.html",
    controls: ["A / D or Arrow Keys to steer car", "Touch & drag anywhere on screen", "Survive as speed continuously scales"],
    rating: 4.7,
    plays: 31200,
    tags: ["Racing", "Traffic", "Speed", "Reflex"],
    isFeatured: true,
    themeColor: "#f97316"
  }
];

// Cloaking configurations
const CLOAK_CONFIGS = {
  default: {
    title: 'PlayVault - Unblocked Games Portal',
    favicon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2338bdf8"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>'
  },
  docs: {
    title: 'Document - Google Docs',
    favicon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico'
  },
  drive: {
    title: 'My Drive - Google Drive',
    favicon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png'
  },
  classroom: {
    title: 'Classes - Google Classroom',
    favicon: 'https://ssl.gstatic.com/classroom/favicon.png'
  },
  canvas: {
    title: 'Dashboard - Canvas LMS',
    favicon: 'https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico'
  }
};

// SVG Icons helper
const Icons = {
  shield: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>`,
  gamepad: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>`,
  search: `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>`,
  plus: `<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>`,
  code: `<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>`,
  eyeOff: `<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>`,
  panic: `<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>`,
  play: `<svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>`,
  star: (active) => `<svg class="w-4 h-4 ${active ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}" fill="${active ? 'currentColor' : 'none'}" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>`,
  close: `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`,
  expand: `<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>`,
  reload: `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>`,
  external: `<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>`
};

class PlayVaultApp {
  constructor() {
    this.games = [];
    this.favorites = this.getStoredFavorites();
    this.searchQuery = '';
    this.selectedCategory = 'all';
    this.sortBy = 'popular';
    this.activeGame = null;
    this.currentCloak = localStorage.getItem('playvault_cloak') || 'default';
    this.showAddModal = false;
    this.showJsonModal = false;
    this.showCloakModal = false;

    this.init();
  }

  getStoredFavorites() {
    try {
      return JSON.parse(localStorage.getItem('playvault_favorites') || '[]');
    } catch {
      return [];
    }
  }

  saveFavorites() {
    localStorage.setItem('playvault_favorites', JSON.stringify(this.favorites));
  }

  getCustomGames() {
    try {
      return JSON.parse(localStorage.getItem('playvault_custom_games') || '[]');
    } catch {
      return [];
    }
  }

  saveCustomGame(data) {
    let iframeUrl = data.iframeCodeOrUrl.trim();
    let iframeSnippet = '';

    if (iframeUrl.startsWith('<iframe')) {
      iframeSnippet = iframeUrl;
      const match = iframeUrl.match(/src=["'](.*?)["']/);
      iframeUrl = match ? match[1] : '';
    } else {
      iframeSnippet = `<iframe src="${iframeUrl}" title="${data.title}" allowfullscreen="true" style="border:0;width:100%;height:100%;"></iframe>`;
    }

    const newGame = {
      id: 'custom-' + Date.now(),
      title: data.title,
      category: data.category || 'Arcade',
      description: data.description || 'Custom added unblocked game',
      iframe: iframeSnippet,
      iframeUrl: iframeUrl,
      controls: data.controls || ['Standard controls'],
      rating: 5.0,
      plays: 1,
      tags: ['Custom', data.category],
      themeColor: '#38bdf8',
      isCustom: true
    };

    const existing = this.getCustomGames();
    const updated = [newGame, ...existing];
    localStorage.setItem('playvault_custom_games', JSON.stringify(updated));
    this.games.unshift(newGame);
    this.render();
  }

  applyCloak(preset) {
    const config = CLOAK_CONFIGS[preset] || CLOAK_CONFIGS.default;
    document.title = config.title;
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'shortcut icon';
      document.head.appendChild(link);
    }
    link.href = config.favicon;
    this.currentCloak = preset;
    localStorage.setItem('playvault_cloak', preset);
    this.render();
  }

  triggerPanic() {
    window.location.href = 'https://classroom.google.com';
  }

  openInAboutBlank(game) {
    const win = window.open('about:blank', '_blank');
    if (!win) {
      alert('Pop-up blocked. Please allow popups for PlayVault.');
      return;
    }
    win.document.title = 'Document';
    win.document.body.style.margin = '0';
    win.document.body.style.height = '100vh';
    win.document.body.style.overflow = 'hidden';
    win.document.body.style.background = '#000';

    const iframe = win.document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.allow = 'autoplay; fullscreen; keyboard; gamepad';
    
    // Resolve relative URL properly for about:blank
    let finalUrl = game.iframeUrl;
    if (finalUrl.startsWith('./')) {
      finalUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + finalUrl.substring(2);
    }
    iframe.src = finalUrl;
    win.document.body.appendChild(iframe);
  }

  async loadGames() {
    let jsonGames = [];
    try {
      const res = await fetch('./games.json');
      if (res.ok) jsonGames = await res.json();
    } catch (e) {
      console.warn('Direct fetch failed, checking fallback...', e);
    }

    if (!jsonGames || jsonGames.length === 0) {
      try {
        const res2 = await fetch('./public/games.json');
        if (res2.ok) jsonGames = await res2.json();
      } catch (e) {}
    }

    if (!jsonGames || jsonGames.length === 0) {
      jsonGames = DEFAULT_GAMES;
    }

    const customGames = this.getCustomGames();
    this.games = [...customGames, ...jsonGames];
    this.render();
  }

  init() {
    this.applyCloak(this.currentCloak);

    // Global Panic Key listener
    window.addEventListener('keydown', (e) => {
      if (e.key === ']') {
        this.triggerPanic();
      }
    });

    this.loadGames();
  }

  toggleFavorite(id) {
    const idx = this.favorites.indexOf(id);
    if (idx >= 0) this.favorites.splice(idx, 1);
    else this.favorites.push(id);
    this.saveFavorites();
    this.render();
  }

  getFilteredGames() {
    let list = [...this.games];

    if (this.selectedCategory === 'favorites') {
      list = list.filter(g => this.favorites.includes(g.id));
    } else if (this.selectedCategory === 'popular') {
      list = list.filter(g => g.plays >= 25000);
    } else if (this.selectedCategory !== 'all') {
      list = list.filter(g => g.category.toLowerCase() === this.selectedCategory.toLowerCase());
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(g =>
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q) ||
        (g.tags && g.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    list.sort((a, b) => {
      if (this.sortBy === 'popular') return (b.plays || 0) - (a.plays || 0);
      if (this.sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (this.sortBy === 'alpha') return a.title.localeCompare(b.title);
      return 0;
    });

    return list;
  }

  render() {
    const appEl = document.getElementById('app') || document.getElementById('root');
    if (!appEl) return;

    const filtered = this.getFilteredGames();
    const featuredGame = this.games.find(g => g.isFeatured) || this.games[0];

    appEl.innerHTML = `
      <!-- Top Bar Contract -->
      <header class="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
        <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div class="flex items-center gap-3">
            <button id="nav-brand" class="flex items-center gap-2.5 text-left group focus:outline-none">
              <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:border-cyan-400/60 transition-colors">
                ${Icons.shield}
              </div>
              <div>
                <span class="text-lg font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  PlayVault
                </span>
                <span class="hidden sm:inline-block ml-2 text-xs text-slate-400">
                  Unblocked Games
                </span>
              </div>
            </button>
          </div>

          <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button class="nav-cat-btn ${this.selectedCategory === 'all' ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400 pb-0.5' : 'hover:text-white'}" data-cat="all">All Games</button>
            <button class="nav-cat-btn ${this.selectedCategory === 'popular' ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400 pb-0.5' : 'hover:text-white'}" data-cat="popular">Popular</button>
            <button class="nav-cat-btn ${this.selectedCategory === 'Puzzle' ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400 pb-0.5' : 'hover:text-white'}" data-cat="Puzzle">Puzzles</button>
            <button class="nav-cat-btn ${this.selectedCategory === 'Arcade' ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400 pb-0.5' : 'hover:text-white'}" data-cat="Arcade">Arcade</button>
            <button class="nav-cat-btn ${this.selectedCategory === 'favorites' ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400 pb-0.5' : 'hover:text-white'}" data-cat="favorites">Favorites</button>
            <button id="btn-open-json-nav" class="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors">
              ${Icons.code}
              <span>JSON Database</span>
            </button>
          </nav>

          <div class="flex items-center gap-2 sm:gap-3">
            <button id="btn-add-game" class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors">
              ${Icons.plus}
              <span class="hidden sm:inline">Add Game</span>
            </button>

            <button id="btn-tab-cloak" class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              this.currentCloak !== 'default'
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600/50 hover:bg-emerald-900/60'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white hover:bg-slate-800'
            }">
              ${Icons.eyeOff}
              <span class="hidden sm:inline">${this.currentCloak !== 'default' ? 'Cloak: Active' : 'Tab Cloak'}</span>
            </button>

            <button id="btn-panic" class="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-rose-300 bg-rose-950/40 border border-rose-800/60 hover:bg-rose-900/60 rounded-lg transition-colors" title="Hotkey: Press ']' to panic">
              ${Icons.panic}
              <span>Panic</span>
            </button>
          </div>
        </div>
      </header>

      <main class="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <!-- Hero Spotlight (Shown on All Games tab without active search) -->
        ${this.selectedCategory === 'all' && !this.searchQuery && featuredGame ? `
          <div class="relative mb-8 overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 p-6 sm:p-8 lg:p-10 shadow-2xl">
            <div class="relative z-10 max-w-2xl">
              <div class="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-3">
                <span>Featured Game of the Day</span>
                <span class="text-slate-600">·</span>
                <span class="text-slate-400">Secure Iframe Embed</span>
              </div>
              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                ${featuredGame.title}
              </h1>
              <p class="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                ${featuredGame.description}
              </p>
              <div class="mt-4 flex items-center gap-3 text-xs text-slate-400">
                <span>${featuredGame.category}</span>
                <span class="text-slate-600">·</span>
                <span class="tabular-nums">${featuredGame.rating} ★ Rating</span>
                <span class="text-slate-600">·</span>
                <span class="tabular-nums">${(featuredGame.plays / 1000).toFixed(1)}k Plays</span>
                <span class="text-slate-600">·</span>
                <span class="text-emerald-400">100% Unblocked</span>
              </div>
              <div class="mt-6 flex flex-wrap items-center gap-3">
                <button id="hero-launch-btn" class="flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-400/25 hover:bg-cyan-300 transition-all cursor-pointer">
                  ${Icons.play}
                  <span>Launch ${featuredGame.title}</span>
                </button>
                <button id="hero-json-btn" class="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer">
                  ${Icons.code}
                  <span>Inspect games.json</span>
                </button>
              </div>
            </div>
            <div class="absolute -right-10 -bottom-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>
          </div>
        ` : ''}

        <!-- Filter & Search Controls -->
        <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/80 pb-5">
          <div class="relative w-full sm:max-w-xs">
            <div class="absolute left-3 top-2.5 text-slate-400">${Icons.search}</div>
            <input
              id="search-input"
              type="text"
              placeholder="Search games, tags, categories..."
              value="${this.searchQuery}"
              class="w-full rounded-lg border border-slate-800 bg-slate-900/90 pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
            ${this.searchQuery ? `<button id="clear-search-btn" class="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-white">✕</button>` : ''}
          </div>

          <div class="flex items-center gap-1 overflow-x-auto p-1 bg-slate-900/80 border border-slate-800/80 rounded-lg">
            ${[
              { id: 'all', label: 'All Games' },
              { id: 'popular', label: '🔥 Popular' },
              { id: 'Arcade', label: 'Arcade' },
              { id: 'Puzzle', label: 'Puzzle' },
              { id: 'Action', label: 'Action' },
              { id: 'Sports', label: 'Sports' },
              { id: 'favorites', label: `★ Favorites (${this.favorites.length})` }
            ].map(cat => `
              <button
                class="category-tab-btn px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  this.selectedCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }"
                data-cat="${cat.id}"
              >
                ${cat.label}
              </button>
            `).join('')}
          </div>

          <div class="hidden lg:flex items-center gap-2 text-xs text-slate-400">
            <span>Sort:</span>
            <select id="sort-select" class="rounded border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-slate-200 focus:outline-none">
              <option value="popular" ${this.sortBy === 'popular' ? 'selected' : ''}>Most Played</option>
              <option value="rating" ${this.sortBy === 'rating' ? 'selected' : ''}>Top Rated</option>
              <option value="alpha" ${this.sortBy === 'alpha' ? 'selected' : ''}>A - Z</option>
            </select>
          </div>
        </div>

        <!-- Section Header -->
        <div class="mb-4 flex items-center justify-between">
          <div class="flex items-baseline gap-2">
            <h2 class="text-lg font-bold text-white tracking-tight">
              ${this.selectedCategory === 'all' ? 'All Available Games' : this.selectedCategory === 'favorites' ? 'Your Bookmarked Favorites' : `${this.selectedCategory} Games`}
            </h2>
            <span class="text-xs text-slate-500 tabular-nums">(${filtered.length} titles)</span>
          </div>
          <button id="btn-add-game-inline" class="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium cursor-pointer">
            ${Icons.plus}
            <span>Add Custom Iframe Game</span>
          </button>
        </div>

        <!-- Games Grid -->
        ${filtered.length > 0 ? `
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            ${filtered.map(game => {
              const isFav = this.favorites.includes(game.id);
              return `
                <div class="game-card group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-xl cursor-pointer" data-id="${game.id}">
                  <div>
                    <div class="relative mb-3 flex h-36 w-full items-center justify-center rounded-lg border border-slate-800 bg-slate-950/80" style="background-image: radial-gradient(circle at 50% 50%, ${game.themeColor || '#0ea5e9'}18 0%, transparent 80%)">
                      <button class="fav-toggle-btn absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-md bg-slate-900/80 hover:bg-slate-800 transition-colors" data-id="${game.id}" title="Toggle Favorite">
                        ${Icons.star(isFav)}
                      </button>
                      <div class="flex flex-col items-center gap-2">
                        <div class="flex h-12 w-12 items-center justify-center rounded-lg border" style="border-color: ${game.themeColor || '#0ea5e9'}40; background-color: ${game.themeColor || '#0ea5e9'}15; color: ${game.themeColor || '#38bdf8'};">
                          ${Icons.gamepad}
                        </div>
                        <span class="text-xs font-medium text-slate-400 uppercase tracking-wide">${game.category}</span>
                      </div>
                      <div class="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 backdrop-blur-[1px] transition-opacity group-hover:opacity-100">
                        <span class="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-lg">
                          ${Icons.play}
                          Play Now
                        </span>
                      </div>
                    </div>

                    <h3 class="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
                      ${game.title}
                    </h3>
                    <div class="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                      <span>${game.category}</span>
                      <span class="text-slate-600">·</span>
                      <span class="tabular-nums">${game.rating} ★</span>
                      <span class="text-slate-600">·</span>
                      <span class="tabular-nums">${(game.plays / 1000).toFixed(1)}k plays</span>
                    </div>
                    <p class="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      ${game.description}
                    </p>
                  </div>

                  <div class="mt-3.5 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
                    <span class="truncate max-w-[180px]">${game.controls ? game.controls[0] : 'Click to launch'}</span>
                    <span class="text-cyan-400 font-medium">Launch →</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : `
          <div class="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center">
            <div class="text-slate-600 mb-3">${Icons.gamepad}</div>
            <h3 class="text-base font-bold text-white">No games matched</h3>
            <p class="mt-1 text-xs text-slate-400">Try adjusting your search query or category filters.</p>
            <button id="reset-filters-btn" class="mt-4 rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700 cursor-pointer">
              Reset Filters
            </button>
          </div>
        `}
      </main>

      <footer class="mt-12 border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
        <div class="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
          <div class="flex items-center gap-3">
            <span class="font-semibold text-slate-400">PlayVault</span>
            <span>·</span>
            <span>Self-contained HTML5 & Iframe JSON games</span>
            <span>·</span>
            <button id="footer-json-btn" class="text-cyan-400 hover:underline cursor-pointer">View JSON Schema</button>
          </div>
          <div class="flex items-center gap-3">
            <span>Panic Hotkey: <kbd class="rounded bg-slate-900 px-1 py-0.5 font-mono text-[10px] text-slate-300">]</kbd></span>
            <span>·</span>
            <button id="footer-cloak-btn" class="hover:text-slate-300 cursor-pointer">Tab Cloak Settings</button>
          </div>
        </div>
      </footer>

      <!-- Modals and Overlays Container -->
      <div id="modal-root"></div>
    `;

    this.attachEvents();
    this.renderModals();
  }

  attachEvents() {
    // Navigation Brand
    document.getElementById('nav-brand')?.addEventListener('click', () => {
      this.selectedCategory = 'all';
      this.searchQuery = '';
      this.render();
    });

    // Navigation Category Tabs
    document.querySelectorAll('.nav-cat-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.selectedCategory = e.currentTarget.dataset.cat;
        this.render();
      });
    });

    // Category Tabs in Controls
    document.querySelectorAll('.category-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.selectedCategory = e.currentTarget.dataset.cat;
        this.render();
      });
    });

    // Search Input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.render();
        // Restore focus
        const nextInput = document.getElementById('search-input');
        if (nextInput) {
          nextInput.focus();
          nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
        }
      });
    }

    // Clear Search Button
    document.getElementById('clear-search-btn')?.addEventListener('click', () => {
      this.searchQuery = '';
      this.render();
    });

    // Sort Select
    document.getElementById('sort-select')?.addEventListener('change', (e) => {
      this.sortBy = e.target.value;
      this.render();
    });

    // Reset Filters Button
    document.getElementById('reset-filters-btn')?.addEventListener('click', () => {
      this.searchQuery = '';
      this.selectedCategory = 'all';
      this.render();
    });

    // Hero Launch & JSON buttons
    document.getElementById('hero-launch-btn')?.addEventListener('click', () => {
      const feat = this.games.find(g => g.isFeatured) || this.games[0];
      if (feat) this.openPlayer(feat);
    });
    document.getElementById('hero-json-btn')?.addEventListener('click', () => {
      this.showJsonModal = true;
      this.render();
    });

    // Nav JSON button
    document.getElementById('btn-open-json-nav')?.addEventListener('click', () => {
      this.showJsonModal = true;
      this.render();
    });
    document.getElementById('footer-json-btn')?.addEventListener('click', () => {
      this.showJsonModal = true;
      this.render();
    });

    // Add Game buttons
    document.getElementById('btn-add-game')?.addEventListener('click', () => {
      this.showAddModal = true;
      this.render();
    });
    document.getElementById('btn-add-game-inline')?.addEventListener('click', () => {
      this.showAddModal = true;
      this.render();
    });

    // Cloak buttons
    document.getElementById('btn-tab-cloak')?.addEventListener('click', () => {
      this.showCloakModal = true;
      this.render();
    });
    document.getElementById('footer-cloak-btn')?.addEventListener('click', () => {
      this.showCloakModal = true;
      this.render();
    });

    // Panic Button
    document.getElementById('btn-panic')?.addEventListener('click', () => {
      this.triggerPanic();
    });

    // Favorite buttons
    document.querySelectorAll('.fav-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.dataset.id;
        this.toggleFavorite(id);
      });
    });

    // Game card click to launch
    document.querySelectorAll('.game-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.fav-toggle-btn')) return;
        const id = card.dataset.id;
        const game = this.games.find(g => g.id === id);
        if (game) this.openPlayer(game);
      });
    });
  }

  openPlayer(game) {
    this.activeGame = game;
    this.render();
  }

  closePlayer() {
    this.activeGame = null;
    this.render();
  }

  renderModals() {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return;

    let html = '';

    // Active Game Player
    if (this.activeGame) {
      const g = this.activeGame;
      const isFav = this.favorites.includes(g.id);
      html += `
        <div class="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-md overflow-y-auto">
          <div class="flex h-14 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 sm:px-6">
            <div class="flex items-center gap-3">
              <button id="player-close-btn" class="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer">
                ${Icons.close}
                <span class="hidden sm:inline">Back to Games</span>
              </button>
              <span class="text-slate-600">|</span>
              <h2 class="text-sm sm:text-base font-bold text-white truncate max-w-[200px] sm:max-w-md">${g.title}</h2>
              <span class="hidden md:inline text-xs text-slate-400">(${g.category})</span>
            </div>

            <div class="flex items-center gap-2">
              <button id="player-fav-btn" class="flex h-8 w-8 items-center justify-center rounded-lg border ${isFav ? 'bg-amber-500/10 border-amber-500/40 text-amber-400' : 'bg-slate-800 border-slate-700 text-slate-300'}">
                ${Icons.star(isFav)}
              </button>
              <button id="player-reload-btn" class="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white" title="Reload Game">
                ${Icons.reload}
              </button>
              <button id="player-blank-btn" class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white" title="Open in stealth about:blank window">
                ${Icons.external}
                <span>about:blank</span>
              </button>
              <button id="player-fullscreen-btn" class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-600 text-white hover:bg-cyan-500">
                ${Icons.expand}
                <span class="hidden sm:inline">Fullscreen</span>
              </button>
            </div>
          </div>

          <div class="flex-1 flex flex-col items-center justify-start p-3 sm:p-6 max-w-6xl mx-auto w-full">
            <div id="iframe-wrapper" class="relative w-full rounded-xl border border-slate-800 bg-black overflow-hidden shadow-2xl aspect-[16/10] max-h-[75vh] min-h-[420px]">
              <iframe
                id="game-iframe"
                src="${g.iframeUrl}"
                title="${g.title}"
                class="w-full h-full border-0 block"
                allow="autoplay; fullscreen; keyboard; gamepad"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              ></iframe>
            </div>

            <div class="mt-4 w-full rounded-xl border border-slate-800 bg-slate-900 p-4">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  ${Icons.code}
                  <span>Stored Iframe in games.json</span>
                </div>
                <button id="copy-iframe-btn" class="text-xs text-cyan-400 hover:text-cyan-300 font-medium">Copy Iframe Snippet</button>
              </div>
              <pre class="overflow-x-auto rounded bg-slate-950 p-3 text-xs font-mono text-cyan-300 border border-slate-800">${escapeHtml(g.iframe)}</pre>
            </div>

            <div class="mt-6 grid w-full grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div class="md:col-span-2 rounded-xl border border-slate-800 bg-slate-900/40 p-5">
                <h3 class="text-sm font-bold text-white uppercase tracking-wider">About ${g.title}</h3>
                <p class="mt-2 text-sm text-slate-300 leading-relaxed">${g.description}</p>
              </div>
              <div class="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
                <h3 class="text-sm font-bold text-white uppercase tracking-wider">Controls</h3>
                <ul class="mt-3 space-y-1.5 text-xs text-slate-300">
                  ${(g.controls || ['Click to start']).map(c => `<li>› ${c}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // Add Game Modal
    if (this.showAddModal) {
      html += `
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div class="relative w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 class="text-base font-bold text-white">Add Game via Iframe</h2>
              <button id="modal-close-add" class="text-slate-400 hover:text-white">${Icons.close}</button>
            </div>
            <form id="add-game-form" class="mt-4 space-y-3">
              <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">Game Title *</label>
                <input id="add-title" type="text" placeholder="e.g. Slope, Retro Bowl" required class="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white" />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select id="add-category" class="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white">
                    <option value="Arcade">Arcade</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Action">Action</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1">Controls</label>
                  <input id="add-controls" type="text" placeholder="e.g. Arrow keys" class="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white" />
                </div>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">Iframe Snippet or Game URL *</label>
                <textarea id="add-iframe" rows="3" placeholder='<iframe src="..." ...></iframe> or https://...' required class="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-mono text-cyan-300"></textarea>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <input id="add-desc" type="text" placeholder="Brief summary" class="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white" />
              </div>
              <div class="mt-5 flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" id="modal-cancel-add" class="px-3.5 py-1.5 text-xs text-slate-400">Cancel</button>
                <button type="submit" class="px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 rounded-lg">Save Game</button>
              </div>
            </form>
          </div>
        </div>
      `;
    }

    // JSON Viewer Modal
    if (this.showJsonModal) {
      const jsonStr = JSON.stringify(this.games, null, 2);
      html += `
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div class="relative flex flex-col h-[85vh] w-full max-w-3xl rounded-xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
            <div class="flex h-14 shrink-0 items-center justify-between border-b border-slate-800 px-6">
              <h2 class="text-sm font-bold text-white">games.json Database (${this.games.length} titles)</h2>
              <div class="flex items-center gap-2">
                <button id="btn-copy-json" class="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white">Copy JSON</button>
                <button id="btn-dl-json" class="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white">Download</button>
                <button id="modal-close-json" class="ml-2 text-slate-400 hover:text-white">${Icons.close}</button>
              </div>
            </div>
            <div class="flex-1 overflow-auto p-4 bg-slate-950 font-mono text-xs text-cyan-300">
              <pre>${escapeHtml(jsonStr)}</pre>
            </div>
          </div>
        </div>
      `;
    }

    // Cloak Modal
    if (this.showCloakModal) {
      html += `
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div class="relative w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 class="text-sm font-bold text-white">Stealth Tab Cloak</h2>
              <button id="modal-close-cloak" class="text-slate-400 hover:text-white">${Icons.close}</button>
            </div>
            <p class="mt-3 text-xs text-slate-300">Disguise browser tab title and favicon to appear as school applications.</p>
            <div class="mt-4 space-y-2">
              ${[
                { id: 'default', label: 'Standard Uncloaked', desc: 'Normal PlayVault tab title and icon' },
                { id: 'docs', label: 'Google Docs', desc: 'Document - Google Docs' },
                { id: 'drive', label: 'Google Drive', desc: 'My Drive - Google Drive' },
                { id: 'classroom', label: 'Google Classroom', desc: 'Classes - Google Classroom' },
                { id: 'canvas', label: 'Canvas LMS', desc: 'Dashboard - Canvas LMS' }
              ].map(p => `
                <button class="cloak-opt-btn w-full flex items-center justify-between p-3 rounded-lg border text-left cursor-pointer ${
                  this.currentCloak === p.id
                    ? 'border-emerald-500/60 bg-emerald-950/30 text-white'
                    : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:bg-slate-800/60'
                }" data-preset="${p.id}">
                  <div>
                    <div class="text-xs font-semibold">${p.label} ${this.currentCloak === p.id ? '<span class="text-emerald-400 text-[10px] ml-1 uppercase">Active</span>' : ''}</div>
                    <div class="text-[11px] text-slate-400">${p.desc}</div>
                  </div>
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }

    modalRoot.innerHTML = html;

    // Attach modal events
    document.getElementById('player-close-btn')?.addEventListener('click', () => this.closePlayer());
    document.getElementById('player-fav-btn')?.addEventListener('click', () => {
      if (this.activeGame) this.toggleFavorite(this.activeGame.id);
    });
    document.getElementById('player-reload-btn')?.addEventListener('click', () => {
      const iframe = document.getElementById('game-iframe');
      if (iframe && this.activeGame) iframe.src = this.activeGame.iframeUrl;
    });
    document.getElementById('player-blank-btn')?.addEventListener('click', () => {
      if (this.activeGame) this.openInAboutBlank(this.activeGame);
    });
    document.getElementById('player-fullscreen-btn')?.addEventListener('click', () => {
      const wrapper = document.getElementById('iframe-wrapper');
      if (!wrapper) return;
      if (!document.fullscreenElement) {
        wrapper.requestFullscreen().catch(err => console.warn(err));
      } else {
        document.exitFullscreen().catch(err => console.warn(err));
      }
    });
    document.getElementById('copy-iframe-btn')?.addEventListener('click', () => {
      if (this.activeGame) {
        navigator.clipboard.writeText(this.activeGame.iframe);
        const btn = document.getElementById('copy-iframe-btn');
        if (btn) btn.textContent = 'Copied to Clipboard!';
        setTimeout(() => {
          if (btn) btn.textContent = 'Copy Iframe Snippet';
        }, 2000);
      }
    });

    // Add Modal events
    document.getElementById('modal-close-add')?.addEventListener('click', () => {
      this.showAddModal = false;
      this.render();
    });
    document.getElementById('modal-cancel-add')?.addEventListener('click', () => {
      this.showAddModal = false;
      this.render();
    });
    document.getElementById('add-game-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('add-title').value;
      const category = document.getElementById('add-category').value;
      const controls = document.getElementById('add-controls').value;
      const iframeCodeOrUrl = document.getElementById('add-iframe').value;
      const desc = document.getElementById('add-desc').value;

      this.saveCustomGame({
        title,
        category,
        controls: controls ? [controls] : ['Standard controls'],
        iframeCodeOrUrl,
        description: desc
      });

      this.showAddModal = false;
      this.render();
    });

    // JSON Modal events
    document.getElementById('modal-close-json')?.addEventListener('click', () => {
      this.showJsonModal = false;
      this.render();
    });
    document.getElementById('btn-copy-json')?.addEventListener('click', () => {
      navigator.clipboard.writeText(JSON.stringify(this.games, null, 2));
      const btn = document.getElementById('btn-copy-json');
      if (btn) btn.textContent = 'Copied!';
      setTimeout(() => { if (btn) btn.textContent = 'Copy JSON'; }, 2000);
    });
    document.getElementById('btn-dl-json')?.addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(this.games, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'games.json';
      a.click();
      URL.revokeObjectURL(url);
    });

    // Cloak Modal events
    document.getElementById('modal-close-cloak')?.addEventListener('click', () => {
      this.showCloakModal = false;
      this.render();
    });
    document.querySelectorAll('.cloak-opt-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const preset = e.currentTarget.dataset.preset;
        this.applyCloak(preset);
        this.showCloakModal = false;
        this.render();
      });
    });
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Initialize on DOM load
function initPlayVault() {
  if (window.__playVaultAppInstance) return;
  window.PlayVaultLoaded = true;
  window.__playVaultAppInstance = new PlayVaultApp();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPlayVault);
} else {
  initPlayVault();
}
