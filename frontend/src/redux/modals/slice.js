import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.type = payload;
    },
    closeModal: (state) => {
      state.type = null;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export const selectModalType = (state) => state.modals.type;
export default modalsSlice.reducer;
