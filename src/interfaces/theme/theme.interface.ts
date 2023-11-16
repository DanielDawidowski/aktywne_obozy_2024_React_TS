import { ReactNode } from "react";

export enum CurrentTheme {
  LIGHT = "light",
  DARK = "dark"
}

export type CurrentThemes = CurrentTheme.LIGHT | CurrentTheme.DARK;

export interface ThemeProviderProps {
  children: ReactNode;
}
