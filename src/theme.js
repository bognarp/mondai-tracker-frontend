import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  styles: {
    global: (props) => ({
      'html, body, #root': {
        bg: mode('#f4f6ff', 'gray.700')(props),
      },
      button: {
        fontFamily: 'heading',
      },
    }),
  },
  fonts: {
    heading: 'Inter',
    body: 'Lato',
  },
});

export default theme;
