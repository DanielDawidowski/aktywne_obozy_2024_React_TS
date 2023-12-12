import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IModalProps {
  isModalOpen: boolean;
  isCookieModalOpen: boolean;
}

const initialState: IModalProps = {
  isModalOpen: false,
  isCookieModalOpen: false
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.isCookieModalOpen = false;
    },
    toggleCookieModal: (state, action: PayloadAction<boolean>) => {
      state.isCookieModalOpen = action.payload;
    }
  }
});

export const { openModal, closeModal, toggleCookieModal } = modalSlice.actions;
export default modalSlice.reducer;
