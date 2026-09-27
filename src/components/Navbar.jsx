import React from 'react';
import { Shield, Plus, Code2, AlertTriangle, EyeOff } from 'lucide-react';

export const Navbar = ({
  currentTab,
  onSelectTab,
  onOpenAddModal,
  onOpenJsonModal,
  onOpenCloakModal,
  onPanic,
  currentCloak,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectTab('all')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:border-cyan-400/60 transition-colors">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                PlayVault
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-slate-400">
                Unblocked Games
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectTab('all')}
            className={`transition-colors hover:text-white pb-0.5 ${
              currentTab === 'all' ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400' : ''
            }`}
          >
            All Games
          </button>
          <button
            onClick={() => onSelectTab('popular')}
            className={`transition-colors hover:text-white pb-0.5 ${
              currentTab === 'popular' ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400' : ''
            }`}
          >
            Popular
          </button>
          <button
            onClick={() => onSelectTab('Puzzle')}
            className={`transition-colors hover:text-white pb-0.5 ${
              currentTab === 'Puzzle' ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400' : ''
            }`}
          >
            Puzzles
          </button>
          <button
            onClick={() => onSelectTab('Arcade')}
            className={`transition-colors hover:text-white pb-0.5 ${
              currentTab === 'Arcade' ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400' : ''
            }`}
          >
            Arcade
          </button>
          <button
            onClick={() => onSelectTab('favorites')}
            className={`transition-colors hover:text-white pb-0.5 ${
              currentTab === 'favorites' ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400' : ''
            }`}
          >
            Favorites
          </button>
          <button
            onClick={onOpenJsonModal}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
            title="View games.json data"
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>JSON Database</span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Add Game, Cloak, Panic) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
            title="Add game via Iframe code or URL"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Add Game</span>
          </button>

          <button
            onClick={onOpenCloakModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
              currentCloak !== 'default'
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600/50 hover:bg-emerald-900/60'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white hover:bg-slate-800'
            }`}
            title="Disguise browser tab (Google Docs, Classroom, etc.)"
          >
            <EyeOff className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">
              {currentCloak !== 'default' ? 'Cloak: Active' : 'Tab Cloak'}
            </span>
          </button>

          <button
            onClick={onPanic}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-rose-300 bg-rose-950/40 border border-rose-800/60 hover:bg-rose-900/60 rounded-lg transition-colors whitespace-nowrap"
            title="Panic key: instantly redirect to Google Classroom (Hotkey: Press ']' or ESC)"
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Panic</span>
          </button>
        </div>
      </div>
    </header>
  );
};
