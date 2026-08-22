import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  asUser,
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  updateAvatar,
} from '../../api/services';
import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  setAuthTokens,
} from '../../api/http';

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const data = await registerUser(credentials);

      setAuthTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      return {
        user: asUser(data),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const data = await loginUser(credentials);

      setAuthTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      return {
        user: asUser(data),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await logoutUser();
    } catch (error) {
      // Even if the server logout fails, clear the local session.
    } finally {
      clearAuthTokens();
    }

    return true;
  },
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    if (!getAccessToken() && !getRefreshToken()) {
      return thunkAPI.rejectWithValue('No token');
    }

    try {
      const data = await getCurrentUser();

      return asUser(data);
    } catch (error) {
      clearAuthTokens();

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const changeAvatar = createAsyncThunk(
  'auth/avatar',
  async (file, thunkAPI) => {
    try {
      const data = await updateAvatar(file);
      return asUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    user: null,
    isLoggedIn: false,
    isRefreshing: true,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isLoggedIn = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isLoggedIn = true;
        state.error = null;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.error = null;
      })

      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })

      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })

      .addCase(refreshUser.rejected, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })

      .addCase(changeAvatar.fulfilled, (state, { payload }) => {
        state.user = {
          ...state.user,
          ...payload,
        };
      })

      .addMatcher(
        (action) =>
          action.type.endsWith('/rejected') &&
          action.type.startsWith('auth/'),
        (state, { payload }) => {
          state.error = payload;
        },
      );
  },
});

export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;

export const selectIsLoggedIn = (state) =>
  state.auth.isLoggedIn;

export const selectIsRefreshing = (state) =>
  state.auth.isRefreshing;

export const selectAuthError = (state) =>
  state.auth.error;