import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/api/projects`;

const fetchStories = async (projectId, category) => {
  const res = await axios.get(`${baseUrl}/${projectId}/stories/${category}`);
  return res.data;
};

const removeStory = async ({ projectId, storyId }) => {
  const res = await axios.delete(`${baseUrl}/${projectId}/stories/${storyId}`);
  return res.data;
};

const updateStory = async ({ projectId, storyId, patchObj }) => {
  const res = await axios.patch(
    `${baseUrl}/${projectId}/stories/${storyId}`,
    patchObj
  );
  return res.data;
};

const createStory = async ({ projectId, newStory }) => {
  const res = await axios.post(`${baseUrl}/${projectId}/stories`, newStory);
  return res.data;
};

const storyAPI = { fetchStories, removeStory, updateStory, createStory };

export default storyAPI;
