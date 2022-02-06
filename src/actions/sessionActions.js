import { createAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import APIUtil from '../util/sessionAPI';

// ACTION CREATORS
export const receiveCurrentUser = createAction('session/receiveCurrentUser');
export const receiveUserSignUp = createAction('session/receiveUserSignUp');
export const receiveUserLogOut = createAction('session/receiveUserLogOut');
export const receiveSessionErrors = createAction(
  'sessionError/receiveSessionErrors'
);
export const clearSessionErrors = createAction(
  'sessionError/clearSessionErrors'
);

// THUNK ACTION CREATORS
export const login = (user) => async (dispatch) => {
  try {
    const response = await APIUtil.login(user);

    localStorage.setItem('jwtToken', response.token);
    APIUtil.setAuthToken(response.token);
    const decodedUser = jwtDecode(response.token);

    console.log('Decoded user', decodedUser);
    dispatch(receiveCurrentUser(decodedUser));
  } catch (error) {
    dispatch(receiveSessionErrors(error.response.data));

    setTimeout(() => {
      dispatch(clearSessionErrors());
    }, 4000);
  }
};
