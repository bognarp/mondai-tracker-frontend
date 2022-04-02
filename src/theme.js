import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  styles: {
    global: (props) => ({
      'html, body, #root': {
        height: '100%',
        // bgGradient: 'linear(to-b, #eef1f5, #e6e9f0)',
        // bgGradient: 'linear(to-b, #ace0f9, #fff1eb)',
        bgGradient: mode(
          'linear(to-b, #ace0f9, #fff1eb)',
          'linear(to-t, #323232 0%, #3F3F3F 40%, #1C1C1C 150%)'
        )(props),
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
