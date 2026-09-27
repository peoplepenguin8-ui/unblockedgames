import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  Play,
  PlusCircle,
  FileCode,
  Gamepad2
} from 'lucide-react';
import {
  fetchGamesFromJSON,
  getCustomGames,
  saveCustomGame,
  getFavorites,
  toggleFavorite,
  getSavedCloak,
  applyCloak,
  triggerPanicRedirect,
  addRecentPlayed,
} from './utils/gamesManager.js';
import { Navbar } from './components/Navbar.jsx';
import { GameCard } from './components/GameCard.jsx';
import { GamePlayer } from './components/GamePlayer.jsx';
import { AddGameModal } from './components/AddGameModal.jsx';
import { JsonViewerModal } from './components/JsonViewerModal.jsx';
import { CloakModal } from './components/CloakModal.jsx';

export default function App() {
  const [games, setGames] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [activeGame, setActiveGame] = useState(null);
  const [currentCloak, setCurrentCloak] = useState('default');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [isCloakModalOpen, setIsCloakModalOpen] = useState(false);

  // Load games from games.json and custom local games
  useEffect(() => {
    async function loadAllGames() {
      const defaultGames = await fetchGamesFromJSON();
      const customGames = getCustomGames();
      setGames([...customGames, ...defaultGames]);
      setFavorites(getFavorites());
      const savedCloak = getSavedCloak();
      setCurrentCloak(savedCloak);
      applyCloak(savedCloak);
    }
    loadAllGames();
  }, []);

  // Panic hotkey listener (key ']' anywhere on page)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ']') {
        triggerPanicRedirect();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleFavorite = (id, e) => {
    e.stopPropagation();
    toggleFavorite(id);
    setFavorites(getFavorites());
  };

  const handlePlayGame = (game) => {
    addRecentPlayed(game.id);
    setActiveGame(game);
  };

  const handleAddGame = (gameData) => {
    const newGame = saveCustomGame(gameData);
    setGames(prev => [newGame, ...prev]);
  };

  const handleSelectCloak = (preset) => {
    setCurrentCloak(preset);
    applyCloak(preset);
  };

  // Filter & Sort
  const filteredGames = useMemo(() => {
    let result = [...games];

    // Category filter
    if (selectedCategory === 'favorites') {
      result = result.filter(g => favorites.includes(g.id));
    } else if (selectedCategory === 'popular') {
      result = result.filter(g => g.plays >= 25000);
    } else if (selectedCategory !== 'all') {
      result = result.filter(
        g => g.category && g.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        g =>
          (g.title && g.title.toLowerCase().includes(q)) ||
          (g.description && g.description.toLowerCase().includes(q)) ||
          (g.category && g.category.toLowerCase().includes(q)) ||
          (g.tags && g.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'popular') return (b.plays || 0) - (a.plays || 0);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'alpha') return (a.title || '').localeCompare(b.title || '');
      return 0;
    });

    return result;
  }, [games, selectedCategory, searchQuery, sortBy, favorites]);

  // Featured spotlight game
  const featuredGame = useMemo(() => {
    return games.find(g => g.isFeatured) || games[0];
  }, [games]);

  const categories = [
    { id: 'all', label: 'All Games' },
    { id: 'popular', label: '🔥 Most Popular' },
    { id: 'Arcade', label: 'Arcade' },
    { id: 'Puzzle', label: 'Puzzle & Logic' },
    { id: 'Action', label: 'Action & Shooter' },
    { id: 'Sports', label: 'Sports & Racing' },
    { id: 'favorites', label: `★ Favorites (${favorites.length})` },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Bar Contract (1 Row, 3 Zones) */}
      <Navbar
        currentTab={selectedCategory}
        onSelectTab={setSelectedCategory}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenJsonModal={() => setIsJsonModalOpen(true)}
        onOpenCloakModal={() => setIsCloakModalOpen(true)}
        onPanic={triggerPanicRedirect}
        currentCloak={currentCloak}
      />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Dominant Hero Focal Anchor */}
        {selectedCategory === 'all' && !searchQuery && featuredGame && (
          <div className="relative mb-8 overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 p-6 sm:p-8 lg:p-10 shadow-2xl">
            <div className="relative z-10 max-w-2xl">
              {/* Quiet unboxed text kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-3">
                <Sparkles className="h-4 w-4" />
                <span>Featured Game of the Day</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">Secure Iframe Embed</span>
              </div>

              {/* Title with balanced measure */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                {featuredGame.title}
              </h1>

              {/* Description */}
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                {featuredGame.description}
              </p>

              {/* Metadata */}
              <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                <span>{featuredGame.category}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="tabular-nums">{Number(featuredGame.rating || 0).toFixed(1)} ★ Rating</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="tabular-nums">{(Number(featuredGame.plays || 0) / 1000).toFixed(1)}k Plays</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-emerald-400">100% Unblocked</span>
              </div>

              {/* Primary Launch Action */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handlePlayGame(featuredGame)}
                  className="flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-400/25 hover:bg-cyan-300 hover:shadow-cyan-400/40 transition-all cursor-pointer"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span>Launch {featuredGame.title}</span>
                </button>

                <button
                  onClick={() => setIsJsonModalOpen(true)}
                  className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
                >
                  <FileCode className="h-4 w-4" />
                  <span>Inspect games.json</span>
                </button>
              </div>
            </div>

            {/* Ambient Background Graphic */}
            <div className="absolute -right-10 -bottom-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/80 pb-5">
          {/* Search Box */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search games, tags, categories..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900/90 pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-900/80 border border-slate-800/80 rounded-lg no-scrollbar">
            {categories.map(cat => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                    active
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="rounded border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-slate-200 focus:outline-none"
            >
              <option value="popular">Most Played</option>
              <option value="rating">Top Rated</option>
              <option value="alpha">A - Z</option>
            </select>
          </div>
        </div>

        {/* Catalog Section Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight">
              {selectedCategory === 'all'
                ? 'All Available Games'
                : selectedCategory === 'favorites'
                ? 'Your Bookmarked Favorites'
                : selectedCategory === 'popular'
                ? 'Trending & High Play Count'
                : `${selectedCategory} Games`}
            </h2>
            <span className="text-xs text-slate-500 tabular-nums">
              ({filteredGames.length} titles)
            </span>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium cursor-pointer"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Add Custom Iframe Game</span>
          </button>
        </div>

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredGames.map(game => (
              <GameCard
                key={game.id}
                game={game}
                isFavorite={favorites.includes(game.id)}
                onPlay={handlePlayGame}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center">
            <Gamepad2 className="h-12 w-12 text-slate-600 mb-3" />
            <h3 className="text-base font-bold text-white">No games matched</h3>
            <p className="mt-1 text-xs text-slate-400 max-w-sm">
              We couldn't find any games matching &quot;{searchQuery}&quot; in the {selectedCategory} category.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700 cursor-pointer"
              >
                Reset Search
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-400 cursor-pointer"
              >
                Add Game via Iframe
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-400">PlayVault</span>
            <span>·</span>
            <span>Self-contained HTML5 & Iframe JSON games</span>
            <span>·</span>
            <button
              onClick={() => setIsJsonModalOpen(true)}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              View JSON Schema
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span>Panic Hotkey: <kbd className="rounded bg-slate-900 px-1 py-0.5 font-mono text-[10px] text-slate-300">]</kbd></span>
            <span>·</span>
            <button
              onClick={() => setIsCloakModalOpen(true)}
              className="hover:text-slate-300 cursor-pointer"
            >
              Tab Cloak Settings
            </button>
          </div>
        </div>
      </footer>

      {/* Iframe Game Player Modal */}
      {activeGame && (
        <GamePlayer
          game={activeGame}
          isFavorite={favorites.includes(activeGame.id)}
          onToggleFavorite={handleToggleFavorite}
          onClose={() => setActiveGame(null)}
        />
      )}

      {/* Add Game Modal */}
      <AddGameModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddGame}
      />

      {/* JSON Viewer Modal */}
      <JsonViewerModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        games={games}
      />

      {/* Cloak Settings Modal */}
      <CloakModal
        isOpen={isCloakModalOpen}
        onClose={() => setIsCloakModalOpen(false)}
        currentCloak={currentCloak}
        onSelectCloak={handleSelectCloak}
      />
    </div>
  );
}
