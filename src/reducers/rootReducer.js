import { combineReducers } from '@reduxjs/toolkit';
import entitiesReducer from './entitiesReducer';
import errorsReducer from './errorsReducer';
import sessionReducer from './sessionReducer';

const rootReducer = combineReducers({
  entities: entitiesReducer,
  session: sessionReducer,
  errors: errorsReducer,
});

export default rootReducer;
