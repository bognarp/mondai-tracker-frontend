import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body, #root': {
        height: '100vh',
        backgroundColor: 'gray.300'
      },
      a: {
        color: 'blue',
      },
    },
  },
  fonts: {
    heading: 'Inter',
    body: 'Lato',
  },
});

export default theme;
