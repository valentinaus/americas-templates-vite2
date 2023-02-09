import axios from "axios";
const API_URL = "http://amc-api.americasrf.com/api";

export const getAllPictures = async (
  token: string,
  currentPage?: number,
  searchedName?: string
) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(
    `${API_URL}/photo/get-all/?pageNumber=${currentPage}&name=${searchedName}`,
    config
  );
  return response;
};

export const postPicture = async (
  token: string,
  values: { name: string; description: string; base64Image: string }
) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(`${API_URL}/photo`, values, config);
  return response;
};

export const deletePicture = async (token: string, picId: string) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(`${API_URL}/photo/${picId}`, config);
  return response;
};
