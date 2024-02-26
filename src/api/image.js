import axios from "./axios";

export const createImageRequest = async (image) => axios.post("/create-user", image);

export const getImageRequest = async (id) => axios.get(`/users/${id}`);

export const getImagesRequest = async () => axios.get("/users");

export const deleteImageRequest = async (id) => axios.delete(`/deleteUsers/${id}`);

export const updateImageRequest = async (id, data) => axios.put(`/updateUsers/${id}`, data);
