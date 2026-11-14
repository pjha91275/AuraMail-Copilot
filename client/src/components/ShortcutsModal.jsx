import React from 'react';
import { X, Keyboard, Command } from 'lucide-react';

export default function ShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'j / ↓', desc: 'Select next conversation thread' },
    { key: 'k / ↑', desc: 'Select previous conversation thread' },
    { key: 's', desc: 'Star / mark conversation as VIP' },
    { key: 'e', desc: 'Archive selected conversation' },
    { key: 'c', desc: 'Open / toggle Inbox AI Copilot chat' },
    { key: '1', desc: 'Switch to Assistant Command Center' },
    { key: '2', desc: 'Switch to Client VIP Portal' },
    { key: 'Esc', desc: 'Close modals, drawers, or exit detail view' },
    { key: '?', desc: 'Open this keyboard shortcuts cheat sheet' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-surface-900 rounded-3xl max-w-md w-full border border-surface-200 dark:border-surface-800 shadow-modal overflow-hidden animate-scale-up">
        
        {/* Header */}
        <div className="p-5 border-b border-surface-100 dark:border-surface-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100">
                Keyboard Shortcuts
              </h3>
              <p className="text-[11px] text-surface-400">
                Speed up daily inbox triage like a Superhuman pro
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-surface-400 hover:text-surface-600 dark:hover:text-surface-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="p-5 space-y-2 max-h-[60vh] overflow-y-auto">
          {shortcuts.map((s, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-xl bg-surface-50 dark:bg-surface-800/60 border border-surface-200/50 dark:border-surface-700/50 text-xs"
            >
              <span className="text-surface-700 dark:text-surface-300 font-medium">
                {s.desc}
              </span>
              <kbd className="px-2.5 py-1 rounded-lg bg-white dark:bg-surface-700 border border-surface-300 dark:border-surface-600 font-mono text-[11px] font-bold text-surface-900 dark:text-surface-100 shadow-subtle">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-surface-100 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-900 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-surface-200 hover:bg-surface-300 dark:bg-surface-800 dark:hover:bg-surface-700 text-xs font-semibold text-surface-800 dark:text-surface-200 transition-colors"
          >
            Got it, thanks!
          </button>
        </div>

      </div>
    </div>
  );
}
