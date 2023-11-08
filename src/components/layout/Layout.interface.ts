import { ReactNode } from "react";

export interface ILayout {
  chat?: boolean;
  children: ReactNode;
}

export enum CurrentTheme {
  LIGHT = "light",
  DARK = "dark"
}

export type CurrentThemes = CurrentTheme.LIGHT | CurrentTheme.DARK;

export interface ThemeProviderProps {
  children: ReactNode;
  theme: CurrentThemes;
}

// theme.ts
export interface Theme {
  body: string;
  text: string;
  primaryColor: string;
}
