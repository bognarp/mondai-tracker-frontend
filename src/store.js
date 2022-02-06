import { combineReducers, configureStore } from '@reduxjs/toolkit';
import errorsReducer from './reducers/errorsReducer';
import sessionReducer from './reducers/sessionReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  errors: errorsReducer,
});

export default configureStore({
  reducer: rootReducer,
});
