import { combineReducers } from '@reduxjs/toolkit';
import errorReducer from './errorReducer';
import sessionReducer from './sessionReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  errors: errorReducer,
});

export default rootReducer;
