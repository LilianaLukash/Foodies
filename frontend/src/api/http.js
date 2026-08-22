import axios from 'axios';
import { STORAGE_KEYS } from '@constants';
import { storage } from '@utils/storage';
import { mockRequest } from './mock';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';
const BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const axiosAPI = axios.create({
  baseURL: BASE_URL,
});

let accessToken = storage.get(STORAGE_KEYS.ACCESS_TOKEN);
let refreshToken = storage.get(STORAGE_KEYS.REFRESH_TOKEN);

export const setAuthTokens = (tokens = {}) => {
  accessToken = tokens.accessToken || null;
  refreshToken = tokens.refreshToken || null;

  if (accessToken) storage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  else storage.remove(STORAGE_KEYS.ACCESS_TOKEN);

  if (refreshToken) storage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  else storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
};

export const clearAuthTokens = () => {
  accessToken = null;
  refreshToken = null;

  storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
  storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
};

export const getAccessToken = () => accessToken;

export const getRefreshToken = () => refreshToken;

axiosAPI.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

let refreshPromise = null;

axiosAPI.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      originalRequest?._retry ||
      originalRequest?.url === '/auth/refresh' ||
      !refreshToken
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = axios
          .post(`${BASE_URL}/auth/refresh`, {
            refreshToken,
          })
          .then((response) => {
            const newAccessToken = response.data.accessToken;

            setAuthTokens({
              accessToken: newAccessToken,
              refreshToken,
            });

            return newAccessToken;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newAccessToken = await refreshPromise;

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return axiosAPI(originalRequest);
    } catch (refreshError) {
      clearAuthTokens();
      return Promise.reject(refreshError);
    }
  },
);

const request = async (method, url, { data, params } = {}) => {
  const headers = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : {};

  if (USE_MOCK) {
    return mockRequest({
      method,
      url,
      data,
      params,
      headers,
    });
  }

  const response = await axiosAPI.request({
    method,
    url,
    data,
    params,
  });

  return response.data;
};

export const http = {
  get: (url, params) => request('get', url, { params }),
  post: (url, data) => request('post', url, { data }),
  put: (url, data) => request('put', url, { data }),
  patch: (url, data) => request('patch', url, { data }),
  delete: (url, data) => request('delete', url, { data }),
};

export default axiosAPI;