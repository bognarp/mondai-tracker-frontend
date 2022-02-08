import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import App from './App';
import { setAuthToken } from './util/sessionAPI';
import configureAppStore from './store';
import { logout } from './actions/sessionActions';

document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwtDecode(localStorage.jwtToken);

    const preloadedState = {
      session: {
        isAuthenticated: true,
        user: decodedUser,
        userInfo: {},
      },
    };

    store = configureAppStore(preloadedState);

    const currentTime = Date.now() / 1000;

    if (decodedUser.exp < currentTime) {
      store.dispatch(logout);
    }
  } else {
    store = configureAppStore();
  }

  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
});
