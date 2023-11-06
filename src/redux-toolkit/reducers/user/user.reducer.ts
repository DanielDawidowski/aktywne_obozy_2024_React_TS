import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ILoginUser, ISignUpData } from "../../../interfaces/auth/auth.interface";

const loadUserFromLocalStorage = (): ISignUpData => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const loadTokenFromLocalStorage = (): string => {
  const token = localStorage.getItem("token");
  return token || "";
};

const initialState: ILoginUser = {
  token: loadTokenFromLocalStorage(),
  profile: loadUserFromLocalStorage()
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<ILoginUser>) => {
      const { token, profile } = action.payload;
      localStorage.setItem("user", JSON.stringify(profile));
      state.token = token;
      state.profile = profile;
    },
    clearUser: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.token = "";
      state.profile = {} as ISignUpData;
      localStorage.removeItem("selectedChatUser");
    }
  }
});

export const { addUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
