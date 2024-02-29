import axios from "./axios";

export const registerRequest = (user) => axios.post(`/register`, user);


export const loginRequest = (user) => {
  return axios.post(`/login`, user).then((response) => {
    const token = response.data.token;
    console.log("aca esta el token", token)
    axios.defaults.headers.common["autentification"] = token;

    return response;
  });
};

export const verityTokenRequest = () => axios.get("/verify");

export const deleteUserRequest = async (id) => axios.delete(`/userPage/${id}`);

export const getUsersRequest = async () => axios.get("/userPage");

export const updateUserRequest = async (id, user) =>
  axios.put(`/register/${id}`, user);

export const getUserRequest = async (id) => axios.get(`/register/${id}`);
