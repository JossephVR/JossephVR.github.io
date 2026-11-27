/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './script.js'],
    theme: {
      extend: {
        colors: {
          bg: '#0b0e13',
          card: '#11151c',
          line: '#1f2630',
          muted: '#7c8799',
          ink: '#e6e9f0',
          sage: { DEFAULT: '#5a8f72', light: '#86c9a6' }
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          mono: ['"Fira Code"', 'monospace']
        },
        keyframes: {
          drift: {
            '0%,100%': { transform: 'translate(0,0) scale(1)' },
            '50%': { transform: 'translate(40px,-30px) scale(1.08)' }
          },
          marquee: {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-50%)' }
          },
          blink: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
          ping2: { '75%,100%': { transform: 'scale(2.2)', opacity: 0 } }
        },
        animation: {
          drift: 'drift 14s ease-in-out infinite',
          'drift-slow': 'drift 20s ease-in-out infinite reverse',
          marquee: 'marquee 35s linear infinite',
          blink: 'blink 1s step-end infinite',
          ping2: 'ping2 1.8s cubic-bezier(0,0,.2,1) infinite'
        }
      }
    },
    plugins: []
  }