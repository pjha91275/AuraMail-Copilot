import React from 'react';
import { Search, Filter, Sparkles, Inbox, RefreshCw, X } from 'lucide-react';
import EmailCard from './EmailCard';

export default function EmailList({
  emails,
  selectedEmail,
  onSelectEmail,
  searchQuery,
  onSearchChange,
  activeCategory,
  onToggleStar,
  onToggleRead,
  onArchive,
  urgencyFilter,
  onSelectUrgency,
  isLoading
}) {
  return (
    <div className="flex-1 flex flex-col glass-panel rounded-3xl overflow-hidden h-[calc(100vh-10rem)] shadow-card">
      
      {/* Search & Filter Header */}
      <div className="p-4 sm:p-5 border-b border-surface-200/80 dark:border-white/[0.06] space-y-3.5 bg-white/40 dark:bg-surface-900/40 backdrop-blur-md">
        
        {/* Search Input with hotkey hint */}
        <div className="relative">
          <Search className="w-4 h-4 text-surface-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search conversations, senders, action items... (Ctrl+K)"
            className="w-full pl-10 pr-9 py-2.5 rounded-2xl text-xs bg-white/80 dark:bg-surface-800/80 border border-surface-200 dark:border-white/[0.08] text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 shadow-subtle transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Filter Chips (Urgent, High, All) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 overflow-x-auto text-xs">
            <span className="text-surface-400 font-semibold mr-1 flex items-center text-[11px] uppercase tracking-wider">
              <Filter className="w-3 h-3 mr-1" /> Urgency:
            </span>
            <button
              onClick={() => onSelectUrgency(null)}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                urgencyFilter === null
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
              }`}
            >
              All
            </button>
            <button
              onClick={() => onSelectUrgency('urgent')}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                urgencyFilter === 'urgent'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
              }`}
            >
              🚨 Urgent
            </button>
            <button
              onClick={() => onSelectUrgency('high')}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                urgencyFilter === 'high'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
              }`}
            >
              High
            </button>
          </div>

          <span className="text-xs font-bold text-surface-400 shrink-0">
            {emails.length} {emails.length === 1 ? 'thread' : 'threads'}
          </span>
        </div>
      </div>

      {/* Email List Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-48 space-y-3 text-surface-400">
            <RefreshCw className="w-6 h-6 animate-spin text-brand-500" />
            <p className="text-xs font-medium">Syncing inbox and running AI classifications...</p>
          </div>
        ) : emails.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center p-8 space-y-3">
            <div className="w-14 h-14 rounded-3xl bg-surface-100 dark:bg-surface-800/80 flex items-center justify-center text-surface-400">
              <Inbox className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-surface-800 dark:text-surface-200">No emails found</p>
              <p className="text-xs text-surface-400 mt-1 max-w-xs leading-relaxed">
                {searchQuery
                  ? `No conversations match "${searchQuery}". Try another keyword.`
                  : 'No conversations in this segment. You can simulate an incoming email from the top bar!'}
              </p>
            </div>
          </div>
        ) : (
          emails.map((email) => (
            <EmailCard
              key={email.id}
              email={email}
              isSelected={selectedEmail?.id === email.id}
              onSelect={onSelectEmail}
              onToggleStar={onToggleStar}
              onToggleRead={onToggleRead}
              onArchive={onArchive}
            />
          ))
        )}
      </div>

    </div>
  );
}
