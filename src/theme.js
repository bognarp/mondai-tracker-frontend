import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body, #root': {
        height: '100vh',
      },
      a: {
        color: 'teal.500',
      },
    },
  },
  fonts: {
    heading: 'Montserrat',
    body: 'Raleway',
  },
});

export default theme;
