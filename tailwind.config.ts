/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    screens: {
      xs: '400px',
    },
    colors: {
      blue: '#7DC7CC',
      yellow: '#FFCA60',
      red: '#E16262',
      black: '#222222',
      white: '#ffffff',
      gray: {
        10: '#F5F5F5',
        20: '#ECECEC',
        30: '#DFDFDF',
        40: '#B3B3B3',
        50: '#333333',
      },
      primary: {
        10: '#E9EDC9',
        20: '#D8E2A6',
        30: '#CCD5AE',
      },
      secondary: {
        10: '#FAEDCD',
        20: '#D4A373',
      },
      background: '#FFFCF8',
    },
    fontFamily: {
      pretendard: ['Pretendard-Regular', 'sans-serif'],
      ryurue: ['Ownglyph_ryurue-Rg', 'sans-serif'],
    },
    fontSize: {
      'pretendard-sm': '14px',
      'pretendard-base': '18px',
      'pretendard-md': '26px',
      'pretendard-lg': '34px',
      'ryurue-xs': '18px',
      'ryurue-sm': '22px',
      'ryurue-base': '28px',
      'ryurue-md': '34px',
      'ryurue-lg': '42px',
    },
    fontWeight: {
      'pretendard-normal': 400,
      'pretendard-bold': 700,
    },
    boxShadow: {
      card: '0px 4px 4px 0px rgba(51,51,51,0.25)',
    },
    extend: {
      backgroundImage: {
        paper: "url('/src/assets/images/paper.svg')",
        main: "url('/src/assets/images/main-default.png')",
        main2: "url('/src/assets/images/main-level1.png')",
        main3: "url('/src/assets/images/main-level2.png')",
        main4: "url('/src/assets/images/main-level3.png')",
        polaroid: "url('/src/assets/images/polaroid.png')",
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%) translateX(-50%)' },
          '100%': { transform: 'translateY(0) translateX(-50%)' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(0) translateX(-50%)' },
          '100%': { transform: 'translateY(100%) translateX(-50%)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        flash: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-in',
        'fade-in': 'fade-in 2s ease-out forwards',
        flash: 'flash 0.5s ease-out',
      },
      boxShadow: {
        'shadow-box':
          '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
