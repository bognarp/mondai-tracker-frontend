import { createAction } from '@reduxjs/toolkit';
import storyAPI from '../util/storyAPI';

export const fetchStories = createAction('stories/fetchStories');
export const receiveStories = createAction('stories/receiveStories');
export const removeStory = createAction('stories/removeStory');
export const updateStory = createAction('stories/updateStory');
export const createStory = createAction('stories/createStory');
export const clearStories = createAction('stories/clearStories');
export const rejectStories = createAction('stories/rejectStories');

export const fetchProjectStories =
  (projectId, category, userId) => async (dispatch) => {
    let url = `${projectId}/stories/${category}`;

    if (userId && category === 'user') {
      url = `${projectId}/stories/current?owner=${userId}`;
    }

    try {
      dispatch(fetchStories(category));
      const stories = await storyAPI.fetchStories(url);
      dispatch(receiveStories({ category, stories }));
    } catch (error) {
      dispatch(rejectStories(category));
      console.log(error);
    }
  };

export const deleteProjectStory =
  (projectId, storyId, category) => async (dispatch) => {
    const url = `${projectId}/stories/${storyId}`;
    try {
      dispatch(fetchStories(category));
      await storyAPI.removeStory(url);
      dispatch(removeStory({ id: storyId, category }));
    } catch (error) {
      console.log(error);
    }
  };

export const updateProjectStory =
  (story, projectId, storyId, category) => async (dispatch) => {
    const url = `${projectId}/stories/${storyId}`;
    try {
      dispatch(fetchStories(category));
      const updatedStory = await storyAPI.updateStory(url, story);
      dispatch(updateStory({ category, updatedStory }));
    } catch (error) {
      console.log(error);
    }
  };

export const createProjectStory =
  (story, projectId, category) => async (dispatch) => {
    const url = `${projectId}/stories`;
    try {
      dispatch(fetchStories(category));
      const newStory = await storyAPI.createStory(url, story);
      dispatch(createStory({ category, newStory }));
    } catch (error) {
      console.log(error);
    }
  };
