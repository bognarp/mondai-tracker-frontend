import axios from 'axios';

const baseUrl = '/api/users';

const fetchCurrentUser = async () => {
  const res = await axios.get(`${baseUrl}/current`);
  return res.data;
};

const fetchUserById = async ({ userId, fields }) => {
  const res = await axios.get(
    `${baseUrl}/${userId}?fields=${fields.join(',')}`
  );
  return res.data;
};

const queryUsers = async (query) => {
  const res = await axios.get(`${baseUrl}?q=${query}`);
  return res.data;
};

const fetchProjectsByUserId = async (userId) => {
  const res = await axios.get(`${baseUrl}/${userId}/projects`);
  return res.data;
};

const updateUser = async ({ userId, patchObj }) => {
  const res = await axios.patch(`${baseUrl}/${userId}`, patchObj);
  return res.data;
};

const inviteUser = async ({ userId, projectId }) => {
  const res = await axios.post(`${baseUrl}/${userId}/invites`, {
    project: projectId,
  });
  return res;
};

const removeInvite = async ({ userId, inviteId }) => {
  const res = await axios.delete(`${baseUrl}/${userId}/invites/${inviteId}`);
  return res;
};

const userAPI = {
  fetchCurrentUser,
  fetchUserById,
  queryUsers,
  fetchProjectsByUserId,
  updateUser,
  inviteUser,
  removeInvite,
};

export default userAPI;
