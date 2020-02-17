import axios from "axios";
import { BASE_URL } from "./urls";

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  config => {
  let token = localStorage.getItem('token');
  if (!!token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
}, error => {
  console.log(error);
  return Promise.reject(error)
  }
);

api.interceptors.response.use(
  response => {
    console.log(response);
    return response;
  }, error => {
    console.log(error.response);
    return Promise.reject(error)
  }
);
