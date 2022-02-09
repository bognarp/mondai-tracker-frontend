import { createAction } from '@reduxjs/toolkit';
import userAPI from '../util/userAPI';

export const receiveUserInfo = createAction('session/receiveUserInfo');

export const fetchUserInfo = () => async (dispatch) => {
  try {
    const userInfo = await userAPI.fetchCurrentUser();
    dispatch(receiveUserInfo(userInfo));
  } catch (error) {
    console.log(error);
  }
};
