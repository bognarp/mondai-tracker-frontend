import { createAction } from '@reduxjs/toolkit';
import storyAPI from '../util/storyAPI';

export const fetchUserStories = createAction('stories/fetchUserStories');
export const fetchCurrentStories = createAction('stories/fetchCurrentStories');
export const fetchBacklogStories = createAction('stories/fetchBacklogStories');
export const fetchArchiveStories = createAction('stories/fetchArchiveStories');

export const receiveUserStories = createAction('stories/receiveUserStories');
export const receiveCurrentStories = createAction(
  'stories/receiveCurrentStories'
);
export const receiveBacklogStories = createAction(
  'stories/receiveBacklogStories'
);
export const receiveArchiveStories = createAction(
  'stories/receiveArchiveStories'
);

export const clearStories = createAction('stories/clearStories');
export const rejectStories = createAction('stories/rejectStories');

export const fetchProjectStories =
  (projectId, category, userId) => async (dispatch) => {
    // TODO: refactor this sphagette
    let fetchAction;
    let receiveAction;
    let url;

    if (category === 'current') {
      fetchAction = fetchCurrentStories;
      receiveAction = receiveCurrentStories;
      url = `${projectId}/stories/${category}`;
    }
    if (category === 'backlog') {
      fetchAction = fetchBacklogStories;
      receiveAction = receiveBacklogStories;
      url = `${projectId}/stories/${category}`;
    }
    if (category === 'archive') {
      fetchAction = fetchArchiveStories;
      receiveAction = receiveArchiveStories;
      url = `${projectId}/stories/${category}`;
    }
    if (userId && category === 'user') {
      fetchAction = fetchUserStories;
      receiveAction = receiveUserStories;
      url = `${projectId}/stories/${category}/${userId}`;
    }

    try {
      dispatch(fetchAction());
      const stories = await storyAPI.fetchStories(url);
      dispatch(receiveAction(stories));
    } catch (error) {
      // dispatch(rejectStories());
      console.log(error);
    }
  };
