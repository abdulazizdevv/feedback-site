import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */

const config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      aspectRatio: {
        'custom-12-16': '12 / 16.452',
        'custom-4-5': '4 / 5',
      },
      boxShadow: {
        'product-card': '0px 0px 16px 0px rgba(0, 0, 0, 0.06)',
        'custom-sm':
          '0px 1px 3px 0px rgba(10, 13, 18, 0.10), 0px 1px 2px -1px  rgba(10, 13, 18, 0.10)',
      },
      fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      container: {
        center: true,
        padding: '16px',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1200px',
        },
      },
      screens: {
        xs: '390px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
      },
    },
  },
};
export default config;
