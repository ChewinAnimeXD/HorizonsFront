import axios from "./axios";

export const getCalificationsRequest = async () => axios.get("/califications");

export const createCalificationRequest = async (calification) => axios.post("/califications", calification);

export const updateCalificationRequest = async (id, calification) => axios.put(`/califications/${id}`, calification);

export const deleteCalificationRequest = async (id) => axios.delete(`/califications/${id}`);

export const getCalificationRequest = async (id) => axios.get(`/califications/${id}`);


