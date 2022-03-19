import axios from 'axios';

const baseUrl = '/api/users';

const fetchCurrentUser = async () => {
  const res = await axios.get(`${baseUrl}/current`);
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

const userAPI = { fetchCurrentUser, fetchProjectsByUserId, updateUser };

export default userAPI;
