import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import {
  asUser,
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  updateAvatar,
} from '../../api/services';
import { setAuthToken } from '../../api/http';

const storage = {
  getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
  setItem: (key, value) => {
    window.localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key) => {
    window.localStorage.removeItem(key);
    return Promise.resolve();
  },
};

export const register = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
  try {
    const data = await registerUser(credentials);
    const token = data.token ?? data.accessToken;
    setAuthToken(token);
    return { token, user: asUser(data) };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const data = await loginUser(credentials);
    const token = data.token ?? data.accessToken;
    setAuthToken(token);
    return { token, user: asUser(data) };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await logoutUser();
  } catch {
    /* always log out on client */
  } finally {
    setAuthToken(null);
  }
  return true;
});

export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  if (!token) return thunkAPI.rejectWithValue('No token');
  setAuthToken(token);
  try {
    const data = await getCurrentUser();
    return asUser(data);
  } catch (error) {
    setAuthToken(null);
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const changeAvatar = createAsyncThunk('auth/avatar', async (file, thunkAPI) => {
  try {
    const data = await updateAvatar(file);
    return asUser(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isLoggedIn: false,
    isRefreshing: true,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })
      .addCase(changeAvatar.fulfilled, (state, { payload }) => {
        state.user = { ...state.user, ...payload };
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected') && action.type.startsWith('auth/'),
        (state, { payload }) => {
          state.error = payload;
        },
      );
  },
});

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export default persistReducer(persistConfig, authSlice.reducer);

export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectAuthError = (state) => state.auth.error;
