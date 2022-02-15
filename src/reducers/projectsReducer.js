import { createReducer } from '@reduxjs/toolkit';
import {
  clearProjects,
  receiveProject,
  receiveProjects,
} from '../actions/projectActions';

const initialState = {
  byId: {},
  allIds: [],
};

const projectsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(receiveProjects, (state, action) => {
      const byId = action.payload.reduce((byId, project) => {
        byId[project._id] = project;
        return byId;
      }, {});
      state.byId = byId;
      state.allIds = Object.keys(byId);
    })
    .addCase(receiveProject, (state, action) => {
      state.byId[action.payload._id] = action.payload;
      state.allIds.push(action.payload._id);
    })
    .addCase(clearProjects, (state, action) => {
      return initialState;
    });
});

// SELECTORS

export const selectProjects = (state) => {
  return state.entities.projects;
};

export default projectsReducer;
