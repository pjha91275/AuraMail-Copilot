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
    <div className="flex-1 flex flex-col bg-white dark:bg-surface-900/50 rounded-2xl border border-surface-200/80 dark:border-surface-800 shadow-subtle overflow-hidden h-[calc(100vh-8.5rem)]">
      
      {/* Search & Filter Header */}
      <div className="p-3 border-b border-surface-200/80 dark:border-surface-800 space-y-2.5">
        
        {/* Search Input with hotkey hint */}
        <div className="relative">
          <Search className="w-4 h-4 text-surface-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search emails, senders, action items... (Ctrl+K)"
            className="w-full pl-9 pr-8 py-2 rounded-xl text-xs bg-surface-50 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700 text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Filter Chips (Urgent, High, All) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 overflow-x-auto text-[11px]">
            <span className="text-surface-400 font-medium mr-1 flex items-center">
              <Filter className="w-3 h-3 mr-1" /> Urgency:
            </span>
            <button
              onClick={() => onSelectUrgency(null)}
              className={`px-2 py-0.5 rounded-lg font-medium transition-colors ${
                urgencyFilter === null
                  ? 'bg-surface-200 dark:bg-surface-700 text-surface-900 dark:text-surface-100 font-semibold'
                  : 'text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800'
              }`}
            >
              All
            </button>
            <button
              onClick={() => onSelectUrgency('urgent')}
              className={`px-2 py-0.5 rounded-lg font-medium transition-colors ${
                urgencyFilter === 'urgent'
                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200 font-bold'
                  : 'text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800'
              }`}
            >
              🚨 Urgent
            </button>
            <button
              onClick={() => onSelectUrgency('high')}
              className={`px-2 py-0.5 rounded-lg font-medium transition-colors ${
                urgencyFilter === 'high'
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200 font-bold'
                  : 'text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800'
              }`}
            >
              High
            </button>
          </div>

          <span className="text-[11px] font-semibold text-surface-400 shrink-0">
            {emails.length} {emails.length === 1 ? 'thread' : 'threads'}
          </span>
        </div>
      </div>

      {/* Email List Content */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-2">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-48 space-y-3 text-surface-400">
            <RefreshCw className="w-6 h-6 animate-spin text-brand-500" />
            <p className="text-xs font-medium">Syncing inbox and running AI classifications...</p>
          </div>
        ) : emails.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center p-6 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center text-surface-400">
              <Inbox className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-surface-800 dark:text-surface-200">No emails found</p>
              <p className="text-xs text-surface-400 mt-1 max-w-xs">
                {searchQuery
                  ? `No conversations match "${searchQuery}". Try a different keyword.`
                  : 'No conversations in this segment. You can simulate a new incoming email from the top bar!'}
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
