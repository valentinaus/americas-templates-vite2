import axios from "axios";
const API_URL = "http://amc-api.americasrf.com/api";

export const getAllTemplates = async (token: string) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${API_URL}/template/get-all`, config);
  return response;
};

export const getTemplateInfo = async (token: string, templateId: string) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${API_URL}/template/${templateId}`, config);
  return response;
};

export const postTemplate = async (
  token: string,
  values: { name: string; description: string }
) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(`${API_URL}/template`, values, config);
  return response;
};

export const editTemplate = async (
  token: string,
  templateId: string,
  //   values: { id: string; fullname: string; email: string; phoneNumber: string }
  values: any
) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.put(
    `${API_URL}/template/${templateId}`,
    values,
    config
  );
  return response;
};

export const deleteTemplate = async (token: string, templateId: string) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(
    `${API_URL}/template/${templateId}`,
    config
  );
  return response;
};

export const postPicsToTemplate = async (
  token: string,
  values: any,
  tempId: string
) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(
    `${API_URL}/template/${tempId}/assign-photos`,
    values,
    config
  );
  return response;
};
