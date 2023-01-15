import axios from "axios";
const API_URL = "http://amc-api.americasrf.com/api";

export const getAllProjects = async (token: string) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${API_URL}/project/get-all`, config);
  return response;
};

export const postProject = async (
  token: string,
  values: { name: string; description: string }
) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(`${API_URL}/project`, values, config);
  return response;
};

export const updateProject = async (
  token: string,
  projectId: string,
  values: any
) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.put(
    `${API_URL}/project/${projectId}`,
    values,
    config
  );
  return response;
};

export const deleteProject = async (token: string, projectId: string) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(
    `${API_URL}/project/${projectId}`,
    config
  );
  return response;
};
