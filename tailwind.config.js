/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': {
          DEFAULT: '#006B3F',
          hover: '#005230',
          light: '#E6F4EA',
          50: '#F0FDF4',
          100: '#DCFCE7',
          600: '#006B3F',
          700: '#005230',
        },
        'brand-gold': {
          DEFAULT: '#F2B705',
          light: '#FEF8E7',
          hover: '#D9A404',
          50: '#FFFBEB',
          500: '#F2B705',
        },
        'brand-blue': {
          DEFAULT: '#0057A8',
          light: '#EBF3FA',
          hover: '#004687',
          50: '#EFF6FF',
          600: '#0057A8',
        },
        canvas: '#F8F8F6',
        surface: '#FFFFFF',
        'border-main': '#D5E2DE',
        'border-hover': '#9BB8AF',
        'text-primary': '#172B4D',
        'text-secondary': '#505F78',
        'text-disabled': '#94A3B8',
        emergency: {
          DEFAULT: '#DC2626',
          dark: '#B91C1C',
          surface: '#FEE2E2',
          border: '#FCA5A5',
        },
        cooldown: '#94A3B8',
        success: {
          DEFAULT: '#16803C',
          light: '#E6F4EA',
          border: '#BBF7D0',
        },
        warning: {
          DEFAULT: '#D97706',
          light: '#FEF3C7',
          border: '#FDE68A',
        },
        pain: {
          mild: '#10B981',
          moderate: '#F59E0B',
          severe: '#F97316',
          worst: '#B91C1C',
        },
        esi: {
          1: '#991B1B',
          2: '#DC2626',
          3: '#D97706',
          4: '#2563EB',
          5: '#16A34A',
          review: '#7C3AED',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'sm': '8px',
        'md': '14px',
        'lg': '20px',
        'xl': '28px',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 16px rgba(0, 107, 63, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 8px 24px rgba(0, 107, 63, 0.12)',
        'modal': '0 24px 64px rgba(23, 43, 77, 0.25)',
        'emergency': '0 8px 24px rgba(220, 38, 38, 0.22)',
      },
      minHeight: {
        'touch': '64px',
        'touch-btn': '72px',
        'touch-card': '96px',
      },
      minWidth: {
        'touch': '64px',
        'touch-btn': '360px',
      }
    },
  },
  plugins: [],
}
