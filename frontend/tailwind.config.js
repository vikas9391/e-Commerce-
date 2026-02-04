/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Medical Theme Colors
        'medical-primary': '#0EA5E9',    // Sky Blue - Trust, Healthcare
        'medical-secondary': '#06B6D4',   // Cyan - Clean, Medical
        'medical-accent': '#10B981',      // Emerald - Health, Success
        'medical-warning': '#F59E0B',     // Amber - Caution
        'medical-error': '#EF4444',       // Red - Alert, Urgent
        
        // Professional Palette
        primary: {
          DEFAULT: '#0EA5E9',
          dark: '#0284C7',
          light: '#38BDF8',
        },
        secondary: {
          DEFAULT: '#06B6D4',
          dark: '#0891B2',
          light: '#22D3EE',
        },
        accent: {
          DEFAULT: '#10B981',
          dark: '#059669',
          light: '#34D399',
        },
        dark: '#1E293B',
        light: '#F8FAFC',
      },
      fontFamily: {
        heading: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slideDown': 'slideDown 0.3s ease-out',
        'fadeIn': 'fadeIn 0.5s ease-out',
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'scaleIn': 'scaleIn 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'custom': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'custom-md': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'custom-lg': '0 8px 24px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}