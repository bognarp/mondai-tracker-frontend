import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body, #root': {
        height: '100%',
        // bgGradient: 'linear(to-b, #dfe9f3, #ffffff)',
        bgGradient: 'linear(to-b, #ace0f9, #fff1eb)',
      },
      button: {
        fontFamily: 'heading',
      },
    },
  },
  fonts: {
    heading: 'Inter',
    body: 'Lato',
  },
});

export default theme;
