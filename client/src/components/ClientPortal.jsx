import React, { useState } from 'react';
import {
  UserCheck,
  CheckCircle2,
  ArrowRight,
  CornerDownLeft,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Clock,
  ShieldAlert,
  Send,
  Zap,
  Check,
  MessageSquare,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ClientPortal({
  client,
  emails,
  onClientAction,
  onSwitchToAssistantView
}) {
  const [delegatingEmailId, setDelegatingEmailId] = useState(null);
  const [delegateNote, setDelegateNote] = useState('');
  const [expandedThreadId, setExpandedThreadId] = useState(null);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'handled'

  // Filter emails requiring Client's attention
  const clientEmails = emails.filter(e => {
    if (activeTab === 'pending') {
      return e.classification?.type === 'Client to Reply' && !e.clientFeedback?.handled;
    }
    return e.clientFeedback?.handled || e.clientFeedback?.delegatedBack;
  });

  const handleMarkHandled = async (emailId) => {
    await onClientAction(emailId, { action: 'mark_handled' });
    // Celebratory dual cannon confetti burst
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 60,
      origin: { x: 0.2, y: 0.7 }
    });
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 60,
      origin: { x: 0.8, y: 0.7 }
    });
  };

  const handleDelegateSubmit = async (emailId) => {
    await onClientAction(emailId, {
      action: 'delegate_to_assistant',
      note: delegateNote.trim() || 'Please draft and execute response on my behalf.'
    });
    setDelegatingEmailId(null);
    setDelegateNote('');
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 }
    });
  };

  const clientName = client?.name || 'Sarah Jenkins';
  const firstName = clientName.split(' ')[0];

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 space-y-8 animate-fade-in">
      
      {/* Client VIP Header */}
      <div className="bg-gradient-to-r from-surface-900 via-surface-800 to-brand-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-surface-700/50 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-gradient from-brand-500/10 to-transparent pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            <img
              src={client?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
              alt={clientName}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-400/40 shadow-md"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-300">
                  Client VIP Workspace
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white mt-0.5">
                Welcome back, {firstName}
              </h1>
              <p className="text-xs text-surface-300 mt-1">
                {client?.role || 'CEO & Founder'} at {client?.company || 'GMAIL Inc.'} • Powered by AuraMail AI Executive Copilot
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onSwitchToAssistantView}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/10 transition-all flex items-center space-x-2"
            >
              <Zap className="w-3.5 h-3.5 text-brand-300" />
              <span>Open Assistant View</span>
            </button>
          </div>
        </div>

        {/* Quick Tabs: Action Required vs Handled */}
        <div className="flex items-center space-x-3 mt-6 pt-5 border-t border-white/10">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'pending'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                : 'text-surface-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Needs Your Attention ({emails.filter(e => e.classification?.type === 'Client to Reply' && !e.clientFeedback?.handled).length})
          </button>
          <button
            onClick={() => setActiveTab('handled')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'handled'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'text-surface-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Resolved & Delegated ({emails.filter(e => e.clientFeedback?.handled || e.clientFeedback?.delegatedBack).length})
          </button>
        </div>
      </div>

      {/* Email Feed */}
      <div className="space-y-4">
        {clientEmails.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-surface-900 rounded-3xl border border-surface-200 dark:border-surface-800 p-8 shadow-subtle">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-surface-900 dark:text-surface-100">
              Inbox Zero for Client Attention!
            </h3>
            <p className="text-xs text-surface-400 mt-1 max-w-sm mx-auto">
              {activeTab === 'pending'
                ? 'Your assistant and AI co-pilot have triaged all incoming requests. No urgent items require your personal action right now.'
                : 'No handled or delegated items yet.'}
            </p>
          </div>
        ) : (
          clientEmails.map((email) => {
            const isExpanded = expandedThreadId === email.id;
            const isDelegating = delegatingEmailId === email.id;
            const latestMsg = email.messages && email.messages.length > 0
              ? email.messages[email.messages.length - 1]
              : { sender: 'Sender' };

            return (
              <div
                key={email.id}
                className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200/90 dark:border-surface-800 shadow-card hover:shadow-card-hover transition-all overflow-hidden"
              >
                {/* Attention Strip */}
                <div className="p-5 sm:p-6 space-y-4">
                  
                  {/* Top: Sender info & Urgency */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center space-x-3 min-w-0">
                      <img
                        src={latestMsg.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                        alt={latestMsg.sender}
                        className="w-10 h-10 rounded-xl object-cover ring-1 ring-surface-200 dark:ring-surface-700 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-bold text-surface-900 dark:text-surface-100 truncate">
                            {latestMsg.sender}
                          </h4>
                          <span className="text-[11px] text-surface-400 truncate">
                            {latestMsg.senderEmail}
                          </span>
                        </div>
                        <div className="text-xs text-surface-500 font-medium mt-0.5">
                          {new Date(email.updatedAt || email.createdAt).toLocaleDateString([], {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Badge */}
                    <div className="flex items-center space-x-2 shrink-0">
                      {email.classification?.urgency === 'urgent' && (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                          <Clock className="w-3 h-3" />
                          <span>Urgent Deadline</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <h3 className="text-base font-bold text-surface-900 dark:text-surface-100">
                      {email.subject}
                    </h3>
                  </div>

                  {/* Why client response is needed Callout */}
                  <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs">
                    <div className="flex items-start space-x-2 text-amber-900 dark:text-amber-200">
                      <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Why your input is needed: </span>
                        <span>{email.classification?.reason}</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Executive Summary */}
                  {email.summary && (
                    <div className="text-xs text-surface-600 dark:text-surface-300 bg-surface-50 dark:bg-surface-800/50 p-3 rounded-xl border border-surface-200/50 dark:border-surface-700/50">
                      <span className="font-semibold text-surface-900 dark:text-surface-100 block mb-1">
                        Executive Digest:
                      </span>
                      <p className="leading-relaxed">{email.summary}</p>
                    </div>
                  )}

                  {/* Client Feedback Status if already handled/delegated */}
                  {email.clientFeedback?.handled && (
                    <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>You marked this matter as handled.</span>
                    </div>
                  )}

                  {email.clientFeedback?.delegatedBack && (
                    <div className="flex items-center space-x-2 text-xs font-semibold text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40 p-2.5 rounded-xl border border-brand-200 dark:border-brand-800">
                      <CornerDownLeft className="w-4 h-4" />
                      <span>Delegated to Assistant: "{email.clientFeedback.noteToAssistant}"</span>
                    </div>
                  )}

                  {/* Delegate Note Composer if opened */}
                  {isDelegating && (
                    <div className="p-3.5 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-2.5 animate-slide-up">
                      <div className="flex items-center justify-between text-xs font-bold text-surface-700 dark:text-surface-200">
                        <span>Delegate to Assistant Alex</span>
                        <button
                          onClick={() => setDelegatingEmailId(null)}
                          className="text-surface-400 hover:text-surface-600 text-[11px]"
                        >
                          Cancel
                        </button>
                      </div>
                      <input
                        type="text"
                        value={delegateNote}
                        onChange={(e) => setDelegateNote(e.target.value)}
                        placeholder="Add instruction (e.g. 'Tell them yes, sign off and schedule for Friday')..."
                        className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-surface-900 border border-surface-300 dark:border-surface-600 text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                        autoFocus
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setDelegatingEmailId(null)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleDelegateSubmit(email.id)}
                          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm"
                        >
                          <Send className="w-3 h-3" />
                          <span>Send to Assistant</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Primary Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-surface-100 dark:border-surface-800">
                    <button
                      onClick={() => setExpandedThreadId(isExpanded ? null : email.id)}
                      className="flex items-center space-x-1 text-xs font-semibold text-surface-500 hover:text-surface-900 dark:hover:text-surface-100 transition-colors"
                    >
                      <span>{isExpanded ? 'Hide conversation thread' : 'View full email thread'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <div className="flex items-center space-x-2">
                      {!email.clientFeedback?.handled && (
                        <>
                          <button
                            onClick={() => {
                              setDelegatingEmailId(email.id);
                              setDelegateNote('');
                            }}
                            className="btn-shimmer flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-200 text-xs font-bold transition-all shadow-sm"
                          >
                            <CornerDownLeft className="w-3.5 h-3.5 text-brand-500" />
                            <span>Delegate to Assistant</span>
                          </button>

                          <button
                            onClick={() => handleMarkHandled(email.id)}
                            className="btn-shimmer flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-glow-emerald hover:shadow-[0_0_20px_rgba(16,185,129,0.7)] transition-all hover:scale-105"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Mark Handled</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Collapsible Original Thread Details */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-surface-100 dark:border-surface-800 space-y-3 bg-surface-50/60 dark:bg-surface-800/40 p-4 rounded-xl animate-slide-up">
                      <div className="text-[11px] font-bold text-surface-400 uppercase tracking-wider">
                        Full Conversation History
                      </div>
                      {email.messages?.map((msg, i) => (
                        <div key={msg.id || i} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-semibold text-surface-800 dark:text-surface-200">
                            <span>{msg.sender} ({msg.senderEmail})</span>
                            <span className="text-[10px] text-surface-400 font-normal">
                              {new Date(msg.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                            </span>
                          </div>
                          <div className="text-xs text-surface-600 dark:text-surface-300 leading-relaxed whitespace-pre-line pl-2 border-l-2 border-surface-300 dark:border-surface-600">
                            {msg.body}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
