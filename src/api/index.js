import axios from 'axios';
import {BASE_URL} from './urls';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});
