import axios from 'axios';

const baseUrl = '/api/users';

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

const signup = (userData) => {
  return axios.post(`${baseUrl}/signup`, userData);
};

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

const APIUtil = { setAuthToken, login, signup };

export default APIUtil;
