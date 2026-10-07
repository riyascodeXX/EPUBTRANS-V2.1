export const designSystem = {
  colors: {
    teal: '#078686',
    orange: '#F2A03A',
    green: '#20BE27',
    deepTeal: '#12383A',
    gray: '#526568',
    softTeal: '#EAF6F5',
    offWhite: '#F7F9F9',
    white: '#FFFFFF',
    border: '#DCE5E5',
    red: '#F3151A',
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '80px',
    '5xl': '96px',
    '6xl': '120px',
  },

  radius: {
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },

  container: {
    maxWidth: '1440px',
    padding: {
      mobile: '20px',
      tablet: '32px',
      desktop: '48px',
    },
  },

  typography: {
    display: {
      desktop: '64px',
      tablet: '52px',
      mobile: '40px',
    },

    h1: {
      desktop: '56px',
      tablet: '48px',
      mobile: '40px',
    },

    h2: {
      desktop: '44px',
      tablet: '38px',
      mobile: '32px',
    },

    h3: {
      desktop: '30px',
      tablet: '28px',
      mobile: '24px',
    },

    body: {
      large: '18px',
      default: '16px',
      small: '14px',
    },

    navigation: '15px',
  },

  motion: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
  },
} as const
