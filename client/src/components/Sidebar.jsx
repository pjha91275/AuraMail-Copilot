import React from 'react';
import {
  Inbox,
  Zap,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Calendar,
  Star,
  Archive,
  Sliders,
  PlusCircle,
  HelpCircle,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export default function Sidebar({
  activeCategory,
  onSelectCategory,
  stats,
  unreadOnly,
  onToggleUnreadOnly,
  onOpenAccountsModal,
  onOpenOnboarding,
  onResetData
}) {
  const navItems = [
    { id: null, label: 'All Inbox', icon: Inbox, count: stats?.total },
    { id: 'assistant', label: 'Assistant to Reply', icon: Zap, count: stats?.assistantToReply, badgeColor: 'bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300' },
    { id: 'client', label: 'Client to Reply', icon: UserCheck, count: stats?.clientToReply, badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300' },
    { id: 'no_reply', label: 'No Reply Needed', icon: CheckCircle2, count: stats?.noReplyNeeded, badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300' },
    { id: 'action_required', label: 'Action Required', icon: AlertTriangle, count: stats?.actionRequired, badgeColor: 'bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300' },
    { id: 'waiting', label: 'Waiting for Response', icon: Clock, count: stats?.waitingForResponse, badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300' },
    { id: 'meetings', label: 'Meetings & Calls', icon: Calendar, count: stats?.meetingsCount, badgeColor: 'bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-300' },
    { id: 'starred', label: 'Starred / VIP', icon: Star, count: stats?.starredCount, badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300' },
    { id: 'archived', label: 'Archived', icon: Archive, count: null }
  ];

  return (
    <aside className="w-64 shrink-0 flex flex-col justify-between p-4 bg-white dark:bg-surface-900/50 rounded-2xl border border-surface-200/80 dark:border-surface-800 shadow-subtle h-[calc(100vh-8.5rem)] sticky top-20">
      
      {/* Top Segment Nav */}
      <div className="space-y-6 overflow-y-auto pr-1">
        
        {/* Filter Toggle: Unread Only */}
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-surface-50 dark:bg-surface-800/60 border border-surface-200/50 dark:border-surface-700/50">
          <span className="text-xs font-semibold text-surface-600 dark:text-surface-300">
            Unread Only
          </span>
          <button
            onClick={onToggleUnreadOnly}
            className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${
              unreadOnly ? 'bg-brand-600' : 'bg-surface-300 dark:bg-surface-700'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                unreadOnly ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Main Segment List */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-bold text-surface-400 dark:text-surface-500 uppercase tracking-wider">
            Email Segments
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeCategory === item.id;

              return (
                <button
                  key={item.label}
                  onClick={() => onSelectCategory(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/20 font-semibold'
                      : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-surface-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.count !== null && item.count !== undefined && item.count > 0 && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.badgeColor || 'bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Actions & Configuration */}
      <div className="pt-4 border-t border-surface-200/80 dark:border-surface-800 space-y-1">
        <button
          onClick={onOpenAccountsModal}
          className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
        >
          <PlusCircle className="w-4 h-4 text-brand-500" />
          <span>Connect Email Account</span>
        </button>

        <button
          onClick={onOpenOnboarding}
          className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-surface-400" />
          <span>Product Tour & Setup</span>
        </button>

        <button
          onClick={onResetData}
          className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
          title="Reset to default seed data"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Demo Threads</span>
        </button>
      </div>

    </aside>
  );
}
