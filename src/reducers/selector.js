// PROJECTS
export const selectProjects = (state) => {
  return state.entities.projects;
};

export const selectProjectById = (id) => (state) => {
  return state.entities.projects.byId[id];
};

export const selectProjectStatus = (state) => {
  return state.entities.projects.status;
};

// SESSION
export const selectUserInfo = (state) => {
  return state.session.userInfo;
};

export const selectSessionInfo = (state) => {
  const { isAuthenticated, user } = state.session;
  return { isAuthenticated, user };
};
