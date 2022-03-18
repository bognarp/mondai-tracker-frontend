import { createAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import sessionAPI from '../util/sessionAPI';
import { alertUserError } from './errorActions';

export const receiveCurrentUser = createAction('session/receiveCurrentUser');
export const receiveUserSignUp = createAction('session/receiveUserSignUp');
export const receiveUserLogOut = createAction('session/receiveUserLogOut');

export const login = (user) => async (dispatch) => {
  try {
    const response = await sessionAPI.login(user);

    localStorage.setItem('jwtToken', response.token);
    sessionAPI.setAuthToken(response.token);
    const decodedUser = jwtDecode(response.token);

    dispatch(receiveCurrentUser(decodedUser));
  } catch (error) {
    alertUserError(error);
  }
};

export const signup = (user) => async (dispatch) => {
  try {
    const res = await sessionAPI.signup(user);
    dispatch(receiveUserSignUp());
    return res;
  } catch (error) {
    alertUserError(error);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  sessionAPI.setAuthToken(false);
  dispatch(receiveUserLogOut());
};
