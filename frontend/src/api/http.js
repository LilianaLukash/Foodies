import axios from 'axios';
import { mockRequest } from './mock';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const axiosAPI = axios.create({
  baseURL: BASE_URL,
});

let authToken = localStorage.getItem('token');

export const setAuthToken = (token) => {
  authToken = token || null;
  if (token) localStorage.setItem('token', token);
  else localStorage.removeItem('token');
};

axiosAPI.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

const request = async (method, url, { data, params } = {}) => {
  const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
  if (USE_MOCK) {
    return mockRequest({ method, url, data, params, headers });
  }
  const response = await axiosAPI.request({ method, url, data, params });
  return response.data;
};

export const http = {
  get: (url, params) => request('get', url, { params }),
  post: (url, data) => request('post', url, { data }),
  patch: (url, data) => request('patch', url, { data }),
  delete: (url, data) => request('delete', url, { data }),
};

export default axiosAPI;
