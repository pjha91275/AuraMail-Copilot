import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Zap,
  UserCheck,
  Calendar,
  AlertTriangle,
  X,
  Check,
  Clock
} from 'lucide-react';

export default function NotificationCenter({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onSelectNotification
}) {
  const [filter, setFilter] = useState('all'); // 'all' | 'client' | 'triage'

  if (!isOpen) return null;

  const filtered = notifications.filter(n => {
    if (filter === 'client') return n.type === 'client';
    if (filter === 'triage') return n.type === 'triage';
    return true;
  });

  return (
    <div
      className="absolute right-0 top-12 mt-2 w-80 sm:w-96 bg-white dark:bg-surface-800 rounded-3xl shadow-modal border border-surface-200 dark:border-surface-700 py-3 z-50 animate-slide-up"
      onMouseLeave={onClose}
    >
      {/* Header */}
      <div className="px-4 pb-2.5 border-b border-surface-100 dark:border-surface-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="w-4 h-4 text-brand-500" />
          <span className="text-xs font-bold text-surface-900 dark:text-surface-100">
            Inbox Activity & Notifications
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onMarkAllRead}
            className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            Mark all read
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-surface-400 hover:text-surface-600 dark:hover:text-surface-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-1 px-4 py-2 bg-surface-50 dark:bg-surface-800/80 text-[11px]">
        {['all', 'client', 'triage'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-2.5 py-1 rounded-lg font-medium capitalize transition-colors ${
              filter === tab
                ? 'bg-white dark:bg-surface-700 text-brand-600 dark:text-brand-400 shadow-subtle font-bold'
                : 'text-surface-500 hover:text-surface-900 dark:hover:text-surface-200'
            }`}
          >
            {tab === 'all' ? 'All Alerts' : tab === 'client' ? 'Client Actions' : 'AI Triage'}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto p-2 space-y-1.5 divide-y divide-surface-100 dark:divide-surface-700/50">
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-xs text-surface-400">
            No notifications in this category.
          </div>
        ) : (
          filtered.map(item => (
            <div
              key={item.id}
              onClick={() => {
                if (item.emailId) onSelectNotification(item.emailId);
                onClose();
              }}
              className={`p-2.5 rounded-2xl flex items-start space-x-3 transition-colors cursor-pointer pt-2 ${
                item.unread
                  ? 'bg-brand-50/50 dark:bg-brand-950/30 hover:bg-brand-50 dark:hover:bg-brand-950/50'
                  : 'hover:bg-surface-100 dark:hover:bg-surface-700/60'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {item.type === 'client' ? (
                  <div className="w-7 h-7 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <UserCheck className="w-3.5 h-3.5" />
                  </div>
                ) : item.type === 'calendar' ? (
                  <div className="w-7 h-7 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-xl bg-brand-100 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-surface-900 dark:text-surface-100 truncate">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-surface-400 shrink-0 ml-1">
                    {item.time}
                  </span>
                </div>
                <p className="text-[11px] text-surface-500 dark:text-surface-400 line-clamp-2 mt-0.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.unread && (
                <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0 mt-1.5" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
