import React, { useState } from 'react';
import { X, Plus, AlertCircle } from 'lucide-react';

export const AddGameModal = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Arcade');
  const [description, setDescription] = useState('');
  const [iframeCodeOrUrl, setIframeCodeOrUrl] = useState('');
  const [controlsText, setControlsText] = useState('Arrow Keys or WASD to play');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a game title.');
      return;
    }
    if (!iframeCodeOrUrl.trim()) {
      setError('Please paste an Iframe embed snippet or a game URL.');
      return;
    }

    const controls = controlsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    onAdd({
      title: title.trim(),
      category,
      description: description.trim() || 'Custom added unblocked game',
      iframeCodeOrUrl: iframeCodeOrUrl.trim(),
      controls: controls.length > 0 ? controls : ['Standard keyboard/mouse controls'],
    });

    setTitle('');
    setDescription('');
    setIframeCodeOrUrl('');
    setControlsText('Arrow Keys or WASD to play');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white">Add Game to Vault</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {error && (
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-rose-950/40 border border-rose-800/60 p-2.5 text-xs text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Game Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Cookie Clicker, Slope, Pacman"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="Arcade">Arcade</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Action">Action</option>
                <option value="Sports">Sports</option>
                <option value="Classic">Classic</option>
                <option value="Racing">Racing</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Controls Hint
              </label>
              <input
                type="text"
                placeholder="e.g. Arrow keys to steer"
                value={controlsText}
                onChange={e => setControlsText(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Iframe Embed Tag or Game URL *
            </label>
            <textarea
              rows={3}
              placeholder='<iframe src="https://..." allowfullscreen></iframe> or https://...'
              value={iframeCodeOrUrl}
              onChange={e => setIframeCodeOrUrl(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-mono text-cyan-300 placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
              required
            />
            <p className="mt-1 text-[11px] text-slate-500">
              Paste the raw &lt;iframe&gt; code or URL. It will be stored in JSON and loaded into the secure frame.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Description (Optional)
            </label>
            <input
              type="text"
              placeholder="Brief summary of gameplay"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="mt-5 flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-md transition-colors"
            >
              Save to Games JSON
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
