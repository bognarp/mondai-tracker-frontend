import { combineReducers } from '@reduxjs/toolkit';
import sessionErrorReducer from './sessionErrorReducer';

const errorsReducer = combineReducers({
  session: sessionErrorReducer,
});

export default errorsReducer;
