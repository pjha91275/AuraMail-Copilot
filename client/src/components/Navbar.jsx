import React, { useState } from 'react';
import {
  Sparkles,
  Inbox,
  UserCheck,
  RefreshCw,
  PlusCircle,
  Sun,
  Moon,
  ChevronDown,
  Mail,
  Zap,
  CheckCircle,
  HelpCircle,
  Sliders,
  ShieldCheck
} from 'lucide-react';

export default function Navbar({
  clients,
  activeClientId,
  onSelectClient,
  viewMode,
  onToggleViewMode,
  darkMode,
  onToggleDarkMode,
  onOpenCopilot,
  onOpenAccountsModal,
  onOpenOnboarding,
  onSimulateEmail,
  isSyncing,
  accountsCount
}) {
  const [showSimulateMenu, setShowSimulateMenu] = useState(false);
  const [showClientMenu, setShowClientMenu] = useState(false);

  const activeClient = clients.find(c => c.id === activeClientId);

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-indigo-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-surface-900 via-brand-600 to-surface-700 dark:from-white dark:via-brand-400 dark:to-surface-300 bg-clip-text text-transparent">
                AuraMail AI
              </span>
              <span className="hidden sm:inline-flex text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                Assistant Co-Pilot
              </span>
            </div>
            <p className="text-[11px] text-surface-500 dark:text-surface-400 hidden sm:block">
              Intelligent Email Triage & Client Delegation
            </p>
          </div>
        </div>

        {/* Middle: Client Selector */}
        <div className="relative">
          <button
            onClick={() => setShowClientMenu(!showClientMenu)}
            className="flex items-center space-x-2.5 px-3 py-1.5 rounded-xl bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:hover:bg-surface-700 border border-surface-200/80 dark:border-surface-700/80 transition-all text-xs font-medium"
          >
            {activeClient ? (
              <>
                <img
                  src={activeClient.avatar}
                  alt={activeClient.name}
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-brand-500/30"
                />
                <span className="max-w-[120px] sm:max-w-[160px] truncate text-surface-900 dark:text-surface-100 font-semibold">
                  {activeClient.name}
                </span>
                <span className="text-surface-400 dark:text-surface-500 text-[11px] hidden md:inline">
                  ({activeClient.company})
                </span>
              </>
            ) : (
              <>
                <div className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center text-[10px] font-bold">
                  All
                </div>
                <span className="text-surface-900 dark:text-surface-100 font-semibold">
                  All Clients Inbox
                </span>
              </>
            )}
            <ChevronDown className="w-3.5 h-3.5 text-surface-400 ml-1" />
          </button>

          {/* Client Dropdown Menu */}
          {showClientMenu && (
            <div
              className="absolute left-0 mt-2 w-64 bg-white dark:bg-surface-800 rounded-xl shadow-modal border border-surface-200 dark:border-surface-700 py-1.5 z-50 animate-slide-up"
              onMouseLeave={() => setShowClientMenu(false)}
            >
              <div className="px-3 py-1 text-[11px] font-semibold text-surface-400 uppercase tracking-wider">
                Select Client Workspace
              </div>
              <button
                onClick={() => {
                  onSelectClient('all');
                  setShowClientMenu(false);
                }}
                className={`w-full flex items-center space-x-2 px-3 py-2 text-xs text-left hover:bg-surface-100 dark:hover:bg-surface-700/70 transition-colors ${
                  activeClientId === 'all' ? 'bg-brand-50 dark:bg-brand-950/60 font-semibold text-brand-600 dark:text-brand-400' : 'text-surface-700 dark:text-surface-300'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center text-[10px] font-bold">
                  ALL
                </div>
                <div className="flex-1 truncate">
                  <div className="font-medium">All Clients Aggregated</div>
                  <div className="text-[10px] text-surface-400">Unified inbox overview</div>
                </div>
              </button>
              
              <div className="h-px bg-surface-100 dark:bg-surface-700 my-1"></div>

              {clients.map(client => (
                <button
                  key={client.id}
                  onClick={() => {
                    onSelectClient(client.id);
                    setShowClientMenu(false);
                  }}
                  className={`w-full flex items-center space-x-2.5 px-3 py-2 text-xs text-left hover:bg-surface-100 dark:hover:bg-surface-700/70 transition-colors ${
                    activeClientId === client.id ? 'bg-brand-50 dark:bg-brand-950/60 font-semibold text-brand-600 dark:text-brand-400' : 'text-surface-700 dark:text-surface-300'
                  }`}
                >
                  <img
                    src={client.avatar}
                    alt={client.name}
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-brand-500/20"
                  />
                  <div className="flex-1 truncate">
                    <div className="font-medium text-surface-900 dark:text-surface-100">{client.name}</div>
                    <div className="text-[10px] text-surface-400">{client.role} • {client.company}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Actions & View Switcher */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Dual View Toggle: Assistant vs Client View */}
          <div className="bg-surface-100 dark:bg-surface-800 p-1 rounded-xl flex items-center border border-surface-200/80 dark:border-surface-700/80">
            <button
              onClick={() => onToggleViewMode('assistant')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'assistant'
                  ? 'bg-white dark:bg-surface-700 text-brand-600 dark:text-brand-400 shadow-subtle'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900'
              }`}
              title="Full Assistant Triage Dashboard"
            >
              <Zap className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Assistant View</span>
            </button>
            <button
              onClick={() => onToggleViewMode('client')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'client'
                  ? 'bg-white dark:bg-surface-700 text-amber-600 dark:text-amber-400 shadow-subtle'
                  : 'text-surface-600 dark:text-surface-400 hover:text-surface-900'
              }`}
              title="Minimalist Client-Facing VIP Portal"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Client Portal</span>
            </button>
          </div>

          {/* Sync & Accounts Pill */}
          <button
            onClick={onOpenAccountsModal}
            className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:hover:bg-surface-700 border border-surface-200/80 dark:border-surface-700/80 text-xs font-medium transition-colors"
            title="Connected Email Accounts & Sync Status"
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSyncing ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isSyncing ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
            </span>
            <span className="text-surface-600 dark:text-surface-300">
              {isSyncing ? 'Syncing...' : 'Connected'}
            </span>
          </button>

          {/* Simulate New Incoming Email (Quick AI Test) */}
          <div className="relative">
            <button
              onClick={() => setShowSimulateMenu(!showSimulateMenu)}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/70 dark:hover:bg-brand-900/80 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 text-xs font-semibold transition-all"
              title="Test Real-time AI Email Inflow"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Simulate Inflow</span>
              <ChevronDown className="w-3 h-3 ml-0.5" />
            </button>

            {showSimulateMenu && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white dark:bg-surface-800 rounded-xl shadow-modal border border-surface-200 dark:border-surface-700 py-1.5 z-50 animate-slide-up"
                onMouseLeave={() => setShowSimulateMenu(false)}
              >
                <div className="px-3 py-1 text-[11px] font-semibold text-surface-400 uppercase tracking-wider">
                  Simulate New Incoming Email
                </div>
                <button
                  onClick={() => {
                    onSimulateEmail('scheduling');
                    setShowSimulateMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                >
                  <div className="font-semibold text-brand-600 dark:text-brand-400">📅 Meeting Request (Assistant)</div>
                  <div className="text-[11px] text-surface-500">Founders Fund technical diligence</div>
                </button>
                <button
                  onClick={() => {
                    onSimulateEmail('client_urgent');
                    setShowSimulateMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                >
                  <div className="font-semibold text-amber-600 dark:text-amber-400">🚨 Acquisition Offer (Client VIP)</div>
                  <div className="text-[11px] text-surface-500">Corp Dev $85M buyout term sheet</div>
                </button>
                <button
                  onClick={() => {
                    onSimulateEmail('automated');
                    setShowSimulateMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                >
                  <div className="font-semibold text-slate-500 dark:text-slate-400">💤 Automated Alert (No Reply)</div>
                  <div className="text-[11px] text-surface-500">GitHub Security dependabot resolved</div>
                </button>
              </div>
            )}
          </div>

          {/* Ask AI Copilot Button */}
          <button
            onClick={onOpenCopilot}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white text-xs font-semibold shadow-sm transition-all shadow-brand-500/20"
            title="Open AI Inbox Assistant Chat"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask Copilot</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
            title="Toggle Dark / Light Theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-surface-600" />}
          </button>

          {/* Quick Onboarding / Tour */}
          <button
            onClick={onOpenOnboarding}
            className="p-2 rounded-xl text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
            title="Restart Onboarding & Setup"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
