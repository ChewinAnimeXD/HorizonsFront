import axios from "./axios";

export const getTasksRequest = async () => axios.get("/obtenerTasks");

export const createTaskRequest = async (task) => await axios.post("/tasks", task);

export const updateTaskRequest = async (id, task) => axios.put(`/tasks/${id}`, task);

export const deleteTaskRequest = async (id) => axios.delete(`/tasks/${id}`);

export const getTaskRequest = async (id) => axios.get(`/tasks/${id}`);


