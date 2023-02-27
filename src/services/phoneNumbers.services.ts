import axios from "axios";
import { API_URL } from "../utils/api-info";

export const getAllPhoneNumbers = async (token: string) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(`${API_URL}/phone-client/get-all`, config);
  return response;
};

export const postClientPhone = async (
  token: string,
  values: { name: string; description: string }
) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(`${API_URL}/phone-client`, values, config);
  return response;
};

export const updateClientPhone = async (
  token: string,
  phoneCliId: string,
  values: { name: string; description: string }
) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.put(
    `${API_URL}/phone-client/${phoneCliId}`,
    values,
    config
  );
  return response;
};

export const deleteClientPhone = async (token: string, clientPhone: string) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(
    `${API_URL}/phone-client/${clientPhone}`,
    config
  );
  return response;
};
