import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAdminUsers } from "../../api/admin";
import { ISignUpData } from "../../../interfaces/auth/auth.interface";

interface AdminState {
  admin: ISignUpData;
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  admin: {} as ISignUpData,
  loading: false,
  error: null
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    addAdmin: (state, action: PayloadAction<ISignUpData>) => {
      state.admin = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action: PayloadAction<ISignUpData[]>) => {
        state.loading = false;
        const firstAdmin = action.payload[0];
        state.admin = firstAdmin;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch admin users.";
      });
  }
});

export default adminSlice.reducer;
