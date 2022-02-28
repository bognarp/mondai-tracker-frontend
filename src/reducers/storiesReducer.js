import { createReducer } from '@reduxjs/toolkit';
import {
  clearStories,
  createStory,
  fetchStories,
  receiveStories,
  rejectStories,
  removeStory,
  updateStory,
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
    .addCase(fetchStories, (state, action) => {
      const category = action.payload;
      state[category].status = 'loading';
    })
    .addCase(receiveStories, (state, action) => {
      const category = action.payload.category;
      const stories = action.payload.stories;

      const byId = stories.reduce((byId, story) => {
        byId[story._id] = story;
        return byId;
      }, {});
      state[category].byId = byId;
      state[category].allIds = Object.keys(byId);
      state[category].status = 'complete';
    })
    .addCase(rejectStories, (state, action) => {
      const category = action.payload;
      state[category].status = 'failed';
    })
    .addCase(createStory, (state, action) => {
      const { newStory, category } = action.payload;
      state[category].byId[newStory._id] = newStory;
      state[category].allIds.push(newStory._id);
      state[category].status = 'complete';
    })
    .addCase(updateStory, (state, action) => {
      const { updatedStory, category } = action.payload;
      state[category].byId[updatedStory._id] = updatedStory;
      state[category].status = 'complete';
    })
    .addCase(removeStory, (state, action) => {
      const { id, category } = action.payload;
      const allIds = state[category].allIds.filter((oldId) => oldId !== id);

      delete state[category].byId[id];
      state[category].allIds = allIds;
      state[category].status = 'complete';
    })
    .addCase(clearStories, (state, action) => {
      return initialState;
    });
});

export default storiesReducer;
