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
    }
  }
}

export type TypographyVariant = keyof typeof theme.typography;
