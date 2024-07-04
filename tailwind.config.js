/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
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
      'pretendard-sm': '12px',
      'pretendard-base': '16px',
      'pretendard-md': '24px',
      'pretendard-lg': '32px',
      'ryurue-sm': '16px',
      'ryurue-base': '22px',
      'ryurue-md': '32px',
      'ryurue-lg': '40px',
    },
    fontWeight: {
      'pretendard-normal': 400,
      'pretendard-bold': 700,
    },
    extend: {
      backgroundImage: {
        paper: "url('/src/assets/images/paper.svg')",
      },
    },
  },
  plugins: [],
};
