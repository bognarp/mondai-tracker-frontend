import { createReducer, isAnyOf } from '@reduxjs/toolkit';
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
    .addMatcher(
      isAnyOf(receiveUserSignUp, receiveUserLogOut),
      (state, action) => {
        return initialState;
      }
    );
});

export default sessionReducer;
