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
  Bell,
  Keyboard,
  Sliders,
  ShieldCheck,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import NotificationCenter from './NotificationCenter';
import UserProfileMenu from './UserProfileMenu';

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
  onOpenShortcuts,
  onSimulateEmail,
  isSyncing,
  accountsCount,
  notifications = [],
  onMarkAllNotificationsRead,
  onSelectNotification,
  onLogout
}) {
  const [showSimulateMenu, setShowSimulateMenu] = useState(false);
  const [showClientMenu, setShowClientMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeClient = clients.find(c => c.id === activeClientId);
  const unreadNotificationsCount = notifications.filter(n => n.unread).length;

  return (
    <>
      {/* Floating Island Header with generous top spacing */}
      <header className="sticky top-0 z-30 pt-3 sm:pt-4 px-4 sm:px-8 lg:px-10 max-w-[1720px] mx-auto w-full transition-all">
        <div className="w-full h-16 sm:h-18 px-4 sm:px-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-surface-900/75 backdrop-blur-2xl border border-surface-200/90 dark:border-white/[0.09] shadow-card flex items-center justify-between gap-3">
          
          {/* Brand / Logo */}
          <div className="flex items-center space-x-3.5 shrink-0">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 via-indigo-500 to-cyan-500 rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition duration-500 group-hover:scale-105" />
              <img
                src="/favicon.svg"
                alt="AuraMail AI Logo"
                className="relative w-10 h-10 object-contain rounded-2xl shadow-glow-brand ring-1 ring-white/20 transition-transform group-hover:scale-105"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-lg tracking-tight bg-gradient-to-r from-surface-900 via-brand-600 to-indigo-600 dark:from-white dark:via-brand-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  AuraMail Copilot
                </span>
                <span className="hidden sm:inline-flex text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800 shadow-sm">
                  Executive Suite
                </span>
              </div>
              <p className="text-[11px] text-surface-500 dark:text-surface-400 hidden sm:block font-medium">
                Intelligent Email Triage & Client Delegation
              </p>
            </div>
          </div>

          {/* Middle: Client Selector (Desktop / Tablet) */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowClientMenu(!showClientMenu)}
              className="flex items-center space-x-2.5 px-3.5 py-2 rounded-2xl bg-surface-100/80 hover:bg-surface-200/80 dark:bg-surface-800/80 dark:hover:bg-surface-700/80 border border-surface-200/80 dark:border-white/[0.08] transition-all text-xs font-semibold"
            >
              {activeClient ? (
                <>
                  <img
                    src={activeClient.avatar}
                    alt={activeClient.name}
                    className="w-5 h-5 rounded-full object-cover ring-1 ring-brand-500/40"
                  />
                  <span className="max-w-[120px] lg:max-w-[160px] truncate text-surface-900 dark:text-surface-100 font-bold">
                    {activeClient.name}
                  </span>
                  <span className="text-surface-400 dark:text-surface-500 text-[11px] hidden xl:inline">
                    ({activeClient.company})
                  </span>
                </>
              ) : (
                <>
                  <div className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center text-[10px] font-black">
                    ALL
                  </div>
                  <span className="text-surface-900 dark:text-surface-100 font-bold">
                    All Clients Inbox
                  </span>
                </>
              )}
              <ChevronDown className="w-3.5 h-3.5 text-surface-400 ml-1" />
            </button>

            {/* Client Dropdown Menu */}
            {showClientMenu && (
              <div
                className="absolute left-0 mt-2 w-68 bg-white dark:bg-surface-800 rounded-2xl shadow-modal border border-surface-200 dark:border-surface-700 py-2 z-50 animate-slide-up"
                onMouseLeave={() => setShowClientMenu(false)}
              >
                <div className="px-3.5 py-1 text-[11px] font-black text-surface-400 uppercase tracking-widest">
                  Select Client Workspace
                </div>
                <button
                  onClick={() => {
                    onSelectClient('all');
                    setShowClientMenu(false);
                  }}
                  className={`w-full flex items-center space-x-2.5 px-3.5 py-2 text-xs text-left hover:bg-surface-100 dark:hover:bg-surface-700/70 transition-colors ${
                    activeClientId === 'all' ? 'bg-brand-50 dark:bg-brand-950/60 font-bold text-brand-600 dark:text-brand-400' : 'text-surface-700 dark:text-surface-300'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center text-[10px] font-black">
                    ALL
                  </div>
                  <div className="flex-1 truncate">
                    <div className="font-bold">All Clients Aggregated</div>
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
                    className={`w-full flex items-center space-x-2.5 px-3.5 py-2 text-xs text-left hover:bg-surface-100 dark:hover:bg-surface-700/70 transition-colors ${
                      activeClientId === client.id ? 'bg-brand-50 dark:bg-brand-950/60 font-bold text-brand-600 dark:text-brand-400' : 'text-surface-700 dark:text-surface-300'
                    }`}
                  >
                    <img
                      src={client.avatar}
                      alt={client.name}
                      className="w-6 h-6 rounded-full object-cover ring-1 ring-brand-500/20"
                    />
                    <div className="flex-1 truncate">
                      <div className="font-bold text-surface-900 dark:text-surface-100">{client.name}</div>
                      <div className="text-[10px] text-surface-400">{client.role} • {client.company}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Actions: Dual View Toggle, Inflow, Copilot, Bell, Theme, Avatar */}
          <div className="hidden lg:flex items-center space-x-2.5">
            
            {/* Dual View Toggle: Assistant vs Client View */}
            <div className="bg-surface-100/90 dark:bg-surface-800/90 p-1 rounded-2xl flex items-center border border-surface-200/80 dark:border-white/[0.08]">
              <button
                onClick={() => onToggleViewMode('assistant')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'assistant'
                    ? 'bg-white dark:bg-surface-700 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-surface-600 dark:text-surface-400 hover:text-surface-900'
                }`}
                title="Full Assistant Triage Dashboard"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Assistant View</span>
              </button>
              <button
                onClick={() => onToggleViewMode('client')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'client'
                    ? 'bg-white dark:bg-surface-700 text-amber-600 dark:text-amber-400 shadow-sm'
                    : 'text-surface-600 dark:text-surface-400 hover:text-surface-900'
                }`}
                title="Minimalist Client-Facing VIP Portal"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Client Portal</span>
              </button>
            </div>

            {/* Sync Status Pill */}
            <button
              onClick={onOpenAccountsModal}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-2xl bg-surface-100/80 hover:bg-surface-200/80 dark:bg-surface-800/80 dark:hover:bg-surface-700/80 border border-surface-200/80 dark:border-white/[0.08] text-xs font-bold transition-colors"
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

            {/* Simulate New Incoming Email */}
            <div className="relative">
              <button
                onClick={() => setShowSimulateMenu(!showSimulateMenu)}
                className="btn-shimmer flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-700 dark:text-brand-300 border border-brand-500/30 text-xs font-black transition-all shadow-sm"
                title="Test Real-time AI Email Inflow"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Simulate Inflow</span>
                <ChevronDown className="w-3 h-3 ml-0.5" />
              </button>

              {showSimulateMenu && (
                <div
                  className="absolute right-0 mt-2 w-68 bg-white dark:bg-surface-800 rounded-2xl shadow-modal border border-surface-200 dark:border-surface-700 py-2 z-50 animate-slide-up"
                  onMouseLeave={() => setShowSimulateMenu(false)}
                >
                  <div className="px-3.5 py-1 text-[11px] font-black text-surface-400 uppercase tracking-widest">
                    Simulate Incoming Email
                  </div>
                  <button
                    onClick={() => {
                      onSimulateEmail('scheduling');
                      setShowSimulateMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2.5 text-xs hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                  >
                    <div className="font-bold text-brand-600 dark:text-brand-400">📅 Meeting Request (Assistant)</div>
                    <div className="text-[11px] text-surface-500">Founders Fund technical diligence</div>
                  </button>
                  <button
                    onClick={() => {
                      onSimulateEmail('client_urgent');
                      setShowSimulateMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2.5 text-xs hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                  >
                    <div className="font-bold text-amber-600 dark:text-amber-400">🚨 Acquisition Offer (Client VIP)</div>
                    <div className="text-[11px] text-surface-500">Corp Dev $85M buyout term sheet</div>
                  </button>
                  <button
                    onClick={() => {
                      onSimulateEmail('automated');
                      setShowSimulateMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2.5 text-xs hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                  >
                    <div className="font-bold text-slate-500 dark:text-slate-400">💤 Automated Alert (No Reply)</div>
                    <div className="text-[11px] text-surface-500">GitHub Security dependabot resolved</div>
                  </button>
                </div>
              )}
            </div>

            {/* Ask AI Copilot Button */}
            <button
              onClick={onOpenCopilot}
              className="btn-shimmer flex items-center space-x-1.5 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-black shadow-glow-brand transition-all hover:scale-105"
              title="Open AI Inbox Assistant Chat"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask Copilot</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-2xl text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                title="Recent Activity & Notifications"
              >
                <Bell className="w-4.5 h-4.5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 ring-2 ring-white dark:ring-surface-900"></span>
                  </span>
                )}
              </button>

              <NotificationCenter
                isOpen={showNotifications}
                onClose={() => setShowNotifications(false)}
                notifications={notifications}
                onMarkAllRead={onMarkAllNotificationsRead}
                onSelectNotification={onSelectNotification}
              />
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-2xl text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              title="Toggle Dark / Light Theme"
            >
              {darkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-surface-600" />}
            </button>

            {/* Assistant Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-1.5 pl-1.5 pr-1 py-1 rounded-2xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                title="Assistant Profile & Settings"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Assistant Avatar"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/40"
                />
                <ChevronDown className="w-3 h-3 text-surface-400" />
              </button>

              <UserProfileMenu
                isOpen={showProfileMenu}
                onClose={() => setShowProfileMenu(false)}
                onOpenShortcuts={onOpenShortcuts}
                onOpenAccounts={onOpenAccountsModal}
                onOpenOnboarding={onOpenOnboarding}
                onLogout={onLogout}
              />
            </div>

          </div>

          {/* Mobile & Tablet Hamburger Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            
            {/* Quick Copilot button on mobile */}
            <button
              onClick={onOpenCopilot}
              className="p-2 rounded-xl bg-brand-600 text-white shadow-sm"
              title="Ask AI Copilot"
            >
              <Sparkles className="w-4 h-4" />
            </button>

            {/* Dark mode on mobile */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:hover:bg-surface-700 text-surface-800 dark:text-surface-100 transition-colors"
              title="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile & Tablet Full Navigation Drawer / Sheet */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-surface-950/80 backdrop-blur-md animate-fade-in p-4 overflow-y-auto">
          <div className="bg-white dark:bg-surface-900 rounded-3xl border border-surface-200 dark:border-white/10 shadow-modal p-6 space-y-6 max-w-lg mx-auto animate-scale-up">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-surface-100 dark:border-surface-800">
              <div className="flex items-center space-x-3">
                <img src="/favicon.svg" alt="AuraMail Copilot" className="w-9 h-9 rounded-2xl" />
                <div>
                  <h3 className="text-sm font-black text-surface-900 dark:text-white">AuraMail Copilot</h3>
                  <p className="text-[11px] text-surface-400">Mobile Control Center</p>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-surface-100 dark:bg-surface-800 text-surface-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Client Workspace Picker */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-surface-400 uppercase tracking-widest">
                Active Client Workspace
              </label>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => {
                    onSelectClient('all');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-2xl text-left border text-xs font-bold transition-all ${
                    activeClientId === 'all' ? 'bg-brand-500 text-white border-brand-500 shadow-sm' : 'bg-surface-50 dark:bg-surface-800 border-surface-200 dark:border-white/5'
                  }`}
                >
                  <span>All Clients Aggregated</span>
                </button>
                {clients.map(client => (
                  <button
                    key={client.id}
                    onClick={() => {
                      onSelectClient(client.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 p-3 rounded-2xl text-left border text-xs font-bold transition-all ${
                      activeClientId === client.id ? 'bg-brand-500 text-white border-brand-500 shadow-sm' : 'bg-surface-50 dark:bg-surface-800 border-surface-200 dark:border-white/5'
                    }`}
                  >
                    <img src={client.avatar} alt={client.name} className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <div>{client.name}</div>
                      <div className="text-[10px] opacity-75 font-normal">{client.role} • {client.company}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode Switcher */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-surface-400 uppercase tracking-widest">
                Select View Experience
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onToggleViewMode('assistant');
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 rounded-2xl text-xs font-bold border text-center transition-all ${
                    viewMode === 'assistant'
                      ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                      : 'bg-surface-50 dark:bg-surface-800 text-surface-700 dark:text-surface-300 border-surface-200 dark:border-white/5'
                  }`}
                >
                  ⚡ Assistant View
                </button>
                <button
                  onClick={() => {
                    onToggleViewMode('client');
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 rounded-2xl text-xs font-bold border text-center transition-all ${
                    viewMode === 'client'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                      : 'bg-surface-50 dark:bg-surface-800 text-surface-700 dark:text-surface-300 border-surface-200 dark:border-white/5'
                  }`}
                >
                  👤 Client Portal
                </button>
              </div>
            </div>

            {/* Simulate Email Options */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-surface-400 uppercase tracking-widest">
                Simulate Inflow Demo
              </label>
              <div className="space-y-1.5">
                <button
                  onClick={() => {
                    onSimulateEmail('scheduling');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left p-3 rounded-2xl bg-surface-50 dark:bg-surface-800/80 border border-surface-200 dark:border-white/5 text-xs font-bold text-brand-600 dark:text-brand-400"
                >
                  📅 Meeting Request (Assistant)
                </button>
                <button
                  onClick={() => {
                    onSimulateEmail('client_urgent');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left p-3 rounded-2xl bg-surface-50 dark:bg-surface-800/80 border border-surface-200 dark:border-white/5 text-xs font-bold text-amber-600 dark:text-amber-400"
                >
                  🚨 Acquisition Offer (Client VIP)
                </button>
                <button
                  onClick={() => {
                    onSimulateEmail('automated');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left p-3 rounded-2xl bg-surface-50 dark:bg-surface-800/80 border border-surface-200 dark:border-white/5 text-xs font-bold text-slate-500 dark:text-slate-400"
                >
                  💤 Automated Alert (No Reply)
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2 pt-2 border-t border-surface-100 dark:border-surface-800">
              <button
                onClick={() => {
                  onOpenCopilot();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 p-3 rounded-2xl bg-brand-600 text-white font-bold text-xs shadow-glow-brand"
              >
                <Sparkles className="w-4 h-4" />
                <span>Open AI Copilot Chat</span>
              </button>

              <button
                onClick={() => {
                  onOpenAccountsModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 p-3 rounded-2xl bg-surface-100 dark:bg-surface-800 font-bold text-xs text-surface-700 dark:text-surface-300"
              >
                <Mail className="w-4 h-4 text-brand-500" />
                <span>Connected Email Accounts</span>
              </button>

              <button
                onClick={() => {
                  onOpenShortcuts();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 p-3 rounded-2xl bg-surface-100 dark:bg-surface-800 font-bold text-xs text-surface-700 dark:text-surface-300"
              >
                <Keyboard className="w-4 h-4 text-purple-500" />
                <span>Keyboard Shortcuts Cheat Sheet</span>
              </button>

              {onLogout && (
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold text-xs"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Sign Out Workspace</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
