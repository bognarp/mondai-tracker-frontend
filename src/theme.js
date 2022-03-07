import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body, #root': {
        height: '100%',
        backgroundColor: 'gray.200',
      },
    },
  },
  fonts: {
    heading: 'Inter',
    body: 'Lato',
  },
});

export default theme;
