import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND;
const token = localStorage.getItem("token");

const fetchCartitemsByUser = async (id) => {
  const response = await axios.get(API_URL + "/cart/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (response.data.cart) {
    return { data: response.data.cart };
  }
};

const postCartitemsbyUser = async (cartdata, id) => {
  const response = await axios.post(
    API_URL + "/cart/" + id,
    { cartdata: cartdata },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return { message: response.data.message };
};

const cartServices = { fetchCartitemsByUser, postCartitemsbyUser };

export default cartServices;
