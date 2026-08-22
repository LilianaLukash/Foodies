import { http } from './http';
import { normalizeUser, unwrapList, unwrapPage, PAGE_LIMIT } from '../utils/helpers';

export const registerUser = (payload) => http.post('/auth/register', payload);
export const loginUser = (payload) => http.post('/auth/login', payload);
export const logoutUser = () => http.post('/auth/logout');

export const getCurrentUser = () => http.get('/users/current');
export const getUserById = (id) => http.get(`/users/${id}`);

export const updateAvatar = async (file) => {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    const dataUrl = await fileToDataUrl(file);
    return http.patch('/users/avatar', dataUrl);
  }
  const formData = new FormData();
  formData.append('avatar', file);
  return http.patch('/users/avatar', formData);
};

export const getFollowers = (id, page = 1, limit = PAGE_LIMIT) =>
  http.get(`/users/${id}/followers`, { page, limit });
export const getFollowing = (id, page = 1, limit = PAGE_LIMIT) =>
  http.get(`/users/${id}/following`, { page, limit });
export const followUser = (id) => http.post(`/users/${id}/follow`);
export const unfollowUser = (id) => http.delete(`/users/${id}/follow`);

export const getCategories = () => http.get('/categories');
export const getAreas = () => http.get('/areas');
export const getIngredients = () => http.get('/ingredients');
export const getTestimonials = () => http.get('/testimonials');

export const getRecipes = (params) => http.get('/recipes', params);
export const getRecipeById = (id) => http.get(`/recipes/${id}`);
export const getPopularRecipes = () => http.get('/recipes/popular');
export const getOwnRecipes = (page = 1, limit = PAGE_LIMIT) =>
  http.get('/recipes/own', { page, limit });
export const getFavoriteRecipes = (page = 1, limit = PAGE_LIMIT) =>
  http.get('/recipes/favorites', { page, limit });
export const getUserRecipes = (id, page = 1, limit = PAGE_LIMIT) =>
  http.get(`/recipes/user/${id}`, { page, limit });
export const createRecipe = (formData) => http.post('/recipes', formData);
export const updateRecipe = (id, formData) => http.put(`/recipes/${id}`, formData);
export const deleteRecipe = (id) => http.delete(`/recipes/${id}`);
export const addFavorite = (id) => http.post(`/recipes/${id}/favorite`);
export const removeFavorite = (id) => http.delete(`/recipes/${id}/favorite`);

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const asUser = (payload) => normalizeUser(payload?.user ?? payload);
export const asList = (payload, keys) => unwrapList(payload, keys);
export const asPage = (payload, keys) => unwrapPage(payload, keys);
