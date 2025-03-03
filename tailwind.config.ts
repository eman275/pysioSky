/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    fontSize: {
      huge1: '48px',
      huge: '32px',
      xxxl: '24px',
      xxl: '22px',
      xl: '20px',
      lg: '18px',
      base: '16px',
      sm: '14px',
      xs: '12px',
      xxs: '10px',
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        base: {
          white: '#FFFFFF',
          black: '#151515',
          gray: '#E8EFF4',
        },
        neutral: {
          1: '#F9FAFC',
          2: '#E2E7EC',
          3: '#CAD1D9',
          4: '#A1ACB7',
          5: '#798595',
          6: '#13243E',
          7: '#292B3F',
        },
        primary: {
          1: '#344688',
          2: '#9ca9db',
          3: '#9FD7F2',
          4: '#70C3EB',
          5: '#40AFE5',
          6: '#109BDE',
          7: '#F3FAFD',
        },
        secondary: {
          1: '#F1F7EE',
          2: '#E4F0DD',
          3: '#C8E1BB',
          4: '#ADD29A',
          5: '#91C378',
          6: '#76B456',
        },
        tertiary: {
          1: '#FDF4ED',
          2: '#FCE9DB',
          3: '#F9D2B7',
          4: '#F5BC94',
          5: '#F2A570',
          6: '#EF8F4C',
        },
        info: {
          1: '#EBF8F9',
          2: '#D8F1F3',
          3: '#B1E4E7',
          4: '#89D6DC',
          5: '#62C9D0',
          6: '#3BBAC4',
        },
        success: {
          1: '#EBF9EB',
          2: '#D9F3D8',
          3: '#B2E7B1',
          4: '#8CDC89',
          5: '#65D062',
          6: '#3FC43B',
        },
        error: {
          1: '#F9EBEB',
          2: '#F3D8D8',
          3: '#E7B1B1',
          4: '#DC8989',
          5: '#D06262',
          6: '#C43B3B',
        },
        warning: {
          1: '#FCFAE9',
          2: '#F9F5D5',
          3: '#F4EBAA',
          4: '#EEE080',
          5: '#E9D655',
          6: '#C6B437',
        },
        text: {
          primary: '#109BDE',
          secondary: '#76B456',
          tertiary: '#EF8F4C',
          error: '#C43B3B',
          success: '#3FC43B',
          warning: '#C6B437',
          info: '#3BBAC4',
          neutral: {
            1: '#CFD6DD',
            2: '#AAB4BE',
            3: '#86919F',
            4: '#13243E',
          },
        },
      },
      backgroundColor: {
        steper: 'var(--Neutral-Neutral---2, #E2E7EC)',
      },

      lineHeight: {
        'extra-tight': '14px',
      },

      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
      boxShadow: {
        nextBtn: '0px -4px 4px 0px rgba(0, 0, 0, 0.25)',
        custom: '0px 1px 0px 0px #E2E7EC, 0px -1px 0px 0px #E2E7EC',
      },
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar')],
}
