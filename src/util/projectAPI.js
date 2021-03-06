import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/api/projects`;

const fetchProject = async (projectId) => {
  const res = await axios.get(`${baseUrl}/${projectId}`);
  return res.data;
};

const createProject = async (project) => {
  const res = await axios.post(baseUrl, project);
  return res.data;
};

const updateProject = async ({ projectId, patchObj }) => {
  const res = await axios.patch(`${baseUrl}/${projectId}`, patchObj);
  return res.data;
};

const removeProject = async (projectId) => {
  const res = await axios.delete(`${baseUrl}/${projectId}`);
  return res.data;
};

const acceptInvite = async ({ projectId, userId }) => {
  const res = await axios.post(`${baseUrl}/${projectId}/members/${userId}`);
  return res.data;
};

const removeUserFromProject = async ({ projectId, userId }) => {
  const res = await axios.delete(`${baseUrl}/${projectId}/members/${userId}`);
  return res.data;
};

const projectAPI = {
  fetchProject,
  createProject,
  updateProject,
  removeProject,
  acceptInvite,
  removeUserFromProject,
};

export default projectAPI;
