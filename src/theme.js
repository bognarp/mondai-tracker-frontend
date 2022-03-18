import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body, #root': {
        height: '100%',
        // bgGradient: 'linear(to-b, #eef1f5, #e6e9f0)',
        bgGradient: 'linear(to-b, #ace0f9, #fff1eb)',
        // bgGradient: 'linear(to-b, #a1c4fd, #c2e9fb)',
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
