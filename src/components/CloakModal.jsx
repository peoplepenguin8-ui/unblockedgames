import React from 'react';
import { X, EyeOff, ShieldCheck, AlertTriangle } from 'lucide-react';

export const CloakModal = ({
  isOpen,
  onClose,
  currentCloak,
  onSelectCloak,
}) => {
  if (!isOpen) return null;

  const presets = [
    {
      id: 'default',
      label: 'Standard Uncloaked',
      desc: 'Normal PlayVault tab title and gamepad icon',
    },
    {
      id: 'docs',
      label: 'Google Docs',
      desc: 'Changes tab to "Document - Google Docs" with official Docs icon',
    },
    {
      id: 'drive',
      label: 'Google Drive',
      desc: 'Changes tab to "My Drive - Google Drive" with Drive icon',
    },
    {
      id: 'classroom',
      label: 'Google Classroom',
      desc: 'Changes tab to "Classes - Google Classroom" with Classroom icon',
    },
    {
      id: 'canvas',
      label: 'Canvas LMS',
      desc: 'Changes tab to "Dashboard - Canvas LMS" with Canvas icon',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <EyeOff className="h-5 w-5 text-emerald-400" />
            <h2 className="text-sm font-bold text-white">Stealth Tab Cloak</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-3 text-xs text-slate-300">
          Disguise the browser tab title and favicon to look like educational tools when teachers or supervisors pass by.
        </p>

        <div className="mt-4 space-y-2">
          {presets.map(preset => {
            const isSelected = currentCloak === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  onSelectCloak(preset.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-colors ${
                  isSelected
                    ? 'border-emerald-500/60 bg-emerald-950/30 text-white'
                    : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold flex items-center gap-2">
                    <span>{preset.label}</span>
                    {isSelected && (
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {preset.desc}
                  </div>
                </div>
                {isSelected && (
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-4 rounded-lg border border-amber-900/40 bg-amber-950/20 p-3 text-xs text-amber-300/90 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-300">Panic Hotkey:</span> Pressing the{' '}
            <kbd className="rounded bg-slate-800 px-1 py-0.5 font-mono text-[11px] text-white">]</kbd> key or clicking the Panic button immediately closes or navigates your browser away to Google Classroom.
          </div>
        </div>
      </div>
    </div>
  );
};
