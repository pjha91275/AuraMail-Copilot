import React, { useState, useEffect } from 'react';
import {
  Star,
  Archive,
  Trash2,
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
  onDelete,
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

  // Instant heuristic draft generator for 0ms reactivity on tone click
  const generateToneDraft = (tone, customNotes = '') => {
    if (!email) return '';
    const lastMsg = email.messages && email.messages.length > 0 ? email.messages[email.messages.length - 1] : null;
    const senderName = (lastMsg?.sender || 'there').split(' ')[0];
    const cleanSubj = (email.subject || '').replace(/^(re:|fwd:|urgent:)\s*/i, '');

    if (tone === 'Executive Brief') {
      return `Hi ${senderName},\n\nThank you for sending this over. We have reviewed the proposal and terms regarding "${cleanSubj}". Everything looks aligned on our end, and we are proceeding with execution as discussed.\n\nBest,\n${clientName}`;
    }

    if (tone === 'Scheduling Confirmation') {
      const meetingTime = email.meetingDetails?.date ? `${email.meetingDetails.date} at ${email.meetingDetails.time || '10:00 AM'}` : 'Friday at 10:00 AM EST';
      return `Hi ${senderName},\n\nThank you for following up. I have reviewed ${clientName}'s calendar and confirmed that ${meetingTime} works well for our discussion.\n\nI have dispatched an updated calendar invitation with meeting coordinates.\n\nBest regards,\nExecutive Assistant to ${clientName}`;
    }

    if (tone === 'Polite Decline') {
      return `Hi ${senderName},\n\nThank you very much for thinking of ${clientName} regarding "${cleanSubj}". Due to our current high-priority commitments and roadmap deliverables for this quarter, we will have to politely pass at this time.\n\nWe appreciate you reaching out and wish you great success with this initiative.\n\nWarm regards,\nOffice of ${clientName}`;
    }

    // Default: Professional
    if (customNotes && customNotes.trim()) {
      return `Hi ${senderName},\n\nThank you for reaching out regarding "${cleanSubj}". In response to your note: ${customNotes.trim()}.\n\nPlease let us know if you need any additional documentation.\n\nBest regards,\nAssistant to ${clientName}`;
    }

    return `Hi ${senderName},\n\nThank you for getting in touch regarding "${cleanSubj}". We have received your correspondence and are coordinating the next steps.\n\nWe will follow up shortly once the review is finalized.\n\nBest regards,\nExecutive Assistant to ${clientName}`;
  };

  useEffect(() => {
    if (email) {
      const initialTone = email.draftReply?.tone || 'Professional';
      setSelectedTone(initialTone);
      setInstructions('');
      if (email.draftReply?.content && email.draftReply.content.trim()) {
        setDraftContent(email.draftReply.content);
      } else {
        setDraftContent(generateToneDraft(initialTone, ''));
      }
    }
  }, [email?.id]);

  if (!email) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center glass-panel rounded-3xl p-10 text-center text-surface-400 h-[calc(100vh-10rem)]">
        <div className="w-20 h-20 rounded-3xl bg-surface-100 dark:bg-surface-800/80 flex items-center justify-center text-surface-400 mb-4 shadow-subtle">
          <Mail className="w-10 h-10" />
        </div>
        <h3 className="text-lg font-bold text-surface-800 dark:text-surface-100">
          Select a conversation
        </h3>
        <p className="text-xs text-surface-400 mt-2 max-w-sm leading-relaxed">
          Choose an email thread from the inbox list to inspect AI classification, review action items, or draft an AI-assisted reply.
        </p>
      </div>
    );
  }

  const classification = email.classification || { type: 'Assistant to Reply', confidence: 0.85, reason: '' };
  const isAssistant = classification.type === 'Assistant to Reply';
  const isClient = classification.type === 'Client to Reply';
  const isNoReply = classification.type === 'No Reply Needed';

  const handleSelectTone = async (tone) => {
    setSelectedTone(tone);
    const draft = generateToneDraft(tone, instructions);
    setDraftContent(draft);
    if (onGenerateDraft) {
      try {
        onGenerateDraft({
          subject: email.subject,
          messages: email.messages,
          tone,
          instructions,
          clientName
        }).then(res => {
          if (res && res.trim()) {
            setDraftContent(res.trim());
          }
        }).catch(() => {});
      } catch (e) {}
    }
  };

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
      if (generated && generated.trim()) {
        setDraftContent(generated.trim());
      } else {
        setDraftContent(generateToneDraft(selectedTone, instructions));
      }
    } catch (e) {
      setDraftContent(generateToneDraft(selectedTone, instructions));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSend = async () => {
    if (!draftContent.trim()) return;
    const contentToSend = draftContent.trim();
    setIsSending(true);
    try {
      await onSendReply(email.id, contentToSend, selectedTone);
      confetti({
        particleCount: 45,
        spread: 65,
        origin: { y: 0.8 }
      });
      setDraftContent('');
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
    <div className="flex-1 flex flex-col glass-panel rounded-3xl overflow-hidden h-[calc(100vh-10rem)] shadow-card">
      
      {/* Thread Header - explicit relative z-30 ensures dropdown stacks over scrollable body */}
      <div className="p-6 border-b border-surface-200/80 dark:border-white/[0.06] bg-white/40 dark:bg-surface-900/60 backdrop-blur-md relative z-30">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2.5 mb-2.5 flex-wrap gap-y-2">
              
              {/* Mobile Back Button */}
              {onBackToList && (
                <button
                  onClick={onBackToList}
                  className="md:hidden flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-surface-200 dark:bg-surface-800 text-surface-700 dark:text-surface-300 text-xs font-bold hover:bg-surface-300 transition-colors mr-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Inbox</span>
                </button>
              )}

              {/* Classification Badge with manual override dropdown */}
              <div className="relative z-40">
                <button
                  onClick={() => setOverrideMenuOpen(!overrideMenuOpen)}
                  className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide transition-all shadow-md ${
                    isAssistant
                      ? 'bg-brand-600 text-white shadow-glow-brand'
                      : isClient
                      ? 'bg-amber-600 text-white shadow-glow-amber'
                      : 'bg-emerald-600 text-white shadow-glow-emerald'
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
                  <>
                    {/* Click-away backdrop */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setOverrideMenuOpen(false)}
                      aria-hidden="true"
                    />
                    <div
                      className="absolute left-0 mt-2 w-64 bg-white dark:bg-surface-800 rounded-2xl shadow-2xl border border-surface-200 dark:border-surface-700 py-2 z-50 animate-slide-up ring-1 ring-black/5 dark:ring-white/10"
                      onMouseLeave={() => setOverrideMenuOpen(false)}
                    >
                    <div className="px-3.5 py-1 text-[10px] font-black text-surface-400 uppercase tracking-widest">
                      Override Classification
                    </div>
                    <button
                      onClick={() => {
                        onUpdateClassification(email.id, 'Assistant to Reply');
                        setOverrideMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-2.5 px-3.5 py-2.5 text-xs text-left hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                    >
                      <Zap className="w-4 h-4 text-brand-500" />
                      <span className="font-bold text-brand-600 dark:text-brand-400">Assistant to Reply</span>
                    </button>
                    <button
                      onClick={() => {
                        onUpdateClassification(email.id, 'Client to Reply');
                        setOverrideMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-2.5 px-3.5 py-2.5 text-xs text-left hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                    >
                      <UserCheck className="w-4 h-4 text-amber-500" />
                      <span className="font-bold text-amber-600 dark:text-amber-400">Client to Reply</span>
                    </button>
                    <button
                      onClick={() => {
                        onUpdateClassification(email.id, 'No Reply Needed');
                        setOverrideMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-2.5 px-3.5 py-2.5 text-xs text-left hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">No Reply Needed</span>
                    </button>
                  </div>
                </>
              )}
              </div>

              {/* Confidence Pill */}
              <span className="text-xs font-bold text-surface-600 dark:text-surface-300 bg-surface-100/80 dark:bg-surface-800/80 px-2.5 py-1 rounded-xl border border-surface-200/60 dark:border-white/[0.08]">
                {Math.round((classification.confidence || 0.85) * 100)}% Confidence
              </span>

              {classification.manualOverride && (
                <span className="text-[11px] font-bold text-brand-600 dark:text-brand-300 bg-brand-500/10 px-2.5 py-1 rounded-xl border border-brand-500/30">
                  Assistant Override
                </span>
              )}

              {/* Urgency Badge */}
              {classification.urgency && (
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-xl uppercase tracking-wider ${
                  classification.urgency === 'urgent'
                    ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30'
                    : classification.urgency === 'high'
                    ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                    : 'bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400'
                }`}>
                  {classification.urgency}
                </span>
              )}
            </div>

            <h2 className="text-lg font-black text-surface-900 dark:text-white leading-snug tracking-tight">
              {email.subject}
            </h2>
          </div>

          {/* Action icons */}
          <div className="flex items-center space-x-1.5 shrink-0">
            <button
              onClick={() => onToggleStar(email.id, !email.starred)}
              className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500 transition-colors"
              title={email.starred ? 'Starred' : 'Star'}
            >
              <Star className={`w-4.5 h-4.5 ${email.starred ? 'fill-amber-400 text-amber-500' : ''}`} />
            </button>
            <button
              onClick={() => onToggleRead(email.id, !email.unread)}
              className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500 transition-colors"
              title={email.unread ? 'Mark as read' : 'Mark as unread'}
            >
              {email.unread ? <MailOpen className="w-4.5 h-4.5" /> : <Mail className="w-4.5 h-4.5" />}
            </button>
            <button
              onClick={() => onArchive(email.id)}
              className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500 hover:text-amber-500 transition-colors"
              title="Archive thread"
            >
              <Archive className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={() => onDelete && onDelete(email.id)}
              className="p-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-surface-500 hover:text-rose-500 transition-colors"
              title="Delete thread (Remove permanently)"
            >
              <Trash2 className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Body: Scrollable sub-sections with generous spacing */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* AI Smart Triage Briefing Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-50/90 via-indigo-50/70 to-purple-50/60 dark:from-brand-500/15 dark:via-[#0c1426]/75 dark:to-[#070b14]/90 border border-brand-200/90 dark:border-brand-500/40 shadow-[0_8px_30px_rgba(74,117,246,0.12)] dark:shadow-[0_0_35px_-5px_rgba(99,102,241,0.25)] space-y-4 ai-scan-effect relative overflow-hidden backdrop-blur-2xl">
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-500 flex items-center justify-center text-white shadow-glow-brand animate-pulse-subtle">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-brand-700 dark:text-brand-300">AI Intelligence Insights</span>
            </div>
            <span className="text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-surface-800/80 dark:text-surface-300 dark:border-white/[0.08] px-3 py-1 rounded-full flex items-center space-x-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Auto-triage active</span>
            </span>
          </div>

          {/* AI Reasoning Pill */}
          <div className="relative z-10 text-xs text-surface-900 dark:text-surface-200 bg-white/95 dark:bg-surface-800/80 p-4 rounded-2xl border border-brand-200/80 dark:border-white/[0.08] shadow-sm leading-relaxed">
            <span className="font-black text-brand-600 dark:text-brand-400">Why this was assigned: </span>
            <span className="font-medium text-surface-800 dark:text-surface-200">{classification.reason}</span>
          </div>

          {/* Executive Summary */}
          {email.summary && (
            <div className="relative z-10 text-xs text-surface-800 dark:text-surface-300 bg-white/90 dark:bg-surface-800/60 p-4 rounded-2xl border border-purple-200/70 dark:border-white/[0.05] shadow-sm leading-relaxed">
              <span className="font-black text-purple-700 dark:text-white block mb-1">
                Executive Digest:
              </span>
              <p className="font-medium">{email.summary}</p>
            </div>
          )}

          {/* Action Items Checklist */}
          {email.actionItems && email.actionItems.length > 0 && (
            <div className="relative z-10 space-y-2 pt-1">
              <div className="text-[11px] font-black text-brand-700 dark:text-brand-300 uppercase tracking-widest flex items-center space-x-2">
                <FileText className="w-3.5 h-3.5 text-brand-500" />
                <span>Extracted Action Items</span>
              </div>
              <div className="space-y-1.5">
                {email.actionItems.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleAction(idx)}
                    className="flex items-center space-x-3 p-3 rounded-2xl bg-white/95 dark:bg-surface-800/50 hover:bg-white dark:hover:bg-surface-800/80 border border-brand-100 dark:border-white/[0.06] shadow-sm transition-all cursor-pointer text-xs"
                  >
                    <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                      completedActions[idx]
                        ? 'bg-brand-600 border-brand-600 text-white shadow-sm'
                        : 'border-brand-300 dark:border-surface-600 bg-brand-50/50 dark:bg-surface-850'
                    }`}>
                      {completedActions[idx] && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span className={`flex-1 font-semibold ${completedActions[idx] ? 'line-through text-surface-400' : 'text-surface-800 dark:text-surface-200'}`}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Meeting / Calendar preview */}
          {email.meetingDetails?.isDetected && (
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-xs">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-sky-900 dark:text-sky-200 text-xs">
                    {email.meetingDetails.title}
                  </div>
                  <div className="text-[11px] text-sky-700 dark:text-sky-300 mt-0.5">
                    {email.meetingDetails.date} • {email.meetingDetails.time} ({email.meetingDetails.location})
                  </div>
                </div>
              </div>
              <button
                onClick={() => alert(`Calendar invite confirmed for ${email.meetingDetails.title}`)}
                className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shrink-0 shadow-sm transition-colors"
              >
                Add to Calendar
              </button>
            </div>
          )}

        </div>

        {/* Message Thread History */}
        <div className="space-y-4">
          <div className="text-xs font-black text-surface-400 dark:text-surface-500 uppercase tracking-widest px-1">
            Conversation Thread ({email.messages?.length || 1} message{email.messages?.length > 1 ? 's' : ''})
          </div>

          {email.messages?.map((msg, index) => {
            const isClientMsg = msg.isFromClient;
            const isAssistantMsg = msg.isFromAssistant;

            return (
              <div
                key={msg.id || index}
                className={`p-5 rounded-3xl border transition-all ${
                  isAssistantMsg
                    ? 'bg-brand-50/70 dark:bg-brand-950/30 border-brand-200 dark:border-brand-800/60'
                    : isClientMsg
                    ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60'
                    : 'bg-white/70 dark:bg-surface-850/60 border-surface-200 dark:border-white/[0.06] shadow-card'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={msg.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                      alt={msg.sender}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-200 dark:ring-white/20 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-surface-900 dark:text-white">
                          {msg.sender}
                        </span>
                        {isAssistantMsg && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                            Assistant
                          </span>
                        )}
                        {isClientMsg && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                            Client
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-surface-400">
                        {msg.senderEmail}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs text-surface-400 font-medium">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="text-xs text-surface-700 dark:text-surface-300 leading-relaxed whitespace-pre-line pl-11">
                  {msg.body}
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Reply Studio */}
        <div className="p-6 rounded-3xl bg-white/80 dark:bg-surface-850/80 border border-surface-200 dark:border-white/[0.08] shadow-card space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-glow-brand">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xs font-black text-surface-900 dark:text-white uppercase tracking-wider">
                AI Reply Studio
              </span>
            </div>

            {/* Tone Selector */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {['Professional', 'Executive Brief', 'Scheduling Confirmation', 'Polite Decline'].map((tone) => (
                <button
                  key={tone}
                  onClick={() => handleSelectTone(tone)}
                  className={`px-3 py-1 rounded-xl font-bold transition-all ${
                    selectedTone === tone
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Assistant Instruction Input */}
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Add specific notes for AI reply (e.g. 'Confirm Friday at 10am, CC Jason')..."
              className="flex-1 px-4 py-2.5 rounded-2xl text-xs bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-white/[0.08] text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
            <button
              onClick={handleGenerateAiDraft}
              disabled={isGenerating}
              className="btn-shimmer flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:hover:bg-surface-700 text-xs font-bold text-surface-800 dark:text-surface-200 transition-colors disabled:opacity-50 shrink-0 shadow-sm"
            >
              {isGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-brand-500" />}
              <span>{isGenerating ? 'Drafting...' : 'Regenerate Draft'}</span>
            </button>
          </div>

          {/* Editable Textarea */}
          <div className="relative">
            <textarea
              rows={5}
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
              placeholder="AI generated draft will appear here. You can freely edit before sending..."
              className="w-full p-4 rounded-2xl text-xs leading-relaxed bg-surface-50 dark:bg-surface-900/90 border border-surface-200 dark:border-white/[0.08] text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 resize-none font-sans"
            />
          </div>

          {/* Studio Action Footer */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-surface-400 font-medium">
              AI-generated responses must be reviewed before sending.
            </span>

            <div className="flex items-center space-x-2.5">
              <button
                onClick={() => onSaveDraft(email.id, draftContent, selectedTone)}
                className="btn-shimmer px-4 py-2 rounded-2xl text-xs font-bold bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300 transition-colors"
              >
                Save as Draft
              </button>

              <button
                onClick={handleSend}
                disabled={isSending || !draftContent.trim()}
                className="btn-shimmer flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-glow-brand transition-all disabled:opacity-50 hover:shadow-[0_0_25px_rgba(74,117,246,0.7)] hover:-translate-y-0.5"
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
