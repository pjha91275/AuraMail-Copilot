/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c7d9fe',
          300: '#a3c0fd',
          400: '#759cfb',
          500: '#4a75f6',
          600: '#2b52ec',
          700: '#1d3ed4',
          800: '#1a33ab',
          900: '#192e85',
          950: '#0d1538',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          850: '#131b2e',
          900: '#0b1120',
          950: '#060a14',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        'card': '0 4px 12px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -2px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 16px 32px -4px rgba(0, 0, 0, 0.25), 0 6px 12px -4px rgba(0, 0, 0, 0.12)',
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'glow-brand': '0 0 25px -3px rgba(74, 117, 246, 0.5)',
        'glow-amber': '0 0 25px -3px rgba(245, 158, 11, 0.5)',
        'glow-emerald': '0 0 25px -3px rgba(16, 185, 129, 0.5)',
        'glow-red': '0 0 25px -3px rgba(239, 68, 68, 0.5)',
        'glow-cyan': '0 0 25px -3px rgba(6, 182, 212, 0.5)',
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'float-delayed': 'float 9s ease-in-out 2s infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'fade-in-up': 'fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scanline': 'scanline 4s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'aurora': 'aurora 15s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-12px) scale(1.04)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.85' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 4px rgba(99, 102, 241, 0.4))' },
          '50%': { filter: 'drop-shadow(0 0 12px rgba(99, 102, 241, 0.8))' },
        },
        aurora: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '100%': { transform: 'rotate(10deg) scale(1.15)' },
        }
      }
    },
  },
  plugins: [],
}
