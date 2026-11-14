import React, { useState, useEffect } from 'react';
import {
  Star,
  Archive,
  Mail,
  MailOpen,
  Zap,
  UserCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  Send,
  Edit3,
  Check,
  AlertTriangle,
  ChevronDown,
  RefreshCw,
  Share2,
  Sliders,
  FileText,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EmailDetail({
  email,
  onUpdateClassification,
  onToggleStar,
  onToggleRead,
  onArchive,
  onSendReply,
  onSaveDraft,
  onGenerateDraft,
  clientName = 'Sarah Jenkins',
  onBackToList
}) {
  const [overrideMenuOpen, setOverrideMenuOpen] = useState(false);
  const [selectedTone, setSelectedTone] = useState('Professional');
  const [instructions, setInstructions] = useState('');
  const [draftContent, setDraftContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [completedActions, setCompletedActions] = useState({});

  useEffect(() => {
    if (email) {
      setDraftContent(email.draftReply?.content || '');
      setSelectedTone(email.draftReply?.tone || 'Professional');
      setInstructions('');
    }
  }, [email?.id]);

  if (!email) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-surface-900/50 rounded-2xl border border-surface-200/80 dark:border-surface-800 shadow-subtle p-8 text-center text-surface-400 h-[calc(100vh-8.5rem)]">
        <div className="w-16 h-16 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center text-surface-400 mb-3">
          <Mail className="w-8 h-8" />
        </div>
        <h3 className="text-base font-semibold text-surface-800 dark:text-surface-200">
          Select a conversation
        </h3>
        <p className="text-xs text-surface-400 mt-1 max-w-sm">
          Choose an email thread from the inbox list to inspect AI classification, review action items, or draft an AI-assisted reply.
        </p>
      </div>
    );
  }

  const classification = email.classification || { type: 'Assistant to Reply', confidence: 0.85, reason: '' };
  const isAssistant = classification.type === 'Assistant to Reply';
  const isClient = classification.type === 'Client to Reply';
  const isNoReply = classification.type === 'No Reply Needed';

  const handleGenerateAiDraft = async () => {
    setIsGenerating(true);
    try {
      const generated = await onGenerateDraft({
        subject: email.subject,
        messages: email.messages,
        tone: selectedTone,
        instructions,
        clientName
      });
      if (generated) {
        setDraftContent(generated);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSend = async () => {
    if (!draftContent.trim()) return;
    setIsSending(true);
    try {
      await onSendReply(email.id, draftContent, selectedTone);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 }
      });
    } finally {
      setIsSending(false);
    }
  };

  const toggleAction = (idx) => {
    setCompletedActions(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-surface-900/50 rounded-2xl border border-surface-200/80 dark:border-surface-800 shadow-subtle overflow-hidden h-[calc(100vh-8.5rem)]">
      
      {/* Thread Header */}
      <div className="p-4 border-b border-surface-200/80 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-900/80">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1.5 flex-wrap gap-y-1">
              {/* Mobile Back Button */}
              {onBackToList && (
                <button
                  onClick={onBackToList}
                  className="md:hidden flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-surface-200 dark:bg-surface-800 text-surface-700 dark:text-surface-300 text-xs font-semibold hover:bg-surface-300"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Inbox</span>
                </button>
              )}

              {/* Classification Badge with manual override dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOverrideMenuOpen(!overrideMenuOpen)}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-sm ${
                    isAssistant
                      ? 'bg-brand-500 text-white shadow-brand-500/20'
                      : isClient
                      ? 'bg-amber-500 text-white shadow-amber-500/20'
                      : 'bg-emerald-600 text-white shadow-emerald-500/20'
                  }`}
                  title="Click to manually change reply responsibility"
                >
                  {isAssistant && <Zap className="w-3.5 h-3.5" />}
                  {isClient && <UserCheck className="w-3.5 h-3.5" />}
                  {isNoReply && <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>{classification.type}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80 ml-0.5" />
                </button>

                {/* Override Dropdown */}
                {overrideMenuOpen && (
                  <div
                    className="absolute left-0 mt-2 w-56 bg-white dark:bg-surface-800 rounded-xl shadow-modal border border-surface-200 dark:border-surface-700 py-1.5 z-50 animate-slide-up"
                    onMouseLeave={() => setOverrideMenuOpen(false)}
                  >
                    <div className="px-3 py-1 text-[10px] font-bold text-surface-400 uppercase tracking-wider">
                      Override Classification
                    </div>
                    <button
                      onClick={() => {
                        onUpdateClassification(email.id, 'Assistant to Reply');
                        setOverrideMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-left hover:bg-surface-100 dark:hover:bg-surface-700"
                    >
                      <Zap className="w-3.5 h-3.5 text-brand-500" />
                      <span className="font-semibold text-brand-600 dark:text-brand-400">Assistant to Reply</span>
                    </button>
                    <button
                      onClick={() => {
                        onUpdateClassification(email.id, 'Client to Reply');
                        setOverrideMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-left hover:bg-surface-100 dark:hover:bg-surface-700"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-amber-500" />
                      <span className="font-semibold text-amber-600 dark:text-amber-400">Client to Reply</span>
                    </button>
                    <button
                      onClick={() => {
                        onUpdateClassification(email.id, 'No Reply Needed');
                        setOverrideMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-left hover:bg-surface-100 dark:hover:bg-surface-700"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">No Reply Needed</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Confidence Pill */}
              <span className="text-[11px] font-semibold text-surface-500 dark:text-surface-400 bg-surface-100 dark:bg-surface-800 px-2 py-0.5 rounded-md border border-surface-200/60 dark:border-surface-700/60">
                {Math.round((classification.confidence || 0.85) * 100)}% Confidence
              </span>

              {classification.manualOverride && (
                <span className="text-[10px] font-semibold text-brand-600 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/60 px-2 py-0.5 rounded-md border border-brand-200 dark:border-brand-800">
                  Assistant Override
                </span>
              )}

              {/* Urgency Badge */}
              {classification.urgency && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                  classification.urgency === 'urgent'
                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200'
                    : classification.urgency === 'high'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200'
                    : 'bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400'
                }`}>
                  {classification.urgency}
                </span>
              )}
            </div>

            <h2 className="text-base font-bold text-surface-900 dark:text-surface-100 leading-snug">
              {email.subject}
            </h2>
          </div>

          {/* Action icons */}
          <div className="flex items-center space-x-1 shrink-0">
            <button
              onClick={() => onToggleStar(email.id, !email.starred)}
              className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500 transition-colors"
              title={email.starred ? 'Starred' : 'Star'}
            >
              <Star className={`w-4 h-4 ${email.starred ? 'fill-amber-400 text-amber-500' : ''}`} />
            </button>
            <button
              onClick={() => onToggleRead(email.id, !email.unread)}
              className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500 transition-colors"
              title={email.unread ? 'Mark as read' : 'Mark as unread'}
            >
              {email.unread ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
            </button>
            <button
              onClick={() => onArchive(email.id)}
              className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500 hover:text-rose-500 transition-colors"
              title="Archive thread"
            >
              <Archive className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Body: Two scrollable sub-sections */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* AI Smart Triage Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-brand-50/50 via-white to-surface-50 dark:from-brand-950/20 dark:via-surface-900 dark:to-surface-900 border border-brand-200/60 dark:border-brand-900/40 shadow-subtle space-y-3">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-brand-700 dark:text-brand-300">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">AI Intelligence Insights</span>
            </div>
            <span className="text-[11px] text-surface-400 font-medium">
              Auto-triage active
            </span>
          </div>

          {/* AI Reasoning Pill */}
          <div className="text-xs text-surface-700 dark:text-surface-300 bg-white/80 dark:bg-surface-800/80 p-2.5 rounded-xl border border-surface-200/60 dark:border-surface-700/60">
            <span className="font-semibold text-brand-600 dark:text-brand-400">Why this was assigned: </span>
            {classification.reason}
          </div>

          {/* Executive Summary */}
          {email.summary && (
            <div className="text-xs text-surface-600 dark:text-surface-300 bg-white/50 dark:bg-surface-800/50 p-2.5 rounded-xl border border-surface-200/40 dark:border-surface-700/40">
              <span className="font-semibold text-surface-900 dark:text-surface-100 block mb-1">
                Executive TL;DR:
              </span>
              <p className="leading-relaxed">{email.summary}</p>
            </div>
          )}

          {/* Action Items Checklist */}
          {email.actionItems && email.actionItems.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] font-bold text-surface-500 uppercase tracking-wider flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Extracted Action Items</span>
              </div>
              <div className="space-y-1">
                {email.actionItems.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleAction(idx)}
                    className="flex items-center space-x-2.5 p-1.5 rounded-lg hover:bg-white dark:hover:bg-surface-800 transition-colors cursor-pointer text-xs"
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                      completedActions[idx]
                        ? 'bg-brand-600 border-brand-600 text-white'
                        : 'border-surface-300 dark:border-surface-600'
                    }`}>
                      {completedActions[idx] && <Check className="w-3 h-3" />}
                    </div>
                    <span className={`flex-1 ${completedActions[idx] ? 'line-through text-surface-400' : 'text-surface-700 dark:text-surface-200'}`}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Meeting / Calendar preview */}
          {email.meetingDetails?.isDetected && (
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs">
              <div className="flex items-start space-x-2.5">
                <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sky-900 dark:text-sky-200">
                    {email.meetingDetails.title}
                  </div>
                  <div className="text-[11px] text-sky-700 dark:text-sky-300 mt-0.5">
                    {email.meetingDetails.date} • {email.meetingDetails.time} ({email.meetingDetails.location})
                  </div>
                </div>
              </div>
              <button
                onClick={() => alert(`Calendar invite prepared for ${email.meetingDetails.title}`)}
                className="px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-[11px] font-semibold shrink-0 transition-colors"
              >
                Add to Calendar
              </button>
            </div>
          )}

        </div>

        {/* Message Thread History */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-surface-400 uppercase tracking-wider px-1">
            Conversation Thread ({email.messages?.length || 1} message{email.messages?.length > 1 ? 's' : ''})
          </div>

          {email.messages?.map((msg, index) => {
            const isClientMsg = msg.isFromClient;
            const isAssistantMsg = msg.isFromAssistant;

            return (
              <div
                key={msg.id || index}
                className={`p-4 rounded-2xl border transition-all ${
                  isAssistantMsg
                    ? 'bg-brand-50/60 dark:bg-brand-950/30 border-brand-200 dark:border-brand-800/60'
                    : isClientMsg
                    ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60'
                    : 'bg-white dark:bg-surface-800/60 border-surface-200 dark:border-surface-700/80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2.5">
                    <img
                      src={msg.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                      alt={msg.sender}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-surface-200 dark:ring-surface-700"
                    />
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs font-bold text-surface-900 dark:text-surface-100">
                          {msg.sender}
                        </span>
                        {isAssistantMsg && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                            Assistant
                          </span>
                        )}
                        {isClientMsg && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                            Client
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-surface-400">
                        {msg.senderEmail}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] text-surface-400 font-medium">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="text-xs text-surface-700 dark:text-surface-300 leading-relaxed whitespace-pre-line pl-9">
                  {msg.body}
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Reply Studio */}
        <div className="p-4 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-surface-900 dark:text-surface-100">
                AI Reply Studio
              </span>
            </div>

            {/* Tone Selector */}
            <div className="flex items-center space-x-1 text-[11px]">
              {['Professional', 'Executive Brief', 'Scheduling Confirmation', 'Polite Decline'].map((tone) => (
                <button
                  key={tone}
                  onClick={() => setSelectedTone(tone)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    selectedTone === tone
                      ? 'bg-brand-600 text-white font-semibold shadow-sm'
                      : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Assistant Instruction Input */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Provide specific notes for AI reply (e.g. 'Confirm Friday at 10am, CC Jason')..."
              className="flex-1 px-3 py-1.5 rounded-xl text-xs bg-surface-50 dark:bg-surface-700/60 border border-surface-200 dark:border-surface-600 text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
            <button
              onClick={handleGenerateAiDraft}
              disabled={isGenerating}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-surface-100 hover:bg-surface-200 dark:bg-surface-700 dark:hover:bg-surface-600 text-xs font-semibold text-surface-700 dark:text-surface-200 transition-colors disabled:opacity-50"
            >
              {isGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-brand-500" />}
              <span>{isGenerating ? 'Generating...' : 'Regenerate Draft'}</span>
            </button>
          </div>

          {/* Editable Textarea */}
          <div className="relative">
            <textarea
              rows={5}
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
              placeholder="AI generated draft will appear here. You can freely edit and refine before sending..."
              className="w-full p-3 rounded-xl text-xs leading-relaxed bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 resize-none font-sans"
            />
          </div>

          {/* Studio Action Footer */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-surface-400">
              AI-generated responses must be reviewed before sending.
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onSaveDraft(email.id, draftContent, selectedTone)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-surface-100 hover:bg-surface-200 dark:bg-surface-700 dark:hover:bg-surface-600 text-surface-700 dark:text-surface-300 transition-colors"
              >
                Save as Draft
              </button>

              <button
                onClick={handleSend}
                disabled={isSending || !draftContent.trim()}
                className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm shadow-brand-500/20 transition-all disabled:opacity-50"
              >
                {isSending ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>Send Reply Now</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
