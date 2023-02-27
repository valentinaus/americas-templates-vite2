import axios from "axios";
import { API_URL } from "../utils/api-info";

export const getAllSites = async (token: string) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${API_URL}/site/get-all`, config);
  return response;
};

export const postSite = async (
  token: string,
  values: { name: string; latitude: string; longitude: string }
) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(`${API_URL}/site`, values, config);
  return response;
};

export const updateSite = async (
  token: string,
  siteId: string,
  values: any
) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.put(`${API_URL}/site/${siteId}`, values, config);
  return response;
};

export const deleteSite = async (token: string, userId: string) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(`${API_URL}/site/${userId}`, config);
  return response;
};
