/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        secondary: 'var(--secondary)',
        'secondary-dark': 'var(--secondary-dark)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#1a1a1a',
            a: {
              color: 'var(--primary)',
              '&:hover': {
                color: 'var(--primary-dark)',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

