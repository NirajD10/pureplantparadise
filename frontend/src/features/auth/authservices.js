import axios from "axios";
import { reset } from "./authSlices";

const API_URL = import.meta.env.VITE_AUTH_API_URL;

const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return { data: response.data.userdata };
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return { data: response.data.userdata };
};

const logout = () => {
  localStorage.removeItem("token");
};

const authService = { register, login, logout };

export default authService;
