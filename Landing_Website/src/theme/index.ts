import { createTheme, MantineColorsTuple } from '@mantine/core';

const hrBlue: MantineColorsTuple = [
  '#e7f5ff',
  '#d0ebff',
  '#a5d8ff',
  '#74c0fc',
  '#4dabf7',
  '#339af0',
  '#228be6',
  '#1c7ed6',
  '#1971c2',
  '#094067'
];

export const theme = createTheme({
  primaryColor: 'blue',
  primaryShade: 8,
  fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  headings: {
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    fontWeight: '700',
  },
  defaultRadius: 'md',
  shadows: {
    xs: 'none',
    sm: 'none',
    md: 'none',
    lg: 'none',
    xl: 'none',
  },
  colors: {
    hrBlue,
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    Card: {
      defaultProps: {
        radius: 'md',
        withBorder: true,
        shadow: 'none',
      },
      styles: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    Paper: {
      defaultProps: {
        shadow: 'none',
      },
      styles: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    Badge: {
      defaultProps: {
        radius: 'sm',
      },
    },
  },
});
