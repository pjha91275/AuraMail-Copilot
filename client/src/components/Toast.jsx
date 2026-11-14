import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between min-w-[320px] max-w-md p-4 rounded-xl shadow-modal border backdrop-blur-md transition-all duration-300 animate-slide-up ${
              isSuccess
                ? 'bg-emerald-950/90 text-emerald-100 border-emerald-800/60'
                : isError
                ? 'bg-rose-950/90 text-rose-100 border-rose-800/60'
                : isWarning
                ? 'bg-amber-950/90 text-amber-100 border-amber-800/60'
                : 'bg-surface-900/90 text-surface-100 border-surface-700/60'
            }`}
          >
            <div className="flex items-start space-x-3">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
              {isWarning && <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
              {!isSuccess && !isError && !isWarning && <Info className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />}
              
              <div className="text-sm">
                {toast.title && <div className="font-semibold">{toast.title}</div>}
                <div className="text-xs opacity-90 mt-0.5">{toast.message}</div>
              </div>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="ml-3 p-1 rounded-lg opacity-70 hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
