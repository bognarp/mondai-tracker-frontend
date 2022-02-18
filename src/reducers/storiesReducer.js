import { createReducer } from '@reduxjs/toolkit';
import {
  clearStories,
  fetchArchiveStories,
  fetchBacklogStories,
  fetchCurrentStories,
  fetchUserStories,
  receiveArchiveStories,
  receiveBacklogStories,
  receiveCurrentStories,
  receiveUserStories,
  rejectStories,
} from '../actions/storyActions';

const initialState = {
  current: {
    byId: {},
    allIds: [],
    status: 'idle',
  },
  user: {
    byId: {},
    allIds: [],
    status: 'idle',
  },
  backlog: {
    byId: {},
    allIds: [],
    status: 'idle',
  },
  archive: {
    byId: {},
    allIds: [],
    status: 'idle',
  },
};

const storiesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(rejectStories, (state, action) => {
      state.status = 'failed';
    })
    .addCase(fetchUserStories, (state, action) => {
      state.user.status = 'loading';
    })
    .addCase(fetchCurrentStories, (state, action) => {
      state.current.status = 'loading';
    })
    .addCase(fetchBacklogStories, (state, action) => {
      state.backlog.status = 'loading';
    })
    .addCase(fetchArchiveStories, (state, action) => {
      state.archive.status = 'loading';
    })
    .addCase(receiveUserStories, (state, action) => {
      const byId = action.payload.reduce((byId, story) => {
        byId[story._id] = story;
        return byId;
      }, {});
      state.user.byId = byId;
      state.user.allIds = Object.keys(byId);
      state.user.status = 'complete';
    })
    .addCase(receiveCurrentStories, (state, action) => {
      const byId = action.payload.reduce((byId, story) => {
        byId[story._id] = story;
        return byId;
      }, {});
      state.current.byId = byId;
      state.current.allIds = Object.keys(byId);
      state.current.status = 'complete';
    })
    .addCase(receiveBacklogStories, (state, action) => {
      const byId = action.payload.reduce((byId, story) => {
        byId[story._id] = story;
        return byId;
      }, {});
      state.backlog.byId = byId;
      state.backlog.allIds = Object.keys(byId);
      state.backlog.status = 'complete';
    })
    .addCase(receiveArchiveStories, (state, action) => {
      const byId = action.payload.reduce((byId, story) => {
        byId[story._id] = story;
        return byId;
      }, {});
      state.archive.byId = byId;
      state.archive.allIds = Object.keys(byId);
      state.archive.status = 'complete';
    })
    .addCase(clearStories, (state, action) => {
      return initialState;
    });
});

export default storiesReducer;
