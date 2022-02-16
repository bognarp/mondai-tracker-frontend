import { createAction } from '@reduxjs/toolkit';
import { normalizeError } from '../util/normalizeError';
import projectAPI from '../util/projectAPI';
import userAPI from '../util/userAPI';
import { clearSessionErrors, receiveSessionErrors } from './sessionActions';

export const fetchProjects = createAction('projects/fetchProjects');
export const receiveProjects = createAction('projects/receiveProjects');
export const receiveProject = createAction('projects/receiveProject');
export const clearProjects = createAction('projects/clearProjects');
export const rejectProjects = createAction('projects/rejectProjects');

export const fetchUserProjects = (userId) => async (dispatch) => {
  try {
    const userProjects = await userAPI.fetchProjectsByUserId(userId);
    dispatch(receiveProjects(userProjects));
  } catch (error) {
    console.log(error);
  }
};

export const fetchProjectById = (projectId) => async (dispatch) => {
  try {
    dispatch(fetchProjects());
    const project = await projectAPI.fetchProject(projectId);
    dispatch(receiveProject(project));
  } catch (error) {
    const errorResponse = normalizeError(error.response);
    dispatch(receiveSessionErrors(errorResponse));

    setTimeout(() => {
      dispatch(clearSessionErrors());
    }, 4000);
  }
};
