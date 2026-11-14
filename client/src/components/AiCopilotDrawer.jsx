import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Send,
  Zap,
  UserCheck,
  Clock,
  ArrowRight,
  MessageSquare,
  Bot,
  User,
  ChevronRight
} from 'lucide-react';

export default function AiCopilotDrawer({
  isOpen,
  onClose,
  onAskCopilot,
  onSelectEmailById,
  activeClient
}) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello! I'm your AuraMail AI Assistant Co-pilot. I analyze your clients' communications, track reply obligations, extract deadlines, and draft executive responses.\n\nHow can I help you manage the inbox today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      highlightedEmails: [],
      suggestedActions: [
        'Show me emails that need my attention',
        'Which emails require the client\'s attention?',
        'What am I waiting for a response on?',
        'Summarize top conversations'
      ]
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (userText) => {
    const textToSend = userText || query;
    if (!textToSend.trim() || isLoading) return;

    const userMsg = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    try {
      const response = await onAskCopilot(textToSend);
      if (response) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: response.answer,
            highlightedEmails: response.highlightedEmails || [],
            suggestedActions: response.suggestedActions || [],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-white dark:bg-surface-900 shadow-modal border-l border-surface-200 dark:border-surface-800 flex flex-col animate-slide-left">
      
      {/* Header */}
      <div className="p-4 border-b border-surface-200 dark:border-surface-800 flex items-center justify-between bg-surface-50/50 dark:bg-surface-900">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-brand-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-surface-900 dark:text-surface-100 flex items-center space-x-1.5">
              <span>Inbox AI Copilot</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </h3>
            <p className="text-[10px] text-surface-400">
              {activeClient ? `Focused on ${activeClient.name}` : 'Multi-client global assistant'}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-surface-400 hover:text-surface-600 dark:hover:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-start space-x-2 max-w-[90%]">
              {msg.sender === 'ai' && (
                <div className="w-6 h-6 rounded-lg bg-brand-500 text-white flex items-center justify-center text-[11px] shrink-0 mt-0.5 shadow-sm">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-brand-600 text-white rounded-tr-none'
                    : 'bg-surface-100 dark:bg-surface-800 text-surface-800 dark:text-surface-200 rounded-tl-none border border-surface-200/60 dark:border-surface-700/60'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {/* Highlighted Emails if returned by AI */}
                {msg.highlightedEmails && msg.highlightedEmails.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-surface-200/80 dark:border-surface-700/80 space-y-1.5">
                    <span className="text-[10px] font-bold text-surface-400 uppercase tracking-wider block">
                      Referenced Conversations:
                    </span>
                    {msg.highlightedEmails.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectEmailById(item.id);
                          onClose();
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 hover:border-brand-500 transition-all text-left group"
                      >
                        <div className="truncate pr-2">
                          <div className="font-semibold text-surface-900 dark:text-surface-100 truncate text-[11px]">
                            {item.subject}
                          </div>
                          {item.urgency && (
                            <span className="text-[9px] font-bold text-rose-500 uppercase">
                              {item.urgency} priority
                            </span>
                          )}
                          {item.waitingOn && (
                            <span className="text-[9px] text-purple-400">
                              Waiting on: {item.waitingOn}
                            </span>
                          )}
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-surface-400 group-hover:text-brand-500 shrink-0" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Suggested Follow-up Actions */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-surface-200/80 dark:border-surface-700/80 space-y-1">
                    <span className="text-[10px] font-bold text-surface-400 uppercase tracking-wider block">
                      Recommended Follow-ups:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedActions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(action)}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-white dark:bg-surface-900 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-900/60 hover:bg-brand-50 dark:hover:bg-brand-950 transition-colors text-left"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <span className="text-[9px] text-surface-400 mt-1 px-1">
              {msg.timestamp}
            </span>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 text-xs text-surface-400 pl-8">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-brand-500" />
            <span>AI is querying the inbox...</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="p-3 border-t border-surface-200 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about emails, meetings, drafts..."
            className="flex-1 px-3 py-2 rounded-xl text-xs bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="p-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white transition-colors disabled:opacity-50 shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
}
