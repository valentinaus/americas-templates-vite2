import axios from "axios";
import { API_URL } from "../utils/api-info";

export const postForgotPassword = async (
  //   token: string,
  values: { email: string }
) => {
  //   let config = {
  //     headers: { Authorization: `Bearer ${token}` },
  //   };
  const response = await axios.post(
    `${API_URL}/login/forgot-password`,
    values
    // config
  );
  return response;
};
