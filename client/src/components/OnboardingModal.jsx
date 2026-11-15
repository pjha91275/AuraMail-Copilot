import React, { useState } from 'react';
import {
  Sparkles,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Zap,
  UserCheck,
  Lock,
  RefreshCw,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OnboardingModal({
  isOpen,
  onClose,
  onFinishOnboarding,
  onConnectAccount
}) {
  const [step, setStep] = useState(1);
  const [selectedProvider, setSelectedProvider] = useState('google');
  const [emailInput, setEmailInput] = useState('');
  const [autoSchedule, setAutoSchedule] = useState(true);
  const [urgentThreshold, setUrgentThreshold] = useState('high');
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  if (!isOpen) return null;

  const handleAuthorize = async () => {
    setIsAuthorizing(true);
    setTimeout(async () => {
      setIsAuthorizing(false);
      if (emailInput.trim()) {
        await onConnectAccount({
          clientId: 'client-1',
          provider: selectedProvider,
          emailAddress: emailInput.trim(),
          name: `${emailInput.trim()} (${selectedProvider === 'google' ? 'Google Workspace' : 'Microsoft 365'})`
        });
      }
      setStep(3);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const handleFinish = () => {
    onFinishOnboarding();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-surface-900 rounded-3xl max-w-lg w-full border border-surface-200 dark:border-surface-800 shadow-modal overflow-hidden animate-scale-up">
        
        {/* Progress Bar */}
        <div className="h-1 bg-surface-100 dark:bg-surface-800">
          <div
            className="h-full bg-gradient-to-r from-brand-600 to-indigo-500 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Modal Header */}
        <div className="p-6 border-b border-surface-100 dark:border-surface-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-surface-900 dark:text-surface-100">
                Welcome to AuraMail Copilot
              </h2>
              <p className="text-[11px] text-surface-400">
                Step {step} of 3 • Intelligent Executive Assistant Setup
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-surface-400 hover:text-surface-600 dark:hover:text-surface-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step 1: Welcome & Value Proposition */}
        {step === 1 && (
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-surface-900 dark:text-surface-100">
                Email management redefined for personal assistants.
              </h3>
              <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed">
                Personal assistants often manage a heavy inflow of client emails. AuraMail automatically determines who needs to reply, drafts replies in your client's tone, and offers a distraction-free portal for clients to approve high-stakes decisions in 1 click.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200/60 dark:border-brand-900/40 text-left">
                <Zap className="w-5 h-5 text-brand-600 mb-2" />
                <div className="text-xs font-bold text-brand-950 dark:text-brand-200">Assistant Triage</div>
                <div className="text-[10px] text-brand-700 dark:text-brand-400 mt-1">Calendar & administrative auto-assignment</div>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/40 text-left">
                <UserCheck className="w-5 h-5 text-amber-600 mb-2" />
                <div className="text-xs font-bold text-amber-950 dark:text-amber-200">Client VIP View</div>
                <div className="text-[10px] text-amber-700 dark:text-amber-400 mt-1">Only emails requiring executive sign-off</div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/40 text-left">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-2" />
                <div className="text-xs font-bold text-emerald-950 dark:text-emerald-200">Zero Spam</div>
                <div className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-1">Auto-classifies receipts & newsletters</div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-md shadow-brand-500/20 transition-all"
              >
                <span>Connect Email Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Email Account Connection (Gmail / Outlook) */}
        {step === 2 && (
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-base font-bold text-surface-900 dark:text-surface-100">
                Connect your client's mailbox
              </h3>
              <p className="text-xs text-surface-400 mt-0.5">
                Select provider and authorize synchronization via OAuth2.
              </p>
            </div>

            {/* Provider Picker */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedProvider('google')}
                className={`p-3.5 rounded-2xl border text-left flex items-center space-x-3 transition-all ${
                  selectedProvider === 'google'
                    ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 ring-1 ring-brand-500'
                    : 'border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800'
                }`}
              >
                <img
                  src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico"
                  alt="Gmail"
                  className="w-6 h-6 object-contain"
                />
                <div>
                  <div className="text-xs font-bold text-surface-900 dark:text-surface-100">Google Workspace</div>
                  <div className="text-[10px] text-surface-400">Gmail & Calendar</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedProvider('microsoft')}
                className={`p-3.5 rounded-2xl border text-left flex items-center space-x-3 transition-all ${
                  selectedProvider === 'microsoft'
                    ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 ring-1 ring-brand-500'
                    : 'border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800'
                }`}
              >
                <img
                  src="https://res.cdn.office.net/assets/mail/pwa/v1/pngs/outlook_96.png"
                  alt="Outlook"
                  className="w-6 h-6 object-contain"
                />
                <div>
                  <div className="text-xs font-bold text-surface-900 dark:text-surface-100">Microsoft 365</div>
                  <div className="text-[10px] text-surface-400">Outlook & Exchange</div>
                </div>
              </button>
            </div>

            {/* Email Address Input */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-bold text-surface-700 dark:text-surface-300">
                Client's Email Address
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder={selectedProvider === 'google' ? 'sarah.jenkins@techflow.io' : 'david.chen@horizonvc.com'}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            {/* OAuth Security note */}
            <div className="flex items-center space-x-2 text-[11px] text-surface-400 bg-surface-50 dark:bg-surface-800/60 p-2.5 rounded-xl border border-surface-200/50 dark:border-surface-700/50">
              <Lock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>256-bit encrypted read/write OAuth authorization token simulation.</span>
            </div>

            <div className="pt-3 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-medium text-surface-500 hover:text-surface-800"
              >
                Back
              </button>
              <button
                onClick={handleAuthorize}
                disabled={isAuthorizing}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-md shadow-brand-500/20 transition-all disabled:opacity-50"
              >
                {isAuthorizing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                <span>{isAuthorizing ? 'Authorizing & Syncing...' : 'Authorize & Sync Account'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success & AI Ready */}
        {step === 3 && (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-surface-900 dark:text-surface-100">
                Email Connected & Synced!
              </h3>
              <p className="text-xs text-surface-400 max-w-xs mx-auto">
                Initial synchronization complete. AuraMail has categorized conversations into Assistant to Reply, Client to Reply, and No Reply Needed.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-surface-50 dark:bg-surface-800/80 text-left border border-surface-200 dark:border-surface-700 space-y-2">
              <div className="text-[11px] font-bold text-surface-500 uppercase">
                Active AI Rules Applied
              </div>
              <div className="flex items-center space-x-2 text-xs text-surface-700 dark:text-surface-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Autonomous scheduling enabled for meetings &lt; 45 mins</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-surface-700 dark:text-surface-200">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Contracts &gt; $50k auto-escalated to Client VIP view</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleFinish}
                className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-md shadow-brand-500/20 transition-all"
              >
                Enter Assistant Dashboard
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
