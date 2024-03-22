import axios from "axios";

const API_URL = import.meta.env.VITE_ADMIN_AUTH_API_URL;

const adminLogin = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data.token) {
    localStorage.setItem("admin-token", response.data.token);
  }

  return { data: response.data.adminuserData };
};

const adminLogout = () => {
  localStorage.removeItem("admin-token");
};

const adminauthService = { adminLogin, adminLogout };

export default adminauthService;
