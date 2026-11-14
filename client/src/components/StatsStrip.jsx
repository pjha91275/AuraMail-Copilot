import React from 'react';
import {
  Inbox,
  Zap,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function StatsStrip({ stats, activeCategory, onSelectCategory }) {
  if (!stats) return null;

  const kpis = [
    {
      id: null,
      label: 'Total Inflow',
      count: stats.total || 0,
      icon: Inbox,
      color: 'text-surface-700 dark:text-surface-300',
      activeRing: 'ring-surface-400',
      bgBadge: 'bg-surface-100 dark:bg-surface-800'
    },
    {
      id: 'assistant',
      label: 'Assistant to Reply',
      count: stats.assistantToReply || 0,
      icon: Zap,
      color: 'text-brand-600 dark:text-brand-400',
      activeRing: 'ring-brand-500 bg-brand-50/50 dark:bg-brand-950/40',
      bgBadge: 'bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300'
    },
    {
      id: 'client',
      label: 'Client to Reply',
      count: stats.clientToReply || 0,
      icon: UserCheck,
      color: 'text-amber-600 dark:text-amber-400',
      activeRing: 'ring-amber-500 bg-amber-50/50 dark:bg-amber-950/40',
      bgBadge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300'
    },
    {
      id: 'no_reply',
      label: 'No Reply Needed',
      count: stats.noReplyNeeded || 0,
      icon: CheckCircle2,
      color: 'text-emerald-600 dark:text-emerald-400',
      activeRing: 'ring-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40',
      bgBadge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300'
    },
    {
      id: 'action_required',
      label: 'Action Items',
      count: stats.actionRequired || 0,
      icon: AlertTriangle,
      color: 'text-rose-600 dark:text-rose-400',
      activeRing: 'ring-rose-500 bg-rose-50/50 dark:bg-rose-950/40',
      bgBadge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300'
    },
    {
      id: 'waiting',
      label: 'Waiting on Other',
      count: stats.waitingForResponse || 0,
      icon: Clock,
      color: 'text-purple-600 dark:text-purple-400',
      activeRing: 'ring-purple-500 bg-purple-50/50 dark:bg-purple-950/40',
      bgBadge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300'
    },
    {
      id: 'meetings',
      label: 'Meetings Detected',
      count: stats.meetingsCount || 0,
      icon: Calendar,
      color: 'text-sky-600 dark:text-sky-400',
      activeRing: 'ring-sky-500 bg-sky-50/50 dark:bg-sky-950/40',
      bgBadge: 'bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-300'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const isActive = activeCategory === kpi.id;

        return (
          <button
            key={kpi.label}
            onClick={() => onSelectCategory(kpi.id)}
            className={`p-3 rounded-2xl border text-left transition-all duration-200 group relative ${
              isActive
                ? `border-transparent ring-2 ${kpi.activeRing} shadow-sm`
                : 'bg-white dark:bg-surface-900 border-surface-200/80 dark:border-surface-800 hover:border-surface-300 dark:hover:border-surface-700 shadow-subtle'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider truncate">
                {kpi.label}
              </span>
              <Icon className={`w-3.5 h-3.5 ${kpi.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-bold tracking-tight text-surface-900 dark:text-surface-100">
                {kpi.count}
              </span>
              {kpi.id === 'client' && kpi.count > 0 && (
                <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  Priority
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
