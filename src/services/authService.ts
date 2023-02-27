import axios from "axios";
import { API_URL } from "../utils/api-info";

interface IUserData {
  email: string;
  password: string;
}

const login = async (userData: IUserData) => {
  return axios
    .post(`${API_URL}/login/authenticate-user`, userData)
    .then((response: any) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
};
export default authService;
