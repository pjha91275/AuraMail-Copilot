import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatsStrip from './components/StatsStrip';
import Sidebar from './components/Sidebar';
import EmailList from './components/EmailList';
import EmailDetail from './components/EmailDetail';
import ClientPortal from './components/ClientPortal';
import AiCopilotDrawer from './components/AiCopilotDrawer';
import OnboardingModal from './components/OnboardingModal';
import AccountsModal from './components/AccountsModal';
import ShortcutsModal from './components/ShortcutsModal';
import Toast from './components/Toast';
import AuthPage from './components/AuthPage';
import DynamicBackgroundLogos from './components/DynamicBackgroundLogos';

import {
  fetchClients,
  fetchAccounts,
  fetchEmails,
  updateClassification,
  updateEmailStatus,
  handleClientAction,
  updateDraftReply,
  simulateIncomingEmail,
  syncAccount,
  addAccount,
  askCopilot,
  generateAiDraft
} from './services/api';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('auramail_theme') === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Authentication State (Shows Auth Page first as requested)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('auramail_auth') === 'true';
  });

  // Current Authenticated User (Personalized for logged-in Google Workspace account)
  const [currentUser, setCurrentUser] = useState(() => {
    const email = localStorage.getItem('auramail_user_email') || 'pjha91275@gmail.com';
    const isPrince = email.toLowerCase().includes('pjha');
    const name = localStorage.getItem('auramail_user_name') || (isPrince ? 'Prince Jha' : 'Alex Vance');
    const avatar = localStorage.getItem('auramail_user_avatar') || (isPrince ? '/prince-jha.jpg' : '/alex-vance.jpg');
    const role = localStorage.getItem('auramail_user_role') || (isPrince ? 'client' : 'assistant');
    return { name, email, avatar, role };
  });

  // Core Data
  const [clients, setClients] = useState([]);
  const [activeClientId, setActiveClientId] = useState('client-1'); // Sarah Jenkins by default
  const [accounts, setAccounts] = useState([]);
  const [emails, setEmails] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);

  // Filters & Navigation
  const [viewMode, setViewMode] = useState('assistant'); // 'assistant' | 'client'
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState(null);
  const [unreadOnly, setUnreadOnly] = useState(false);

  // UI Modals & Drawers
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isAccountsModalOpen, setIsAccountsModalOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Live Notifications Activity Stream
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: '🚨 Fiduciary Sign-Off Required',
      description: 'Series B Term Sheet & Wire Authorization assigned to Sarah Jenkins.',
      time: '12m ago',
      type: 'client',
      unread: true,
      emailId: 'em-1'
    },
    {
      id: 'notif-2',
      title: '📅 Meeting Reschedule Request',
      description: 'Lead director Richard Cole requested moving Board Strategy Session to Friday 10 AM.',
      time: '45m ago',
      type: 'calendar',
      unread: true,
      emailId: 'em-2'
    },
    {
      id: 'notif-3',
      title: '⚡ Autonomous Triage Run',
      description: 'AI classified 8 new incoming emails across TechFlow and Horizon accounts.',
      time: '1h ago',
      type: 'triage',
      unread: false,
      emailId: null
    }
  ]);

  // Toast Helper
  const pushToast = useCallback(({ title, message, type = 'info' }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Authentication Handlers
  const handleLogin = useCallback(async ({ email, role, viewMode: initialViewMode, name, avatar, clientId }) => {
    setIsAuthenticated(true);
    localStorage.setItem('auramail_auth', 'true');
    localStorage.setItem('auramail_user_email', email);
    if (name) localStorage.setItem('auramail_user_name', name);
    if (avatar) localStorage.setItem('auramail_user_avatar', avatar);
    if (role) localStorage.setItem('auramail_user_role', role);

    const isPrince = email.toLowerCase().includes('pjha') || (name && name.toLowerCase().includes('prince'));
    const resolvedName = name || (isPrince ? 'Prince Jha' : email.split('@')[0]);
    const resolvedRole = role || (isPrince ? 'client' : 'assistant');
    const resolvedAvatar = isPrince ? '/prince-jha.jpg' : (avatar || (email.toLowerCase().includes('alex') ? '/alex-vance.jpg' : '/prince-jha.jpg'));

    setCurrentUser({
      name: resolvedName,
      email,
      avatar: resolvedAvatar,
      role: resolvedRole
    });

    if (initialViewMode) setViewMode(initialViewMode);

    // Refresh client list & account list immediately to load connected Gmail dashboard
    try {
      const clientList = await fetchClients();
      if (clientList && clientList.length > 0) {
        setClients(clientList);
        const matched = clientList.find(c => c.email && c.email.toLowerCase() === email.toLowerCase());
        const targetId = clientId || matched?.id || clientList[0].id;
        setActiveClientId(targetId);
        const accountList = await fetchAccounts(targetId);
        setAccounts(accountList);
      }
    } catch (e) {
      console.warn('Error refreshing clients after login:', e);
    }

    pushToast({
      title: 'Google Workspace Active',
      message: `Signed in as ${name || email} (${role === 'client' ? 'Client / CEO' : 'Executive Assistant'})`,
      type: 'success'
    });
  }, [pushToast]);

  // Handle Google OAuth callback redirect parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('auth') === 'success') {
      const email = params.get('email');
      const name = params.get('name');
      const clientId = params.get('clientId');
      const role = params.get('role') || 'client';
      const avatar = params.get('avatar');
      handleLogin({
        email,
        name,
        clientId,
        role,
        avatar,
        viewMode: role === 'client' ? 'client' : 'assistant'
      });
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (params.get('auth') === 'error') {
      pushToast({
        title: 'Authentication Error',
        message: params.get('message') || 'Could not complete Google Workspace authentication.',
        type: 'error'
      });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [handleLogin, pushToast]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('auramail_auth');
    pushToast({
      title: 'Signed Out',
      message: 'You have returned to the sign-in screen.',
      type: 'info'
    });
  };

  // Sync dark mode class on <html> and <body>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('auramail_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('auramail_theme', 'light');
    }
  }, [darkMode]);

  // Initial Load: Clients and Accounts
  useEffect(() => {
    const loadInit = async () => {
      try {
        const clientList = await fetchClients();
        setClients(clientList);
        if (clientList.length > 0 && !activeClientId) {
          setActiveClientId(clientList[0].id);
        }

        const accountList = await fetchAccounts(activeClientId);
        setAccounts(accountList);
      } catch (err) {
        console.error('Failed to load initial metadata:', err);
      }
    };
    loadInit();
  }, []);

  // Fetch Emails when filters change
  const loadEmails = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetchEmails({
        clientId: activeClientId,
        category: activeCategory,
        search: searchQuery,
        urgency: urgencyFilter,
        unreadOnly
      });

      if (res.success) {
        setEmails(res.data);
        setStats(res.stats);

        // Keep or select first email
        if (res.data.length > 0) {
          if (!selectedEmail || !res.data.some(e => e.id === selectedEmail.id)) {
            setSelectedEmail(res.data[0]);
          } else {
            const fresh = res.data.find(e => e.id === selectedEmail.id);
            if (fresh) setSelectedEmail(fresh);
          }
        } else {
          setSelectedEmail(null);
        }
      }
    } catch (err) {
      console.error('Error loading emails:', err);
      pushToast({
        title: 'Connection Issue',
        message: 'Could not fetch emails. Using cached data.',
        type: 'warning'
      });
    } finally {
      setIsLoading(false);
    }
  }, [activeClientId, activeCategory, searchQuery, urgencyFilter, unreadOnly, pushToast]);

  useEffect(() => {
    loadEmails();
  }, [loadEmails]);

  // Handle Client Switch
  const handleSelectClient = (clientId) => {
    setActiveClientId(clientId);
    const client = clients.find(c => c.id === clientId);
    pushToast({
      title: 'Workspace Switched',
      message: client ? `Switched active inbox to ${client.name} (${client.company})` : 'Viewing aggregated inbox across all clients',
      type: 'info'
    });
  };

  // Handle Classification Override (Assistant)
  const handleUpdateClassification = async (emailId, newType) => {
    try {
      // Optimistic update
      setEmails(prev => prev.map(e => {
        if (e.id === emailId) {
          return {
            ...e,
            classification: {
              ...e.classification,
              type: newType,
              manualOverride: true,
              reason: `Manually classified as ${newType} by Assistant`
            }
          };
        }
        return e;
      }));

      if (selectedEmail?.id === emailId) {
        setSelectedEmail(prev => ({
          ...prev,
          classification: {
            ...prev.classification,
            type: newType,
            manualOverride: true,
            reason: `Manually classified as ${newType} by Assistant`
          }
        }));
      }

      await updateClassification(emailId, { type: newType });
      pushToast({
        title: 'Classification Updated',
        message: `Email re-assigned to "${newType}". Synchronized across dashboards.`,
        type: 'success'
      });
      loadEmails();
    } catch (err) {
      pushToast({ title: 'Error', message: 'Failed to update classification', type: 'error' });
    }
  };

  // Toggle Star
  const handleToggleStar = async (emailId, starred) => {
    setEmails(prev => prev.map(e => e.id === emailId ? { ...e, starred } : e));
    if (selectedEmail?.id === emailId) setSelectedEmail(prev => ({ ...prev, starred }));
    await updateEmailStatus(emailId, { starred });
  };

  // Toggle Read
  const handleToggleRead = async (emailId, unread) => {
    setEmails(prev => prev.map(e => e.id === emailId ? { ...e, unread } : e));
    if (selectedEmail?.id === emailId) setSelectedEmail(prev => ({ ...prev, unread }));
    await updateEmailStatus(emailId, { unread });
  };

  // Archive
  const handleArchive = async (emailId) => {
    setEmails(prev => prev.filter(e => e.id !== emailId));
    if (selectedEmail?.id === emailId) setSelectedEmail(null);
    await updateEmailStatus(emailId, { archived: true });
    pushToast({ title: 'Archived', message: 'Conversation moved to archive.', type: 'info' });
  };

  // Client Action (Mark handled or Delegate back to assistant)
  const handleClientActionSubmit = async (emailId, { action, note }) => {
    try {
      const res = await handleClientAction(emailId, { action, note });
      if (res.success) {
        pushToast({
          title: action === 'mark_handled' ? 'Marked Handled' : 'Delegated to Assistant',
          message: action === 'mark_handled'
            ? 'Matter resolved and marked complete.'
            : `Instructions forwarded to Assistant Alex: "${note}"`,
          type: 'success'
        });
        loadEmails();
      }
    } catch (err) {
      pushToast({ title: 'Error', message: 'Could not process client action', type: 'error' });
    }
  };

  // Send Reply
  const handleSendReply = async (emailId, content, tone) => {
    try {
      const res = await updateDraftReply(emailId, { content, tone, status: 'sent' });
      if (res.success) {
        pushToast({
          title: 'Reply Sent Successfully!',
          message: 'Your reply has been delivered and thread marked resolved.',
          type: 'success'
        });
        loadEmails();
      }
    } catch (err) {
      pushToast({ title: 'Error', message: 'Failed to send reply', type: 'error' });
    }
  };

  // Save Draft
  const handleSaveDraft = async (emailId, content, tone) => {
    try {
      await updateDraftReply(emailId, { content, tone, status: 'draft' });
      pushToast({
        title: 'Draft Saved',
        message: 'Reply draft saved for review.',
        type: 'info'
      });
      loadEmails();
    } catch (err) {
      pushToast({ title: 'Error', message: 'Failed to save draft', type: 'error' });
    }
  };

  // Simulate Incoming Email
  const handleSimulateEmail = async (scenario) => {
    try {
      setIsSyncing(true);
      const res = await simulateIncomingEmail({
        clientId: activeClientId === 'all' ? 'client-1' : activeClientId,
        scenario
      });
      if (res.success) {
        pushToast({
          title: '⚡ New Email Received & Classified',
          message: `"${res.data.subject}" classified as [${res.data.classification.type}] (${Math.round(res.data.classification.confidence * 100)}% confidence)`,
          type: 'success'
        });
        loadEmails();
        setSelectedEmail(res.data);
      }
    } catch (err) {
      pushToast({ title: 'Error', message: 'Simulation failed', type: 'error' });
    } finally {
      setTimeout(() => setIsSyncing(false), 600);
    }
  };

  // Sync Account
  const handleSyncAccount = async (accId) => {
    setIsSyncing(true);
    try {
      await syncAccount(accId);
      pushToast({
        title: 'Sync Complete',
        message: 'Mailbox accounts successfully refreshed with latest threads.',
        type: 'success'
      });
      loadEmails();
    } finally {
      setIsSyncing(false);
    }
  };

  // Add Account
  const handleAddAccount = async (accountData) => {
    try {
      const res = await addAccount(accountData);
      if (res.success) {
        setAccounts(prev => [...prev, res.data]);
        pushToast({
          title: 'Account Connected',
          message: `${accountData.emailAddress} is now actively syncing.`,
          type: 'success'
        });
      }
    } catch (err) {
      pushToast({ title: 'Error', message: 'Failed to connect account', type: 'error' });
    }
  };

  // Copilot Query
  const handleAskCopilot = async (queryText) => {
    try {
      const res = await askCopilot({ query: queryText, clientId: activeClientId });
      if (res.success) return res.data;
    } catch (err) {
      return { answer: 'I encountered an error querying the inbox. Please try again.', highlightedEmails: [] };
    }
  };

  // Reset Data
  const handleResetData = () => {
    loadEmails();
    pushToast({
      title: 'Data Refreshed',
      message: 'Demo email threads restored.',
      type: 'info'
    });
  };

  // Keyboard Shortcuts (j/k navigation, s to star, e to archive, c for copilot, esc to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is actively typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        return;
      }

      if (e.key === 'Escape') {
        setIsCopilotOpen(false);
        setIsAccountsModalOpen(false);
        setIsOnboardingOpen(false);
        setIsShortcutsOpen(false);
        setIsMobileDetailOpen(false);
      } else if (e.key === '?') {
        e.preventDefault();
        setIsShortcutsOpen(prev => !prev);
      } else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        setIsCopilotOpen(prev => !prev);
      } else if (e.key === '1') {
        setViewMode('assistant');
      } else if (e.key === '2') {
        setViewMode('client');
      } else if (emails.length > 0) {
        const currentIndex = emails.findIndex(item => item.id === selectedEmail?.id);

        if (e.key === 'j' || e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % emails.length;
          setSelectedEmail(emails[nextIndex]);
        } else if (e.key === 'k' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = (currentIndex - 1 + emails.length) % emails.length;
          setSelectedEmail(emails[prevIndex]);
        } else if ((e.key === 's' || e.key === 'S') && selectedEmail) {
          e.preventDefault();
          handleToggleStar(selectedEmail.id, !selectedEmail.starred);
        } else if ((e.key === 'e' || e.key === 'E') && selectedEmail) {
          e.preventDefault();
          handleArchive(selectedEmail.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [emails, selectedEmail, handleToggleStar, handleArchive]);

  const activeClient = clients.find(c => c.id === activeClientId);

  // If not authenticated, render the dedicated Split-Screen Authentication Page
  if (!isAuthenticated) {
    return (
      <>
        <Toast toasts={toasts} onDismiss={dismissToast} />
        <AuthPage
          onLogin={handleLogin}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-[#03060f] text-surface-900 dark:text-surface-100 flex flex-col font-sans transition-colors duration-300 relative overflow-x-hidden">
      
      {/* Ambient Self-Crafted Dynamic Background with Floating Light Orbs */}
      <div
        className="ambient-bg"
        style={{
          backgroundImage: darkMode ? "url('/bg-atmosphere.svg')" : "url('/bg-atmosphere-light.svg')",
          backgroundColor: darkMode ? '#020408' : '#e8edf5'
        }}
      >
        <div className="ambient-orb ambient-orb-1 animate-float-slow" />
        <div className="ambient-orb ambient-orb-2 animate-float-delayed" />
        <div className="ambient-orb ambient-orb-3 animate-float-slow" />
        <div className="ambient-orb ambient-orb-4 animate-float-delayed" />
      </div>

      {/* Dynamic 5-Second Smooth Pattern Changing Logos (Lag-Free & Hardware Accelerated) */}
      <DynamicBackgroundLogos />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Top Navbar */}
      <Navbar
        clients={clients}
        activeClientId={activeClientId}
        currentUser={currentUser}
        onSelectClient={handleSelectClient}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenCopilot={() => setIsCopilotOpen(true)}
        onOpenAccountsModal={() => setIsAccountsModalOpen(true)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onSimulateEmail={handleSimulateEmail}
        isSyncing={isSyncing}
        accountsCount={accounts.length}
        notifications={notifications}
        onLogout={handleLogout}
        onMarkAllNotificationsRead={() => setNotifications(prev => prev.map(n => ({ ...n, unread: false })))}
        onSelectNotification={(emailId) => {
          const match = emails.find(e => e.id === emailId);
          if (match) {
            setSelectedEmail(match);
            setIsMobileDetailOpen(true);
          }
        }}
      />

      {/* Main App Workspace */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto px-4 sm:px-8 lg:px-10 py-7 relative z-10 space-y-7">
        
        {viewMode === 'client' ? (
          /* Client-Facing Minimalist VIP Experience */
          <ClientPortal
            client={activeClient}
            emails={emails}
            onClientAction={handleClientActionSubmit}
            onSwitchToAssistantView={() => setViewMode('assistant')}
          />
        ) : (
          /* Full Assistant Command Center */
          <div className="space-y-6 animate-fade-in">
            
            {/* KPI Metrics Strip (Inbox Pulse) */}
            <StatsStrip
              stats={stats}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />

            {/* Split 3-Column / 2-Column Responsive Layout with generous spacing */}
            <div className="flex gap-6 items-start">
              
              {/* Left Column: Segment Sidebar */}
              <div className="hidden lg:block">
                <Sidebar
                  activeCategory={activeCategory}
                  onSelectCategory={setActiveCategory}
                  stats={stats}
                  unreadOnly={unreadOnly}
                  onToggleUnreadOnly={() => setUnreadOnly(!unreadOnly)}
                  onOpenAccountsModal={() => setIsAccountsModalOpen(true)}
                  onOpenOnboarding={() => setIsOnboardingOpen(true)}
                  onResetData={handleResetData}
                />
              </div>

              {/* Middle Column: Email Feed / List */}
              <div className={`w-full lg:w-[460px] xl:w-[500px] shrink-0 ${isMobileDetailOpen ? 'hidden md:block' : 'block'}`}>
                <EmailList
                  emails={emails}
                  selectedEmail={selectedEmail}
                  onSelectEmail={(email) => {
                    setSelectedEmail(email);
                    setIsMobileDetailOpen(true);
                  }}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  activeCategory={activeCategory}
                  onToggleStar={handleToggleStar}
                  onToggleRead={handleToggleRead}
                  onArchive={handleArchive}
                  urgencyFilter={urgencyFilter}
                  onSelectUrgency={setUrgencyFilter}
                  isLoading={isLoading}
                />
              </div>

              {/* Right Column: Detailed Conversation Thread & AI Studio */}
              <div className={`flex-1 min-w-0 ${isMobileDetailOpen ? 'flex' : 'hidden md:flex'}`}>
                <EmailDetail
                  email={selectedEmail}
                  onUpdateClassification={handleUpdateClassification}
                  onToggleStar={handleToggleStar}
                  onToggleRead={handleToggleRead}
                  onArchive={handleArchive}
                  onSendReply={handleSendReply}
                  onSaveDraft={handleSaveDraft}
                  onGenerateDraft={generateAiDraft}
                  clientName={activeClient?.name || 'Sarah Jenkins'}
                  onBackToList={() => setIsMobileDetailOpen(false)}
                />
              </div>

            </div>

          </div>
        )}

      </main>

      {/* Slide-over AI Copilot Drawer */}
      <AiCopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        onAskCopilot={handleAskCopilot}
        onSelectEmailById={(id) => {
          const match = emails.find(e => e.id === id);
          if (match) setSelectedEmail(match);
        }}
        activeClient={activeClient}
      />

      {/* Onboarding Setup Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onFinishOnboarding={() => {
          pushToast({
            title: 'Welcome aboard!',
            message: 'AuraMail AI setup is complete. Your mailbox is active.',
            type: 'success'
          });
        }}
        onConnectAccount={handleAddAccount}
      />

      {/* Accounts & OAuth Sync Modal */}
      <AccountsModal
        isOpen={isAccountsModalOpen}
        onClose={() => setIsAccountsModalOpen(false)}
        accounts={accounts}
        onSyncAccount={handleSyncAccount}
        onAddAccount={handleAddAccount}
        activeClientId={activeClientId}
      />

      {/* Keyboard Shortcuts Cheat Sheet Modal */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

    </div>
  );
}
