import { combineReducers } from '@reduxjs/toolkit';
import errorsReducer from './errorsReducer';
import sessionReducer from './sessionReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  errors: errorsReducer,
});

export default rootReducer;
