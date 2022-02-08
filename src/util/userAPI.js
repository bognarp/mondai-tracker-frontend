import axios from 'axios';

const baseUrl = '/api/users';

const fetchCurrentUser = async () => {
  const res = await axios.get(`${baseUrl}/current`);
  return res.data;
};

const userAPI = { fetchCurrentUser };

export default userAPI;
