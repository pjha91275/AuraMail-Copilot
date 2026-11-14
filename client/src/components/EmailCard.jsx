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
      className={`group relative p-4 rounded-2xl border transition-all duration-150 cursor-pointer ${
        isSelected
          ? 'bg-brand-50/70 dark:bg-brand-950/40 border-brand-500/80 shadow-md ring-1 ring-brand-500/30'
          : email.unread
          ? 'bg-white dark:bg-surface-900 border-surface-300 dark:border-surface-700/80 shadow-subtle hover:border-surface-400 dark:hover:border-surface-600'
          : 'bg-surface-50/60 dark:bg-surface-900/40 border-surface-200/60 dark:border-surface-800/60 hover:bg-white dark:hover:bg-surface-900'
      }`}
    >
      {/* Classification Accent Left Bar */}
      <div
        className={`absolute left-0 top-3 bottom-3 w-1.5 rounded-r-full ${
          isAssistant
            ? 'bg-brand-500'
            : isClient
            ? 'bg-amber-500'
            : 'bg-emerald-500'
        }`}
      />

      <div className="pl-2">
        {/* Top Row: Sender, Badges, Time */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center space-x-2 truncate">
            {/* Unread indicator dot */}
            {email.unread && (
              <span className="w-2 h-2 rounded-full bg-brand-600 shrink-0 ring-2 ring-brand-200 dark:ring-brand-950" />
            )}
            
            <img
              src={latestMsg.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
              alt={latestMsg.sender}
              className="w-5 h-5 rounded-full object-cover shrink-0 ring-1 ring-surface-300 dark:ring-surface-700"
            />
            
            <span className={`text-xs truncate ${email.unread ? 'font-bold text-surface-900 dark:text-surface-100' : 'font-medium text-surface-700 dark:text-surface-300'}`}>
              {latestMsg.sender}
            </span>
          </div>

          <div className="flex items-center space-x-1.5 shrink-0">
            <span className="text-[10px] text-surface-400 font-medium">
              {dateStr}
            </span>

            {/* Quick action buttons on hover */}
            <div className="hidden group-hover:flex items-center space-x-0.5 bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm px-1 py-0.5 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleStar(email.id, !email.starred);
                }}
                className="p-1 rounded hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                title={email.starred ? 'Unstar' : 'Star'}
              >
                <Star className={`w-3.5 h-3.5 ${email.starred ? 'fill-amber-400 text-amber-500' : 'text-surface-400'}`} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleRead(email.id, !email.unread);
                }}
                className="p-1 rounded hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                title={email.unread ? 'Mark as read' : 'Mark as unread'}
              >
                {email.unread ? <MailOpen className="w-3.5 h-3.5 text-surface-400" /> : <Mail className="w-3.5 h-3.5 text-surface-400" />}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onArchive(email.id);
                }}
                className="p-1 rounded hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                title="Archive conversation"
              >
                <Archive className="w-3.5 h-3.5 text-surface-400 hover:text-rose-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Subject */}
        <div className={`text-xs mb-1 line-clamp-1 ${email.unread ? 'font-bold text-surface-900 dark:text-surface-100' : 'font-semibold text-surface-800 dark:text-surface-200'}`}>
          {email.subject}
        </div>

        {/* Snippet */}
        <p className="text-[11px] text-surface-500 dark:text-surface-400 line-clamp-2 leading-relaxed mb-2.5">
          {email.snippet}
        </p>

        {/* Bottom Badges: AI Classification Pill + Urgency + Meeting */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          
          {/* Classification Badge */}
          {isAssistant && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
              <Zap className="w-3 h-3 text-brand-600 dark:text-brand-400" />
              <span>Assistant to Reply</span>
            </span>
          )}

          {isClient && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
              <UserCheck className="w-3 h-3 text-amber-600 dark:text-amber-400" />
              <span>Client to Reply</span>
            </span>
          )}

          {isNoReply && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span>No Reply Needed</span>
            </span>
          )}

          {/* Urgency Badge */}
          {email.classification?.urgency === 'urgent' && (
            <span className="inline-flex items-center space-x-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
              <AlertTriangle className="w-2.5 h-2.5" />
              <span>Urgent</span>
            </span>
          )}

          {/* Meeting Indicator */}
          {email.meetingDetails?.isDetected && (
            <span className="inline-flex items-center space-x-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-medium bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
              <Calendar className="w-2.5 h-2.5" />
              <span>{email.meetingDetails.date}</span>
            </span>
          )}

          {/* Waiting for response indicator */}
          {email.waitingForResponse && (
            <span className="inline-flex items-center space-x-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-medium bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              <Clock className="w-2.5 h-2.5" />
              <span>Waiting</span>
            </span>
          )}

          {/* Client Handled/Delegated Back Badge */}
          {email.clientFeedback?.delegatedBack && (
            <span className="inline-flex items-center space-x-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200">
              <span>Client Delegated</span>
            </span>
          )}

          {email.starred && (
            <Star className="w-3 h-3 fill-amber-400 text-amber-500 ml-auto shrink-0" />
          )}

        </div>
      </div>
    </div>
  );
}
