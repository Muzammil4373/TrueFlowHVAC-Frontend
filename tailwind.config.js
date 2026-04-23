/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#0f2744',
        },
        orange: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
        flame: '#FF6B35',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body:    ['"Inter"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(15,39,68,0.92) 0%, rgba(30,64,175,0.85) 100%)',
        'card-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'warm-gradient': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'ice-gradient':  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'flame-gradient':'linear-gradient(135deg, #f83600 0%, #f9d423 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(31,38,135,0.15)',
        'glass-lg': '0 20px 60px rgba(31,38,135,0.2)',
        'card': '0 4px 24px rgba(0,0,0,0.08)',
        'card-hover': '0 16px 48px rgba(0,0,0,0.16)',
        'glow-blue': '0 0 40px rgba(37,99,235,0.3)',
        'glow-orange': '0 0 40px rgba(249,115,22,0.4)',
      },
      backdropBlur: { xs: '4px' },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'slide-in': 'slideIn 0.4s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        fadeUp:  { from: { opacity: 0, transform: 'translateY(30px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideIn: { from: { opacity: 0, transform: 'translateX(-20px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        glow:    { '0%,100%': { boxShadow: '0 0 20px rgba(249,115,22,0.3)' }, '50%': { boxShadow: '0 0 40px rgba(249,115,22,0.6)' } },
      },
    },
  },
  plugins: [],
};
