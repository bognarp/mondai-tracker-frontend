import { createReducer, isAnyOf } from '@reduxjs/toolkit';
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
    .addCase(receiveUserInfo, (state, action) => {
      state.userInfo = action.payload;
    })
    .addMatcher(
      isAnyOf(receiveUserSignUp, receiveUserLogOut),
      (state, action) => {
        return initialState;
      }
    );
});

// SELECTORS
export const selectUserInfo = (state) => {
  return state.session.userInfo;
};

export const selectSessionInfo = (state) => {
  const { isAuthenticated, user } = state.session;
  return { isAuthenticated, user };
};

export default sessionReducer;
