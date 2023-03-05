import axios from "axios";
import { API_URL } from "../utils/api-info";

export const postForgotPassword = async (values: { email: string }) => {
  const response = await axios.post(`${API_URL}/login/forgot-password`, values);
  return response;
};

export const postResetPassword = async (values: {
  email: string;
  token: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/login/reset-password`, values);
  return response;
};

export const postChangePassword = async (
  token: string,
  values: { email: string; oldPassword: string; newPassword: string }
) => {
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(
    `${API_URL}/login/change-password`,
    values,
    config
  );
  return response;
};
