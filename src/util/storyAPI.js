import axios from 'axios';

const baseUrl = '/api/projects';

const fetchStories = async (url) => {
  const res = await axios.get(`${baseUrl}/${url}`);
  return res.data;
};

const removeStory = async (url) => {
  const res = await axios.delete(`${baseUrl}/${url}`);
  return res.data;
};

const updateStory = async (url, body) => {
  const res = await axios.patch(`${baseUrl}/${url}`, body);
  return res.data;
};

const createStory = async (url, body) => {
  const res = await axios.post(`${baseUrl}/${url}`, body);
  return res.data;
};

const storyAPI = { fetchStories, removeStory, updateStory, createStory };

export default storyAPI;
