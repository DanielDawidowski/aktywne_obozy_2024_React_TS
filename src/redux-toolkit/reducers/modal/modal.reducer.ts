import { createSlice } from "@reduxjs/toolkit";

export interface IModalProps {
  isOpen: boolean;
}

const initialState: IModalProps = {
  isOpen: false
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    }
  }
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;