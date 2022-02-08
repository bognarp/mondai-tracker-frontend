import { createReducer } from '@reduxjs/toolkit';
import {
  receiveCurrentUser,
  receiveUserLogOut,
  receiveUserSignUp,
} from '../actions/sessionActions';
import { receiveUserInfo } from '../actions/userActions';

const initialState = {
  isAuthenticated: false,
  user: {},
  userInfo: {},
};

const sessionReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(receiveCurrentUser, (state, action) => {
      state.isAuthenticated = Boolean(action.payload);
      state.user = action.payload;
    })
    .addCase(receiveUserSignUp, (state, action) => {
      return initialState;
    })
    .addCase(receiveUserLogOut, (state, action) => {
      return initialState;
    })
    .addCase(receiveUserInfo, (state, action) => {
      state.userInfo = action.payload;
    });
});

// SELECTORS
export const selectUsername = (state) => {
  const { session } = state;
  return session.user.username ? session.user.username : 'Anonymous';
};

export default sessionReducer;
