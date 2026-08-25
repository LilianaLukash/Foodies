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
let refreshPromise = null;

const getTokenExpiresAt = (token) => {
  try {
    const payload = token.split('.')[1];
    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = JSON.parse(atob(normalizedPayload));

    return decodedPayload.exp ? decodedPayload.exp * 1000 : null;
  } catch {
    return null;
  }
};

const isTokenExpired = (token) => {
  if (!token) return true;

  const expiresAt = getTokenExpiresAt(token);

  return expiresAt ? expiresAt <= Date.now() + 30000 : false;
};

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

const refreshAccessToken = () => {
  if (!refreshToken) return Promise.reject(new Error('No refresh token'));

  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${BASE_URL}/auth/refresh`, {
        refreshToken,
      })
      .then((response) => {
        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken || refreshToken;

        setAuthTokens({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });

        return newAccessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

axiosAPI.interceptors.request.use(async (config) => {
  if (
    config.url !== '/auth/refresh' &&
    refreshToken &&
    isTokenExpired(accessToken)
  ) {
    await refreshAccessToken();
  }

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

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
      const newAccessToken = await refreshAccessToken();

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
