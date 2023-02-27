import axios from "axios";
import { API_URL } from "../utils/api-info";

export const getAllUsers = async (token: string) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.get(`${API_URL}/user/get-all`, config);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postUser = async (
  token: string,
  values: { fullname: string; email: string; phoneNumber: string }
) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(`${API_URL}/user`, values, config);
  return response;
};

export const editUser = async (
  token: string,
  userId: string,
  //   values: { id: string; fullname: string; email: string; phoneNumber: string }
  values: any
) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.put(`${API_URL}/user/${userId}`, values, config);
  return response;
};

export const deleteUser = async (token: string, userId: string) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(`${API_URL}/user/${userId}`, config);
  return response;
};
