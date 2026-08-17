import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { asList, getAreas, getCategories, getIngredients } from '../../api/services';

export const fetchCategories = createAsyncThunk('filters/categories', async (_, thunkAPI) => {
  try {
    const data = await getCategories();
    return asList(data, ['categories']);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const fetchAreas = createAsyncThunk('filters/areas', async (_, thunkAPI) => {
  try {
    const data = await getAreas();
    return asList(data, ['areas']);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const fetchIngredients = createAsyncThunk('filters/ingredients', async (_, thunkAPI) => {
  try {
    const data = await getIngredients();
    return asList(data, ['ingredients']);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    categories: [],
    areas: [],
    ingredients: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.categories = payload;
      })
      .addCase(fetchAreas.fulfilled, (state, { payload }) => {
        state.areas = payload;
      })
      .addCase(fetchIngredients.fulfilled, (state, { payload }) => {
        state.ingredients = payload;
      });
  },
});

export default filtersSlice.reducer;
export const selectCategories = (state) => state.filters.categories;
export const selectAreas = (state) => state.filters.areas;
export const selectIngredients = (state) => state.filters.ingredients;
