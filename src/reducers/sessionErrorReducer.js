import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import {
  clearSessionErrors,
  receiveCurrentUser,
  receiveSessionErrors,
} from '../actions/sessionActions';

const _nullErrors = [];

const sessionErrorReducer = createReducer(_nullErrors, (builder) => {
  builder
    .addCase(receiveSessionErrors, (state, action) => {
      state.push(action.payload);
    })
    .addMatcher(
      isAnyOf(receiveCurrentUser, clearSessionErrors),
      (state, action) => {
        return _nullErrors;
      }
    );
});

export default sessionErrorReducer;
