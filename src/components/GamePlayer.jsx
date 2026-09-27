import React, { useRef, useState, useEffect } from 'react';
import {
  Maximize2,
  Minimize2,
  RotateCcw,
  ExternalLink,
  Star,
  X,
  Code2,
  Copy,
  Check,
  Keyboard,
  Info
} from 'lucide-react';
import { openInAboutBlank } from '../utils/gamesManager.js';

export const GamePlayer = ({
  game,
  isFavorite,
  onToggleFavorite,
  onClose,
}) => {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showJsonCode, setShowJsonCode] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.warn('Fullscreen failed', err);
      });
    } else {
      document.exitFullscreen().catch(err => {
        console.warn('Exit fullscreen failed', err);
      });
    }
  };

  const reloadGame = () => {
    setIframeKey(prev => prev + 1);
  };

  const copyIframeCode = () => {
    navigator.clipboard.writeText(game.iframe);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-md overflow-y-auto">
      {/* Player Header */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Games</span>
          </button>
          <span className="text-slate-600">|</span>
          <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-[200px] sm:max-w-md">
            {game.title}
          </h2>
          <span className="hidden md:inline-block text-xs text-slate-400">
            ({game.category})
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => onToggleFavorite(game.id, e)}
            className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
              isFavorite
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title={isFavorite ? 'Favorited' : 'Favorite'}
          >
            <Star className={`h-4 w-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
          </button>

          <button
            onClick={reloadGame}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            title="Reload game session"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            onClick={() => openInAboutBlank(game)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            title="Open game in cloaked about:blank window"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>about:blank</span>
          </button>

          <button
            onClick={() => setShowJsonCode(!showJsonCode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              showJsonCode
                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title="Inspect stored Iframe in JSON"
          >
            <Code2 className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Iframe JSON</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 transition-colors"
            title="Fullscreen mode"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Fullscreen</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="flex-1 flex flex-col items-center justify-start p-3 sm:p-6 max-w-6xl mx-auto w-full">
        {/* Iframe Container with Fullscreen Ref */}
        <div
          ref={containerRef}
          className={`relative w-full rounded-xl border border-slate-800 bg-black overflow-hidden shadow-2xl transition-all ${
            isFullscreen
              ? 'h-screen w-screen max-w-none rounded-none border-none'
              : 'aspect-[16/10] max-h-[75vh] min-h-[420px]'
          }`}
        >
          <iframe
            key={iframeKey}
            ref={iframeRef}
            src={game.iframeUrl}
            title={game.title}
            className="w-full h-full border-0 block"
            allow="autoplay; fullscreen; keyboard; gamepad"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />

          {isFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 z-50 rounded-lg bg-slate-900/80 p-2 text-white/80 backdrop-blur hover:text-white hover:bg-slate-900"
              title="Exit Fullscreen"
            >
              <Minimize2 className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* JSON Code Inspector Drawer */}
        {showJsonCode && (
          <div className="mt-4 w-full rounded-xl border border-slate-800 bg-slate-900 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Code2 className="h-4 w-4 text-cyan-400" />
                <span>Stored Iframe in games.json</span>
              </div>
              <button
                onClick={copyIframeCode}
                className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Iframe Code</span>
                  </>
                )}
              </button>
            </div>
            <pre className="overflow-x-auto rounded bg-slate-950 p-3 text-xs font-mono text-cyan-300 border border-slate-800">
              {game.iframe}
            </pre>
            <p className="mt-2 text-[11px] text-slate-500">
              Each game is indexed in <code className="text-slate-400">/games.json</code> with its self-contained Iframe markup.
            </p>
          </div>
        )}

        {/* Game Details & Controls Bar */}
        <div className="mt-6 grid w-full grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Overview */}
          <div className="md:col-span-2 rounded-xl border border-slate-800/80 bg-slate-900/40 p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
              <Info className="h-4 w-4 text-cyan-400" />
              About {game.title}
            </h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              {game.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {game.tags && game.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs text-slate-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
              <Keyboard className="h-4 w-4 text-emerald-400" />
              Controls & Input
            </h3>
            <ul className="mt-3 space-y-2 text-xs text-slate-300">
              {game.controls && game.controls.map((ctrl, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 select-none">›</span>
                  <span>{ctrl}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
