import { createSlice } from "@reduxjs/toolkit";
import { CurrentTheme, CurrentThemes } from "../../../interfaces/theme/theme.interface";

interface ThemeState {
  mode: CurrentThemes;
}

const storedTheme = localStorage.getItem("theme");
const initialState: ThemeState = {
  mode: (storedTheme as CurrentThemes) || CurrentTheme.LIGHT
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === CurrentTheme.LIGHT ? CurrentTheme.DARK : CurrentTheme.LIGHT;
      localStorage.setItem("theme", state.mode);
    }
  }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
