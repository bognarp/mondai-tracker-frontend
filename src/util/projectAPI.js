import axios from 'axios';

const baseUrl = '/api/projects';

const fetchProject = async (projectId) => {
  const res = await axios.get(`${baseUrl}/${projectId}`);
  return res.data;
};

const projectAPI = { fetchProject };

export default projectAPI;
