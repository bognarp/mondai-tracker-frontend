import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import '@fontsource/inter';
import '@fontsource/lato';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import App from './App';
import { setAuthToken } from './util/sessionAPI';
import configureAppStore from './store';
import { logout } from './actions/sessionActions';
import theme from './theme';
import { alertUserError, receiveErrors } from './actions/errorActions';

document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwtDecode(localStorage.jwtToken);

    const preloadedState = {
      session: {
        isAuthenticated: true,
        user: decodedUser,
      },
    };

    store = configureAppStore(preloadedState);

    const currentTime = Date.now() / 1000;

    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
    }
  } else {
    store = configureAppStore();
  }

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        if (error.response.status === 401) store.dispatch(logout());
        store.dispatch(alertUserError(error));
      },
    }),
  });

  ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>,
    document.getElementById('root')
  );
});
