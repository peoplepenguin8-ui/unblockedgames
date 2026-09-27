const CUSTOM_GAMES_KEY = 'playvault_custom_games';
const FAVORITES_KEY = 'playvault_favorites';
const RECENT_KEY = 'playvault_recent';
const CLOAK_KEY = 'playvault_cloak';

export const CLOAK_CONFIGS = {
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

export function applyCloak(preset) {
  try {
    const config = CLOAK_CONFIGS[preset] || CLOAK_CONFIGS.default;
    document.title = config.title;

    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'shortcut icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = config.favicon;
    localStorage.setItem(CLOAK_KEY, preset);
  } catch (e) {
    console.error('Failed to apply cloak', e);
  }
}

export function getSavedCloak() {
  return localStorage.getItem(CLOAK_KEY) || 'default';
}

export function triggerPanicRedirect() {
  window.location.href = 'https://classroom.google.com';
}

export function openInAboutBlank(game) {
  const win = window.open('about:blank', '_blank');
  if (!win) {
    alert('Pop-up was blocked. Please allow pop-ups for this site.');
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
  iframe.style.margin = '0';
  iframe.allow = 'autoplay; fullscreen; keyboard';
  iframe.src = window.location.origin + game.iframeUrl;
  win.document.body.appendChild(iframe);
}

export async function fetchGamesFromJSON() {
  try {
    const res = await fetch('/games.json');
    if (!res.ok) throw new Error('Failed to fetch /games.json');
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('Could not load /games.json, returning empty list', err);
    return [];
  }
}

export function getCustomGames() {
  try {
    const raw = localStorage.getItem(CUSTOM_GAMES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomGame(gameData) {
  const id = 'custom-' + Date.now();
  let iframeUrl = gameData.iframeCodeOrUrl.trim();
  let iframeSnippet = '';

  if (iframeUrl.startsWith('<iframe')) {
    iframeSnippet = iframeUrl;
    const match = iframeUrl.match(/src=["'](.*?)["']/);
    iframeUrl = match ? match[1] : '';
  } else {
    iframeSnippet = `<iframe src="${iframeUrl}" title="${gameData.title}" allowfullscreen="true" style="border:0;width:100%;height:100%;"></iframe>`;
  }

  const newGame = {
    id,
    title: gameData.title,
    category: gameData.category || 'Arcade',
    description: gameData.description || 'Custom added unblocked game',
    iframe: iframeSnippet,
    iframeUrl: iframeUrl,
    controls: gameData.controls && gameData.controls.length > 0 ? gameData.controls : ['Standard keyboard/mouse controls'],
    rating: 5.0,
    plays: 1,
    tags: ['Custom', 'User-Added', gameData.category],
    isFeatured: false,
    themeColor: '#38bdf8',
    isCustom: true
  };

  const existing = getCustomGames();
  const updated = [newGame, ...existing];
  localStorage.setItem(CUSTOM_GAMES_KEY, JSON.stringify(updated));
  return newGame;
}

export function deleteCustomGame(id) {
  const existing = getCustomGames();
  const updated = existing.filter(g => g.id !== id);
  localStorage.setItem(CUSTOM_GAMES_KEY, JSON.stringify(updated));
}

export function getFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(id) {
  const favs = getFavorites();
  const index = favs.indexOf(id);
  let isNowFav = false;
  if (index >= 0) {
    favs.splice(index, 1);
    isNowFav = false;
  } else {
    favs.push(id);
    isNowFav = true;
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  return isNowFav;
}

export function getRecentPlayed() {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addRecentPlayed(id) {
  try {
    const recent = getRecentPlayed().filter(item => item !== id);
    recent.unshift(id);
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, 10)));
  } catch (e) {
    console.error(e);
  }
}
