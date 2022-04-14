import { createAction } from '@reduxjs/toolkit';
import { normalizeError } from '../util/normalizeError';

export const receiveErrors = createAction('errors/receiveError');
export const clearErrors = createAction('errors/clearErrors');

export const alertUserError = (error) => (dispatch) => {
  const errorResponse = normalizeError(error.response);
  dispatch(receiveErrors(errorResponse));

  setTimeout(() => {
    dispatch(clearErrors());
  }, 6000);
};
