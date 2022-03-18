import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import { clearErrors, receiveErrors } from '../actions/errorActions';
import { receiveCurrentUser } from '../actions/sessionActions';

const _nullErrors = [];

const errorReducer = createReducer(_nullErrors, (builder) => {
  builder
    .addCase(receiveErrors, (state, action) => {
      state.push(action.payload);
    })
    .addMatcher(isAnyOf(receiveCurrentUser, clearErrors), (state, action) => {
      return _nullErrors;
    });
});

export default errorReducer;
