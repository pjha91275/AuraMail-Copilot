import React, { useState } from 'react';
import {
  X,
  Mail,
  RefreshCw,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Server
} from 'lucide-react';

export default function AccountsModal({
  isOpen,
  onClose,
  accounts,
  onSyncAccount,
  onAddAccount,
  activeClientId
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [provider, setProvider] = useState('google');
  const [email, setEmail] = useState('');
  const [syncingId, setSyncingId] = useState(null);

  if (!isOpen) return null;

  const handleSync = async (accId) => {
    setSyncingId(accId);
    try {
      await onSyncAccount(accId);
    } finally {
      setTimeout(() => setSyncingId(null), 800);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    await onAddAccount({
      clientId: activeClientId || 'client-1',
      provider,
      emailAddress: email.trim(),
      name: `${email.trim()} (${provider === 'google' ? 'Google Workspace' : 'Microsoft 365'})`
    });

    setEmail('');
    setIsAdding(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-surface-900 rounded-3xl max-w-lg w-full border border-surface-200 dark:border-surface-800 shadow-modal overflow-hidden animate-scale-up">
        
        {/* Header */}
        <div className="p-5 border-b border-surface-100 dark:border-surface-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100">
                Connected Email Accounts
              </h3>
              <p className="text-[11px] text-surface-400">
                Active synchronization channels & OAuth status
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

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          
          <div className="space-y-2.5">
            {accounts.map((acc) => {
              const isCurrentlySyncing = syncingId === acc.id;

              return (
                <div
                  key={acc.id}
                  className="p-3.5 rounded-2xl bg-surface-50 dark:bg-surface-800/60 border border-surface-200/80 dark:border-surface-700/80 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <img
                      src={acc.avatar || 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico'}
                      alt={acc.name}
                      className="w-7 h-7 object-contain shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-surface-900 dark:text-surface-100 truncate">
                          {acc.emailAddress}
                        </span>
                        <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          Connected
                        </span>
                      </div>
                      <div className="text-[10px] text-surface-400 mt-0.5">
                        {acc.totalEmailsSynced} emails synced • Synced {new Date(acc.lastSyncedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSync(acc.id)}
                    disabled={isCurrentlySyncing}
                    className="p-2 rounded-xl bg-white dark:bg-surface-700 border border-surface-200 dark:border-surface-600 hover:border-brand-500 text-surface-600 dark:text-surface-300 transition-all text-xs font-medium flex items-center space-x-1 shrink-0 disabled:opacity-50"
                    title="Run auto-sync"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-brand-500 ${isCurrentlySyncing ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline text-[11px]">Sync Now</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Add Account Inline Form */}
          {isAdding ? (
            <form onSubmit={handleCreate} className="p-4 rounded-2xl bg-brand-50/50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800 space-y-3 animate-slide-up">
              <div className="flex items-center justify-between text-xs font-bold text-brand-950 dark:text-brand-200">
                <span>Connect New Mailbox</span>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="text-surface-400 hover:text-surface-600 text-[11px]"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setProvider('google')}
                  className={`p-2 rounded-xl text-xs font-medium border text-left flex items-center space-x-2 ${
                    provider === 'google' ? 'bg-white dark:bg-surface-800 border-brand-500 text-brand-600' : 'border-surface-200 dark:border-surface-700'
                  }`}
                >
                  <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico" className="w-4 h-4" alt="Gmail" />
                  <span>Google Workspace</span>
                </button>
                <button
                  type="button"
                  onClick={() => setProvider('microsoft')}
                  className={`p-2 rounded-xl text-xs font-medium border text-left flex items-center space-x-2 ${
                    provider === 'microsoft' ? 'bg-white dark:bg-surface-800 border-brand-500 text-brand-600' : 'border-surface-200 dark:border-surface-700'
                  }`}
                >
                  <img src="https://res.cdn.office.net/assets/mail/pwa/v1/pngs/outlook_96.png" className="w-4 h-4" alt="Outlook" />
                  <span>Microsoft 365</span>
                </button>
              </div>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter client's email address..."
                className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />

              <div className="flex justify-end space-x-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-3 py-1 rounded-lg text-xs text-surface-500 hover:text-surface-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm"
                >
                  Connect & Sync
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="w-full py-2.5 rounded-2xl border-2 border-dashed border-surface-300 dark:border-surface-700 hover:border-brand-500 text-surface-600 dark:text-surface-300 text-xs font-semibold flex items-center justify-center space-x-2 transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-brand-500" />
              <span>Connect Another Email Account</span>
            </button>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-surface-100 dark:border-surface-800 bg-surface-50 dark:bg-surface-900/50 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1.5 text-surface-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Encrypted OAuth2 synchronization active</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-surface-200 hover:bg-surface-300 dark:bg-surface-800 dark:hover:bg-surface-700 text-surface-800 dark:text-surface-200 font-semibold transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
