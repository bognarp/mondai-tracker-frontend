import axios from 'axios';

const baseUrl = '/api/users';

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

const signup = async (userData) => {
  const response = await axios.post(`${baseUrl}/signup`, userData);
  return response.data;
};

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

const sessionAPI = { setAuthToken, login, signup };

export default sessionAPI;
