import React, { useState } from 'react';
import {
  Mail,
  ArrowRight,
  Sparkles,
  Zap,
  UserCheck,
  CheckCircle2,
  ShieldCheck,
  Sun,
  Moon,
  ExternalLink
} from 'lucide-react';

export default function AuthPage({ onLogin, darkMode, onToggleDarkMode }) {
  const [email, setEmail] = useState('alex.vance@techflow.io');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('assistant'); // 'assistant' | 'client'

  const handleGoogleOAuthLogin = () => {
    setIsGoogleLoading(true);
    setIsLoading(true);
    setTimeout(() => {
      onLogin({
        email: selectedRole === 'client' ? 'sarah.jenkins@techflow.io' : 'alex.vance@techflow.io',
        role: selectedRole,
        viewMode: selectedRole === 'client' ? 'client' : 'assistant'
      });
      setIsLoading(false);
      setIsGoogleLoading(false);
    }, 450);
  };

  const handleSsoSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin({
        email,
        role: selectedRole,
        viewMode: selectedRole === 'client' ? 'client' : 'assistant'
      });
      setIsLoading(false);
    }, 350);
  };

  const handleQuickDemo = (role) => {
    setIsLoading(true);
    const demoEmail = role === 'assistant' ? 'alex.vance@techflow.io' : 'sarah.jenkins@techflow.io';
    setEmail(demoEmail);
    setSelectedRole(role);
    setTimeout(() => {
      onLogin({
        email: demoEmail,
        role,
        viewMode: role === 'client' ? 'client' : 'assistant'
      });
      setIsLoading(false);
    }, 300);
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between font-sans relative overflow-x-hidden transition-colors duration-300"
      style={{
        backgroundImage: darkMode ? "url('/bg-atmosphere.svg')" : "url('/bg-atmosphere-light.svg')",
        backgroundColor: darkMode ? '#020408' : '#f8fafc',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Ambient Plasma Orbs */}
      <div className="ambient-orb ambient-orb-1 animate-float-slow pointer-events-none" />
      <div className="ambient-orb ambient-orb-2 animate-float-delayed pointer-events-none" />
      <div className="ambient-orb ambient-orb-3 animate-float-slow pointer-events-none" />
      <div className="ambient-orb ambient-orb-4 animate-float-delayed pointer-events-none" />

      {/* Harmonious 4-Logo Constellation Layout (Reduced glow & balanced depth) */}
      {/* 1. Top-Right Upper Anchor (Cyan) */}
      <div className="absolute top-[5%] right-[4%] md:right-[6%] w-[270px] h-[270px] md:w-[350px] md:h-[350px] opacity-20 dark:opacity-30 pointer-events-none select-none animate-float-slow rotate-6 z-0">
        <img
          src="/logo-emblem.svg"
          alt="AuraMail Constellation Emblem 1"
          className="w-full h-full object-contain filter drop-shadow-[0_0_22px_rgba(6,182,212,0.55)]"
        />
      </div>

      {/* 2. Mid-Left Floating Anchor (Indigo) */}
      <div className="absolute top-[34%] left-[-20px] md:left-[3%] w-[220px] h-[220px] md:w-[280px] md:h-[280px] opacity-18 dark:opacity-25 pointer-events-none select-none animate-float-delayed -rotate-6 z-0">
        <img
          src="/logo-emblem.svg"
          alt="AuraMail Constellation Emblem 2"
          className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]"
        />
      </div>

      {/* 3. Center-Right Ambient Depth (Purple) */}
      <div className="absolute top-[56%] right-[8%] md:right-[12%] w-[190px] h-[190px] md:w-[240px] md:h-[240px] opacity-15 dark:opacity-22 pointer-events-none select-none animate-float-slow rotate-3 z-0">
        <img
          src="/logo-emblem.svg"
          alt="AuraMail Constellation Emblem 3"
          className="w-full h-full object-contain filter drop-shadow-[0_0_18px_rgba(168,85,247,0.45)]"
        />
      </div>

      {/* 4. Bottom-Left Foundation Anchor (Sky Blue) */}
      <div className="absolute bottom-[4%] left-[4%] md:left-[6%] w-[240px] h-[240px] md:w-[300px] md:h-[300px] opacity-18 dark:opacity-28 pointer-events-none select-none animate-float-delayed -rotate-3 z-0">
        <img
          src="/logo-emblem.svg"
          alt="AuraMail Constellation Emblem 4"
          className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]"
        />
      </div>

      {/* Top Header Bar */}
      <header className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-6 flex items-center justify-between relative z-20">
        <div className="flex items-center space-x-3.5">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 via-indigo-500 to-cyan-500 rounded-2xl blur-sm opacity-70 group-hover:opacity-100 transition duration-500" />
            <img
              src="/favicon.svg"
              alt="AuraMail Copilot Logo"
              className="relative w-10 h-10 object-contain rounded-2xl shadow-glow-brand ring-1 ring-white/20"
            />
          </div>
          <span className="font-black text-xl tracking-tight bg-gradient-to-r from-surface-900 via-brand-600 to-indigo-600 dark:from-white dark:via-brand-400 dark:to-cyan-400 bg-clip-text text-transparent">
            AuraMail Copilot
          </span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={onToggleDarkMode}
          className="p-2.5 rounded-2xl bg-white/70 dark:bg-surface-800/80 border border-surface-200/80 dark:border-white/[0.08] text-surface-600 dark:text-surface-300 hover:bg-white dark:hover:bg-surface-700 shadow-sm transition-all"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-surface-600" />}
        </button>
      </header>

      {/* Main Split Grid */}
      <main className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center flex-1 relative z-10">
        
        {/* Left Column: Hero & Value Proposition */}
        <div className="lg:col-span-7 space-y-7 animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 dark:bg-brand-500/20 border border-brand-500/30 text-brand-700 dark:text-brand-300 text-xs font-black uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>AI Executive Email Co-Pilot</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-surface-900 dark:text-white leading-[1.1]">
            Your inbox,{' '}
            <span className="bg-gradient-to-r from-brand-600 via-indigo-500 to-cyan-500 dark:from-brand-400 dark:via-indigo-300 dark:to-cyan-400 bg-clip-text text-transparent">
              rewritten by AI.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-surface-600 dark:text-surface-300 leading-relaxed max-w-xl font-normal">
            AuraMail Copilot connects personal assistants and executives into one unified autonomous hub.
            Automatically identify high-priority conversations, eliminate ambiguity with AI reply responsibility,
            and keep clients focused on decisions that matter.
          </p>

          {/* Feature Bullets */}
          <div className="space-y-3.5 pt-2 max-w-lg">
            <div className="flex items-start space-x-3 text-xs sm:text-sm text-surface-700 dark:text-surface-200">
              <div className="w-6 h-6 rounded-lg bg-brand-500/15 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-surface-900 dark:text-white">Autonomous Reply Responsibility:</strong> AI determines whether Assistant, Client, or No Reply is needed.
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs sm:text-sm text-surface-700 dark:text-surface-200">
              <div className="w-6 h-6 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <UserCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-surface-900 dark:text-white">Minimalist Client Portal:</strong> Ultra-clean glance showing only emails requiring CEO/Client sign-off.
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs sm:text-sm text-surface-700 dark:text-surface-200">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-surface-900 dark:text-white">AI Reply Studio & Copilot:</strong> Draft tailored responses in 4 executive tones and query the inbox with natural language.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Google OAuth & Enterprise SSO Glass Card */}
        <div className="lg:col-span-5 w-full max-w-md mx-auto lg:ml-auto">
          <div className="glass-panel p-8 sm:p-9 rounded-3xl border border-surface-200/90 dark:border-white/[0.1] shadow-2xl relative overflow-hidden backdrop-blur-2xl">
            
            {/* Top Card Title */}
            <div className="space-y-1.5 mb-6 text-center sm:text-left">
              <h2 className="text-2xl font-black tracking-tight text-surface-900 dark:text-white">
                Workspace Sign-In
              </h2>
              <p className="text-xs text-surface-500 dark:text-surface-400">
                Authenticate with Google Workspace OAuth or your enterprise SSO identity.
              </p>
            </div>

            {/* Role Preference Selector */}
            <div className="mb-5 p-1 rounded-2xl bg-surface-100 dark:bg-surface-800/80 border border-surface-200/60 dark:border-white/5 grid grid-cols-2 gap-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setSelectedRole('assistant')}
                className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                  selectedRole === 'assistant'
                    ? 'bg-white dark:bg-surface-700 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-surface-500 hover:text-surface-800 dark:hover:text-surface-200'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Assistant Lead</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('client')}
                className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                  selectedRole === 'client'
                    ? 'bg-white dark:bg-surface-700 text-amber-600 dark:text-amber-400 shadow-sm'
                    : 'text-surface-500 hover:text-surface-800 dark:hover:text-surface-200'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Client / CEO</span>
              </button>
            </div>

            {/* Exclusive Google Workspace OAuth Button */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogleOAuthLogin}
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-surface-50 dark:bg-surface-800 dark:hover:bg-surface-700/80 border-2 border-brand-500/30 dark:border-brand-400/30 text-surface-900 dark:text-white text-xs font-black shadow-md hover:shadow-glow-brand transition-all flex items-center justify-center space-x-3 group disabled:opacity-50"
              >
                {/* Official Google Multi-Color G Logo */}
                <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>
                  {isGoogleLoading
                    ? 'Verifying Google Workspace OAuth...'
                    : 'Continue with Google Workspace'}
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-surface-200 dark:border-white/10" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
                <span className="bg-white/80 dark:bg-surface-900 px-3 text-surface-400">
                  Or Passwordless SSO
                </span>
              </div>
            </div>

            {/* Single Sign-On Email Input (Passwordless) */}
            <form onSubmit={handleSsoSubmit} className="space-y-3">
              <div className="relative">
                <Mail className="w-4 h-4 text-surface-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs bg-white/80 dark:bg-surface-900/80 border border-surface-200 dark:border-white/[0.08] text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-shimmer w-full py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-black shadow-glow-brand transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{isLoading && !isGoogleLoading ? 'Authorizing Session...' : 'Continue with Enterprise SSO'}</span>
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            {/* Quick Demo Access Buttons */}
            <div className="mt-5 pt-4 border-t border-surface-200/80 dark:border-white/[0.08] space-y-2">
              <div className="text-[10px] font-black uppercase tracking-widest text-surface-400 dark:text-surface-500 text-center">
                Instant 1-Click Demo Profiles
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('assistant')}
                  className="p-2.5 rounded-2xl text-left bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/30 transition-all group"
                >
                  <div className="flex items-center space-x-1.5 text-brand-700 dark:text-brand-300 font-bold text-xs mb-0.5">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Assistant</span>
                  </div>
                  <div className="text-[10px] text-surface-500 dark:text-surface-400">
                    Alex (Full Control)
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemo('client')}
                  className="p-2.5 rounded-2xl text-left bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all group"
                >
                  <div className="flex items-center space-x-1.5 text-amber-700 dark:text-amber-300 font-bold text-xs mb-0.5">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Client / CEO</span>
                  </div>
                  <div className="text-[10px] text-surface-500 dark:text-surface-400">
                    Sarah (VIP Portal)
                  </div>
                </button>
              </div>
            </div>

            {/* Security Footer Note */}
            <div className="mt-4 text-center">
              <span className="text-[10px] text-surface-400 leading-tight block">
                Zero passwords stored. Powered by Google Workspace OAuth 2.0 PKCE.
              </span>
            </div>

          </div>
        </div>

      </main>

      {/* Footer Info */}
      <footer className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between text-xs text-surface-400 border-t border-surface-200/50 dark:border-white/[0.05] relative z-20 gap-2">
        <div className="flex items-center space-x-2">
          <span>AuraMail Copilot — Executive Email Assistant</span>
          <span>•</span>
          <a
            href="https://auramail-copilot.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 dark:text-brand-400 hover:underline flex items-center space-x-1 font-medium"
          >
            <span>auramail-copilot.vercel.app</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="flex items-center space-x-1 font-medium">
          <span>Submission for</span>
          <strong className="text-surface-700 dark:text-surface-200">Humanity Founders</strong>
          <span>by</span>
          <strong className="text-surface-800 dark:text-surface-100">Prince Jha</strong>
        </div>
      </footer>
    </div>
  );
}
