import React from 'react';
import { Play, Star, Gamepad2 } from 'lucide-react';

export const GameCard = ({
  game,
  isFavorite,
  onPlay,
  onToggleFavorite,
}) => {
  return (
    <div
      onClick={() => onPlay(game)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-cyan-950/20 cursor-pointer"
    >
      <div>
        {/* Game Icon / Header Banner */}
        <div
          className="relative mb-3 flex h-36 w-full items-center justify-center rounded-lg border border-slate-800 bg-slate-950/80 transition-transform group-hover:scale-[1.01]"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, ${game.themeColor || '#0ea5e9'}18 0%, transparent 80%)`,
          }}
        >
          {/* Favorite button */}
          <button
            onClick={(e) => onToggleFavorite(game.id, e)}
            className="absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-md bg-slate-900/80 text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star
              className={`h-4 w-4 ${
                isFavorite ? 'fill-amber-400 text-amber-400' : ''
              }`}
            />
          </button>

          {/* Center Graphic */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-lg border shadow-inner"
              style={{
                borderColor: `${game.themeColor || '#0ea5e9'}40`,
                backgroundColor: `${game.themeColor || '#0ea5e9'}15`,
                color: game.themeColor || '#38bdf8',
              }}
            >
              <Gamepad2 className="h-6 w-6" />
            </div>
            <span className="text-xs font-medium text-slate-400 tracking-wide uppercase">
              {game.category}
            </span>
          </div>

          {/* Hover Play Button */}
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 backdrop-blur-[1px] transition-opacity duration-150 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/30">
              <Play className="h-3.5 w-3.5 fill-current" />
              Play Now
            </span>
          </div>
        </div>

        {/* Title directly leads - No badge sandwich */}
        <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
          {game.title}
        </h3>

        {/* Zero-Pill Unboxed Metadata with Typographic Separators */}
        <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
          <span>{game.category}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="tabular-nums">{Number(game.rating).toFixed(1)} ★</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="tabular-nums">{(game.plays / 1000).toFixed(1)}k plays</span>
          {game.isCustom && (
            <>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-amber-400">User Added</span>
            </>
          )}
        </div>

        {/* Description */}
        <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {game.description}
        </p>
      </div>

      {/* Footer info */}
      <div className="mt-3.5 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
        <span className="truncate max-w-[190px]">
          {game.controls && game.controls[0] ? game.controls[0] : 'Click to launch'}
        </span>
        <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform font-medium">
          Launch →
        </span>
      </div>
    </div>
  );
};
