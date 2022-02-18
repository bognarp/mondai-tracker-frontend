// PROJECTS
export const selectProjects = (state) => {
  return state.entities.projects;
};

export const selectProjectById = (id) => (state) => {
  return state.entities.projects.byId[id];
};

export const selectProjectsStatus = (state) => {
  return state.entities.projects.status;
};

// STORIES
export const selectStoriesByCategory = (category) => (state) => {
  // 'current', 'user', 'backlog', 'archive'
  return state.entities.stories[category];
};

// SESSION
export const selectUserInfo = (state) => {
  return state.session.userInfo;
};

export const selectSessionInfo = (state) => {
  const { isAuthenticated, user } = state.session;
  return { isAuthenticated, user };
};
