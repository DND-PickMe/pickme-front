import axios from "axios";
import { BASE_URL } from "./urls";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 1000
});

api.interceptors.request.use(config => {
  let token = localStorage.getItem('token');
  if (!!token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
}, error => {
  console.log(error);
  return Promise.reject(error)
});

api.interceptors.request.use(response => {
  console.log(response);
  return response;
});
