import React from 'react';
import {
  Inbox,
  Zap,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Calendar,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export default function StatsStrip({ stats, activeCategory, onSelectCategory }) {
  if (!stats) return null;

  const kpis = [
    {
      id: null,
      label: 'Total Inflow',
      sublabel: 'Active Threads',
      count: stats.total || 0,
      icon: Inbox,
      color: 'text-surface-700 dark:text-surface-200',
      activeRing: 'ring-2 ring-brand-500 bg-brand-50/70 dark:bg-brand-950/40 shadow-glow-brand',
      iconBg: 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300'
    },
    {
      id: 'assistant',
      label: 'Assistant to Reply',
      sublabel: 'Your Queue',
      count: stats.assistantToReply || 0,
      icon: Zap,
      color: 'text-brand-600 dark:text-brand-400',
      activeRing: 'ring-2 ring-brand-500 bg-brand-50/70 dark:bg-brand-950/40 shadow-glow-brand',
      iconBg: 'bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300'
    },
    {
      id: 'client',
      label: 'Client to Reply',
      sublabel: 'VIP Escalations',
      count: stats.clientToReply || 0,
      icon: UserCheck,
      color: 'text-amber-600 dark:text-amber-400',
      activeRing: 'ring-2 ring-amber-500 bg-amber-50/70 dark:bg-amber-950/40 shadow-glow-amber',
      iconBg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300'
    },
    {
      id: 'no_reply',
      label: 'No Reply Needed',
      sublabel: 'Informational',
      count: stats.noReplyNeeded || 0,
      icon: CheckCircle2,
      color: 'text-emerald-600 dark:text-emerald-400',
      activeRing: 'ring-2 ring-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-glow-emerald',
      iconBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300'
    },
    {
      id: 'action_required',
      label: 'Action Required',
      sublabel: 'Pending Tasks',
      count: stats.actionRequired || 0,
      icon: AlertTriangle,
      color: 'text-rose-600 dark:text-rose-400',
      activeRing: 'ring-2 ring-rose-500 bg-rose-50/70 dark:bg-rose-950/40',
      iconBg: 'bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300'
    },
    {
      id: 'waiting',
      label: 'Waiting on Other',
      sublabel: 'Awaiting Counterparty',
      count: stats.waitingForResponse || 0,
      icon: Clock,
      color: 'text-purple-600 dark:text-purple-400',
      activeRing: 'ring-2 ring-purple-500 bg-purple-50/70 dark:bg-purple-950/40',
      iconBg: 'bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300'
    },
    {
      id: 'meetings',
      label: 'Meetings & Calls',
      sublabel: 'Calendar Invites',
      count: stats.meetingsCount || 0,
      icon: Calendar,
      color: 'text-sky-600 dark:text-sky-400',
      activeRing: 'ring-2 ring-sky-500 bg-sky-50/70 dark:bg-sky-950/40',
      iconBg: 'bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-300'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3.5 mb-7">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const isActive = activeCategory === kpi.id;

        return (
          <button
            key={kpi.label}
            onClick={() => onSelectCategory(kpi.id)}
            className={`p-4 rounded-3xl text-left transition-all duration-200 group relative backdrop-blur-xl border ${
              isActive
                ? `border-transparent ${kpi.activeRing}`
                : 'bg-white/60 dark:bg-surface-900/50 border-surface-200/80 dark:border-white/[0.07] hover:bg-white/90 dark:hover:bg-surface-850/70 hover:border-surface-300 dark:hover:border-white/[0.15] hover:-translate-y-0.5 shadow-card hover:shadow-card-hover'
            }`}
          >
            <div className="flex items-start justify-between mb-2.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${kpi.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>

              {kpi.id === 'client' && kpi.count > 0 ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 animate-pulse">
                  VIP Action
                </span>
              ) : (
                <ArrowUpRight className="w-3.5 h-3.5 text-surface-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </div>

            <div>
              <div className="text-2xl font-black tracking-tight text-surface-900 dark:text-white">
                {kpi.count}
              </div>
              <div className="text-xs font-bold text-surface-800 dark:text-surface-200 truncate mt-0.5">
                {kpi.label}
              </div>
              <div className="text-[10px] text-surface-400 truncate font-medium">
                {kpi.sublabel}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
