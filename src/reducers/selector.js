export const selectSessionInfo = (state) => {
  const { isAuthenticated, user } = state.session;
  return { isAuthenticated, user };
};
