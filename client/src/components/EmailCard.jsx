import React from 'react';
import {
  Star,
  Clock,
  Calendar,
  Zap,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Archive,
  Mail,
  MailOpen
} from 'lucide-react';

export default function EmailCard({
  email,
  isSelected,
  onSelect,
  onToggleStar,
  onToggleRead,
  onArchive
}) {
  const isAssistant = email.classification?.type === 'Assistant to Reply';
  const isClient = email.classification?.type === 'Client to Reply';
  const isNoReply = email.classification?.type === 'No Reply Needed';

  // Format relative timestamp
  const dateStr = new Date(email.updatedAt || email.createdAt).toLocaleDateString([], {
    month: 'short',
    day: 'numeric'
  });

  const latestMsg = email.messages && email.messages.length > 0
    ? email.messages[email.messages.length - 1]
    : { sender: 'Unknown', avatar: '' };

  return (
    <div
      onClick={() => onSelect(email)}
      className={`group relative p-5 rounded-3xl transition-all duration-200 cursor-pointer backdrop-blur-xl border ${
        isSelected
          ? 'bg-brand-50/80 dark:bg-brand-950/40 border-brand-500 shadow-glow-brand ring-1 ring-brand-500/40 -translate-y-0.5'
          : email.unread
          ? 'bg-white/80 dark:bg-surface-900/60 border-surface-200/90 dark:border-white/[0.08] shadow-card hover:bg-white dark:hover:bg-surface-850 hover:border-surface-300 dark:hover:border-white/[0.18] hover:-translate-y-0.5 hover:shadow-card-hover'
          : 'bg-surface-50/50 dark:bg-surface-900/30 border-surface-200/50 dark:border-white/[0.04] hover:bg-white/60 dark:hover:bg-surface-900/50 hover:border-surface-300 dark:hover:border-white/[0.1]'
      }`}
    >
      {/* Classification Accent Left Bar with subtle glow */}
      <div
        className={`absolute left-0 top-3.5 bottom-3.5 w-1.5 rounded-r-full transition-all duration-200 ${
          isAssistant
            ? 'bg-brand-500 shadow-[0_0_12px_rgba(74,117,246,0.6)]'
            : isClient
            ? 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]'
            : 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
        }`}
      />

      <div className="pl-3">
        {/* Top Row: Sender, Badges, Time */}
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center space-x-2.5 min-w-0 truncate">
            {/* Unread indicator dot */}
            {email.unread && (
              <span className="w-2.5 h-2.5 rounded-full bg-brand-500 shrink-0 ring-4 ring-brand-500/20 animate-pulse" />
            )}
            
            <img
              src={latestMsg.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
              alt={latestMsg.sender}
              className="w-6 h-6 rounded-full object-cover shrink-0 ring-1 ring-surface-300 dark:ring-white/20 shadow-sm"
            />
            
            <span className={`text-xs truncate ${email.unread ? 'font-black text-surface-900 dark:text-white' : 'font-semibold text-surface-700 dark:text-surface-300'}`}>
              {latestMsg.sender}
            </span>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-[11px] text-surface-400 font-semibold tracking-wide">
              {dateStr}
            </span>

            {/* Quick action buttons on hover */}
            <div className="hidden group-hover:flex items-center space-x-1 bg-white dark:bg-surface-800 px-1.5 py-0.5 rounded-xl shadow-md border border-surface-200 dark:border-white/10 animate-fade-in">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleStar(email.id, !email.starred);
                }}
                className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                title={email.starred ? 'Unstar' : 'Star'}
              >
                <Star className={`w-3.5 h-3.5 ${email.starred ? 'fill-amber-400 text-amber-500' : 'text-surface-400'}`} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleRead(email.id, !email.unread);
                }}
                className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                title={email.unread ? 'Mark as read' : 'Mark as unread'}
              >
                {email.unread ? <MailOpen className="w-3.5 h-3.5 text-surface-400" /> : <Mail className="w-3.5 h-3.5 text-surface-400" />}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onArchive(email.id);
                }}
                className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                title="Archive conversation"
              >
                <Archive className="w-3.5 h-3.5 text-surface-400 hover:text-rose-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Subject */}
        <div className={`text-sm mb-1.5 leading-snug line-clamp-1 ${email.unread ? 'font-bold text-surface-900 dark:text-white' : 'font-medium text-surface-800 dark:text-surface-200'}`}>
          {email.subject}
        </div>

        {/* Snippet */}
        <p className="text-xs text-surface-500 dark:text-surface-400 line-clamp-2 leading-relaxed mb-3">
          {email.snippet}
        </p>

        {/* Bottom Badges: AI Classification Pill + Urgency + Meeting */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          
          {/* Classification Badge */}
          {isAssistant && (
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-brand-500/15 text-brand-700 dark:text-brand-300 border border-brand-500/30">
              <Zap className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span>Assistant to Reply</span>
            </span>
          )}

          {isClient && (
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
              <UserCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Client to Reply</span>
            </span>
          )}

          {isNoReply && (
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>No Reply Needed</span>
            </span>
          )}

          {/* Urgency Badge */}
          {email.classification?.urgency === 'urgent' && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
              <AlertTriangle className="w-3 h-3" />
              <span>Urgent</span>
            </span>
          )}

          {/* Meeting Indicator */}
          {email.meetingDetails?.isDetected && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30">
              <Calendar className="w-3 h-3" />
              <span>{email.meetingDetails.date}</span>
            </span>
          )}

          {/* Waiting for response indicator */}
          {email.waitingForResponse && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30">
              <Clock className="w-3 h-3" />
              <span>Waiting</span>
            </span>
          )}

          {/* Client Handled/Delegated Back Badge */}
          {email.clientFeedback?.delegatedBack && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
              <span>Client Delegated</span>
            </span>
          )}

          {email.starred && (
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 ml-auto shrink-0" />
          )}

        </div>
      </div>
    </div>
  );
}
