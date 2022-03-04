import { createAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { normalizeError } from '../util/normalizeError';
import sessionAPI from '../util/sessionAPI';

export const receiveCurrentUser = createAction('session/receiveCurrentUser');
export const receiveUserSignUp = createAction('session/receiveUserSignUp');
export const receiveUserLogOut = createAction('session/receiveUserLogOut');
export const receiveSessionErrors = createAction(
  'sessionError/receiveSessionErrors'
);
export const clearSessionErrors = createAction(
  'sessionError/clearSessionErrors'
);

export const login = (user) => async (dispatch) => {
  try {
    const response = await sessionAPI.login(user);

    localStorage.setItem('jwtToken', response.token);
    sessionAPI.setAuthToken(response.token);
    const decodedUser = jwtDecode(response.token);

    dispatch(receiveCurrentUser(decodedUser));
  } catch (error) {
    const errorResponse = normalizeError(error.response);
    dispatch(receiveSessionErrors(errorResponse));

    setTimeout(() => {
      dispatch(clearSessionErrors());
    }, 4000);
  }
};

export const signup = (user) => async (dispatch) => {
  try {
    const res = await sessionAPI.signup(user);
    dispatch(receiveUserSignUp());
    return res;
  } catch (error) {
    const errorResponse = normalizeError(error.response);
    dispatch(receiveSessionErrors(errorResponse));

    setTimeout(() => {
      dispatch(clearSessionErrors());
    }, 4000);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  sessionAPI.setAuthToken(false);
  dispatch(receiveUserLogOut());
};
