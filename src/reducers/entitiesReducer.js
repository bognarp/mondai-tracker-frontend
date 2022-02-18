import { combineReducers } from '@reduxjs/toolkit';
import projectsReducer from './projectsReducer';
import storiesReducer from './storiesReducer';

const entitiesReducer = combineReducers({
  projects: projectsReducer,
  stories: storiesReducer,
  // users: usersReducer,
});

export default entitiesReducer;
