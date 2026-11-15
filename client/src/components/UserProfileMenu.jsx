import React from 'react';
import {
  User,
  ShieldCheck,
  Sliders,
  Keyboard,
  HelpCircle,
  Mail,
  Zap,
  CheckCircle,
  ExternalLink,
  LogOut
} from 'lucide-react';

export default function UserProfileMenu({
  isOpen,
  onClose,
  currentUser,
  onOpenShortcuts,
  onOpenAccounts,
  onOpenOnboarding,
  onLogout
}) {
  if (!isOpen) return null;

  const displayName = currentUser?.name || localStorage.getItem('auramail_user_name') || 'Prince Jha';
  const displayEmail = currentUser?.email || localStorage.getItem('auramail_user_email') || 'pjha91275@gmail.com';
  const isPrince = displayEmail.toLowerCase().includes('pjha') || displayName.toLowerCase().includes('prince');
  const userRole = currentUser?.role || localStorage.getItem('auramail_user_role') || (isPrince ? 'client' : 'assistant');
  const avatarUrl = currentUser?.avatar || (isPrince ? '/prince-jha.jpg' : (displayEmail.includes('alex') ? '/alex-vance.jpg' : '/prince-jha.jpg'));

  return (
    <div
      className="absolute right-0 top-12 mt-2 w-72 bg-white dark:bg-surface-800 rounded-3xl shadow-modal border border-surface-200 dark:border-surface-700 py-2.5 z-50 animate-slide-up"
      onMouseLeave={onClose}
    >
      {/* Profile Card Header */}
      <div className="p-3.5 border-b border-surface-100 dark:border-surface-700 flex items-center space-x-3">
        <div className="relative">
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-11 h-11 rounded-2xl object-cover ring-2 ring-brand-500/30"
          />
          <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-surface-800 rounded-full" />
        </div>

        <div className="min-w-0">
          <div className="text-xs font-bold text-surface-900 dark:text-surface-100 truncate">
            {displayName}
          </div>
          <div className="text-[11px] text-surface-500 dark:text-surface-400 truncate">
            {displayEmail}
          </div>
          <div className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-brand-50 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 mt-1">
            <Zap className="w-2.5 h-2.5" />
            <span>{userRole === 'client' ? 'Google Workspace Executive' : 'Executive Assistant Lead'}</span>
          </div>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 gap-2 p-3 bg-surface-50 dark:bg-surface-800/50 mx-3 my-2 rounded-2xl border border-surface-100 dark:border-surface-700/60 text-center">
        <div>
          <div className="text-xs font-bold text-surface-900 dark:text-surface-100">
            {userRole === 'client' ? 'Active' : '3'}
          </div>
          <div className="text-[10px] text-surface-400">
            {userRole === 'client' ? 'Workspace Status' : 'Clients Managed'}
          </div>
        </div>
        <div>
          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">96.8%</div>
          <div className="text-[10px] text-surface-400">AI Accuracy</div>
        </div>
      </div>

      {/* Menu Links */}
      <div className="px-2 space-y-0.5 text-xs font-medium text-surface-700 dark:text-surface-300">
        <button
          onClick={() => {
            onOpenAccounts();
            onClose();
          }}
          className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors text-left"
        >
          <Mail className="w-4 h-4 text-brand-500" />
          <span>Connected Email Accounts</span>
        </button>

        <button
          onClick={() => {
            onOpenShortcuts();
            onClose();
          }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors text-left"
        >
          <div className="flex items-center space-x-2.5">
            <Keyboard className="w-4 h-4 text-purple-500" />
            <span>Keyboard Shortcuts</span>
          </div>
          <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-surface-200 dark:bg-surface-700 font-mono text-surface-500">
            ?
          </kbd>
        </button>

        <button
          onClick={() => {
            onOpenOnboarding();
            onClose();
          }}
          className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors text-left"
        >
          <HelpCircle className="w-4 h-4 text-surface-400" />
          <span>Product Tour & AI Setup</span>
        </button>

        {onLogout && (
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left font-bold"
          >
            <LogOut className="w-4 h-4 text-rose-500" />
            <span>Sign Out Workspace</span>
          </button>
        )}
      </div>

      <div className="pt-2 px-3 mt-1 border-t border-surface-100 dark:border-surface-700 flex items-center justify-between text-[11px] text-surface-400">
        <span>AuraMail Copilot v1.0.0</span>
        <span className="flex items-center space-x-1 text-emerald-500 font-medium">
          <ShieldCheck className="w-3 h-3" />
          <span>Verified MERN</span>
        </span>
      </div>
    </div>
  );
}
