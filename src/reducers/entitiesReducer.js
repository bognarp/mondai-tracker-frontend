import { combineReducers } from '@reduxjs/toolkit';
import projectsReducer from './projectsReducer';

const entitiesReducer = combineReducers({
  projects: projectsReducer,
  // users: usersReducer,
});

export default entitiesReducer;
