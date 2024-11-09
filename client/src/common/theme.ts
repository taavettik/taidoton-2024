export const theme = {
  typography: {
    body: {
      element: 'span',
      fontFamily: 'montserrat',
      fontSize: '16px',
    },
    h1: {
      element: 'h1',
      fontFamily: 'montserrat',
      fontSize: '32px',
    },
    bodySmall: {
      element: 'span',
      fontFamily: 'montserrat',
      fontSize: '12px',
    },
  },
  colors: {
    background: '#111418',
    secondary: '#939BA7',
    muted: '#453C3C',
    tinderRed: '#f54765',
  },
};

export type TypographyVariant = keyof typeof theme.typography;
