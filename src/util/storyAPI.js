import axios from 'axios';

const baseUrl = '/api/projects';

const fetchStories = async (url) => {
  const res = await axios.get(`${baseUrl}/${url}`);
  return res.data;
};

const storyAPI = { fetchStories };

export default storyAPI;
