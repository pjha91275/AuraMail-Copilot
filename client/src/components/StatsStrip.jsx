import React from 'react';
import {
  Inbox,
  Zap,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Calendar,
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
      activeRing: 'border-brand-500/80 bg-brand-50/80 dark:bg-brand-950/50 shadow-glow-brand ring-1 ring-brand-500/50',
      iconBg: 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300'
    },
    {
      id: 'assistant',
      label: 'Assistant to Reply',
      sublabel: 'Your Queue',
      count: stats.assistantToReply || 0,
      icon: Zap,
      color: 'text-brand-600 dark:text-brand-400',
      activeRing: 'border-brand-500/80 bg-brand-50/80 dark:bg-brand-950/50 shadow-glow-brand ring-1 ring-brand-500/50',
      iconBg: 'bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300'
    },
    {
      id: 'client',
      label: 'Client to Reply',
      sublabel: 'VIP Escalations',
      count: stats.clientToReply || 0,
      icon: UserCheck,
      color: 'text-amber-600 dark:text-amber-400',
      activeRing: 'border-amber-500/80 bg-amber-50/80 dark:bg-amber-950/50 shadow-glow-amber ring-1 ring-amber-500/50',
      iconBg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300'
    },
    {
      id: 'no_reply',
      label: 'No Reply Needed',
      sublabel: 'Informational',
      count: stats.noReplyNeeded || 0,
      icon: CheckCircle2,
      color: 'text-emerald-600 dark:text-emerald-400',
      activeRing: 'border-emerald-500/80 bg-emerald-50/80 dark:bg-emerald-950/50 shadow-glow-emerald ring-1 ring-emerald-500/50',
      iconBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300'
    },
    {
      id: 'action_required',
      label: 'Action Required',
      sublabel: 'Pending Tasks',
      count: stats.actionRequired || 0,
      icon: AlertTriangle,
      color: 'text-rose-600 dark:text-rose-400',
      activeRing: 'border-rose-500/80 bg-rose-50/80 dark:bg-rose-950/50 shadow-glow-red ring-1 ring-rose-500/50',
      iconBg: 'bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300'
    },
    {
      id: 'waiting',
      label: 'Waiting on Other',
      sublabel: 'Awaiting Counterparty',
      count: stats.waitingForResponse || 0,
      icon: Clock,
      color: 'text-purple-600 dark:text-purple-400',
      activeRing: 'border-purple-500/80 bg-purple-50/80 dark:bg-purple-950/50 shadow-[0_0_25px_-3px_rgba(168,85,247,0.5)] ring-1 ring-purple-500/50',
      iconBg: 'bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300'
    },
    {
      id: 'meetings',
      label: 'Meetings & Calls',
      sublabel: 'Calendar Invites',
      count: stats.meetingsCount || 0,
      icon: Calendar,
      color: 'text-sky-600 dark:text-sky-400',
      activeRing: 'border-sky-500/80 bg-sky-50/80 dark:bg-sky-950/50 shadow-glow-cyan ring-1 ring-sky-500/50',
      iconBg: 'bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-300'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3.5 mb-7">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        const isActive = activeCategory === kpi.id;

        return (
          <button
            key={kpi.label}
            onClick={() => onSelectCategory(kpi.id)}
            style={{ animationDelay: `${idx * 50}ms` }}
            className={`p-4 rounded-3xl text-left transition-all duration-300 group relative backdrop-blur-2xl border overflow-hidden animate-fade-in-up ${
              isActive
                ? `${kpi.activeRing}`
                : 'bg-white/70 dark:bg-[#0B101D]/70 border-surface-200/90 dark:border-white/[0.08] hover:bg-white/95 dark:hover:bg-[#121A2F]/85 hover:border-brand-500/40 hover:-translate-y-1 shadow-card hover:shadow-card-hover'
            }`}
          >
            {/* Subtle Specular Glow Sweep on Hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 dark:via-white/[0.06] to-transparent pointer-events-none" />

            <div className="flex items-start justify-between mb-2.5 relative z-10">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm ${kpi.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>

              {kpi.id === 'client' && kpi.count > 0 ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/40 vip-pulse">
                  VIP Action
                </span>
              ) : (
                <ArrowUpRight className="w-3.5 h-3.5 text-surface-400 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              )}
            </div>

            <div className="relative z-10">
              <div className="text-2xl font-black tracking-tight text-surface-900 dark:text-white flex items-center gap-1.5">
                {kpi.count}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-ping inline-block" />
                )}
              </div>
              <div className="text-xs font-bold text-surface-800 dark:text-surface-200 truncate mt-0.5">
                {kpi.label}
              </div>
              <div className="text-[10px] text-surface-500 dark:text-surface-400 truncate font-medium">
                {kpi.sublabel}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
