/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* ================= COLORS ================= */
      colors: {
        /* Medical Theme (extended & compatible) */
        'medical-primary': '#0EA5E9',     // sky blue
        'medical-secondary': '#06B6D4',   // cyan
        'medical-accent': '#10B981',      // emerald
        'medical-warning': '#F59E0B',
        'medical-error': '#EF4444',

        /* Cart badge / alert accent */
        'medical-cart': '#ef4444',

        /* App palette */
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
        muted: '#64748B',
      },

      /* ================= TYPOGRAPHY ================= */
      fontFamily: {
        heading: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },

      /* ================= LAYOUT ================= */
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },

      /* ================= ANIMATIONS ================= */
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        fadeInUp: 'fadeInUp 0.5s ease-out',
        slideDown: 'slideDown 0.3s ease-out',
        scaleIn: 'scaleIn 0.4s ease-out',
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },

      /* ================= TRANSITIONS ================= */
      transitionDuration: {
        400: '400ms',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      /* ================= SHADOWS ================= */
      boxShadow: {
        custom: '0 2px 8px rgba(0, 0, 0, 0.08)',
        'custom-md': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'custom-lg': '0 8px 24px rgba(0, 0, 0, 0.15)',
      },

      /* ================= BORDER RADIUS ================= */
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
};
