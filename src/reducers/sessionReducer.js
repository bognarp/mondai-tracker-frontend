import { createReducer } from '@reduxjs/toolkit';
import {
  receiveCurrentUser,
  receiveUserLogOut,
  receiveUserSignUp,
} from '../actions/sessionActions';

const initialState = {
  isAuthenticated: false,
  user: {},
};

const sessionReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(receiveCurrentUser, (state, action) => {
      state.isAuthenticated = Boolean(action.payload);
      state.user = action.payload;
    })
    .addCase(receiveUserSignUp, (state, action) => {
      state.isAuthenticated = false;
      state.user = undefined;
    })
    .addCase(receiveUserLogOut, (state, action) => {
      state.isAuthenticated = false;
      state.user = undefined;
    });
});

// SELECTORS
export const selectUsername = (state) => {
  const { session } = state;
  return session.user.username ? session.user.username : 'Anonymous';
};

export default sessionReducer;
