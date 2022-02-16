import { createReducer } from '@reduxjs/toolkit';
import {
  clearProjects,
  fetchProjects,
  receiveProject,
  receiveProjects,
  rejectProjects,
} from '../actions/projectActions';

const initialState = {
  byId: {},
  allIds: [],
  status: 'idle',
};

const projectsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchProjects, (state, action) => {
      state.status = 'loading';
    })
    .addCase(receiveProjects, (state, action) => {
      const byId = action.payload.reduce((byId, project) => {
        byId[project._id] = project;
        return byId;
      }, {});
      state.byId = byId;
      state.allIds = Object.keys(byId);
      state.status = 'complete';
    })
    .addCase(receiveProject, (state, action) => {
      state.byId[action.payload._id] = action.payload;
      state.allIds.push(action.payload._id);
      state.status = 'complete';
    })
    .addCase(rejectProjects, (state, action) => {
      state.status = 'failed';
    })
    .addCase(clearProjects, (state, action) => {
      return initialState;
    });
});


export default projectsReducer;
