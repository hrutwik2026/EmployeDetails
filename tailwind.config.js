/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 3px 6px rgba(0, 0, 0, 0.5)',
      },
      borderWidth: {
        '0': '0',
        default: '1px',
        '2': '2px',
        '4': '4px',
        '8': '8px',
      },
      borderColor: theme => ({
        DEFAULT: theme('colors.gray.300', 'currentColor'),
        // Add any custom border colors here
      }),
      fontFamily: {
        sans: ['font-family:Cambria, Cochin, Georgia, Times, Times New Roman, serif'],
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0,0,255,0.6)' },
          '50%': { boxShadow: '0 0 20px rgba(0,0,255,0.8)' },
        },
      },
      
      animation: {
        slideIn: 'slideIn 1s ease-out forwards',
        slideOut: 'slideOut 1s ease-in forwards',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        glow: 'glow 1s infinite',
      },
    },
  },
  variants: {},
  plugins: [],
}
