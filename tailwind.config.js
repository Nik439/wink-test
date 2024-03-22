/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '26': '6.5rem',
        '100': '25rem',
        '150': '37.5rem',
        '200': '50rem',
      },
      screens: {
        'xs': '480px'
      },
      animation: {
        'bounce-0': 'big-bounce .5s infinite ',
        'bounce-1': 'big-bounce .5s infinite 125ms',
        'bounce-2': 'big-bounce .5s infinite 250ms',
        'bounce-3': 'big-bounce .5s infinite 375ms',
      },
      keyframes: {
        'big-bounce': {
          '0%, 100%': { transform: 'translateY(-50%);' },
          '50%': { transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}

