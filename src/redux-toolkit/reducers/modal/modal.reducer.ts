import { createSlice } from "@reduxjs/toolkit";

export interface IModalProps {
  isOpenModal: boolean;
}

const initialState: IModalProps = {
  isOpenModal: false
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpenModal = true;
    },
    closeModal: (state) => {
      state.isOpenModal = false;
    }
  }
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
