import React, { useState } from 'react';
import {
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Zap,
  UserCheck,
  CheckCircle2,
  ShieldCheck,
  Sun,
  Moon,
  Eye,
  EyeOff
} from 'lucide-react';

export default function AuthPage({ onLogin, darkMode, onToggleDarkMode }) {
  const [email, setEmail] = useState('alex.vance@techflow.io');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('assistant'); // 'assistant' | 'client'

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin({
        email,
        role: selectedRole,
        viewMode: selectedRole === 'client' ? 'client' : 'assistant'
      });
      setIsLoading(false);
    }, 400);
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

      {/* Top Header Bar */}
      <header className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-6 flex items-center justify-between relative z-20">
        <div className="flex items-center space-x-3.5">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 via-indigo-500 to-cyan-500 rounded-2xl blur-sm opacity-70 group-hover:opacity-100 transition duration-500" />
            <img
              src="/favicon.svg"
              alt="AuraMail AI Logo"
              className="relative w-10 h-10 object-contain rounded-2xl shadow-glow-brand ring-1 ring-white/20"
            />
          </div>
          <span className="font-black text-xl tracking-tight bg-gradient-to-r from-surface-900 via-brand-600 to-indigo-600 dark:from-white dark:via-brand-400 dark:to-cyan-400 bg-clip-text text-transparent">
            AuraMail AI
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
            AuraMail AI connects personal assistants and executives into one unified autonomous hub.
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

        {/* Right Column: Authentication Glass Card */}
        <div className="lg:col-span-5 w-full max-w-md mx-auto lg:ml-auto">
          <div className="glass-panel p-8 sm:p-9 rounded-3xl border border-surface-200/90 dark:border-white/[0.1] shadow-2xl relative overflow-hidden backdrop-blur-2xl">
            
            {/* Top Card Title */}
            <div className="space-y-1.5 mb-6">
              <h2 className="text-2xl font-black tracking-tight text-surface-900 dark:text-white">
                Sign in
              </h2>
              <p className="text-xs text-surface-500 dark:text-surface-400">
                Use your credentials or 1-click demo access to enter your workspace.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-surface-700 dark:text-surface-300">
                  Work email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-surface-400 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs bg-white/80 dark:bg-surface-900/80 border border-surface-200 dark:border-white/[0.08] text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 font-medium"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-surface-700 dark:text-surface-300">
                    Password
                  </label>
                  <span className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 cursor-pointer hover:underline">
                    Forgot password?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-surface-400 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-2xl text-xs bg-white/80 dark:bg-surface-900/80 border border-surface-200 dark:border-white/[0.08] text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-surface-400 hover:text-surface-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Primary Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-shimmer w-full py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-black shadow-glow-brand transition-all flex items-center justify-center space-x-2 mt-2 disabled:opacity-50"
              >
                <span>{isLoading ? 'Verifying workspace...' : 'Sign in to AuraMail AI'}</span>
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            {/* Quick Demo Access Buttons */}
            <div className="mt-6 pt-5 border-t border-surface-200/80 dark:border-white/[0.08] space-y-2.5">
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
            <div className="mt-5 text-center">
              <span className="text-[10px] text-surface-400 leading-tight block">
                Access is workspace-managed. Accounts are provisioned with Google Workspace & Microsoft 365 OAuth.
              </span>
            </div>

          </div>
        </div>

      </main>

      {/* Footer Info */}
      <footer className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between text-xs text-surface-400 border-t border-surface-200/50 dark:border-white/[0.05] relative z-20 gap-2">
        <div className="flex items-center space-x-2">
          <span>AuraMail AI — Executive Email Assistant</span>
          <span>•</span>
          <span className="text-surface-500 dark:text-surface-400">Full-Stack Prototype</span>
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
