import { DefaultTheme } from "styled-components";

export const themeGlobal = {
  breakpoint_large: " 1920px",
  breakpoint_medium: "1440px",
  breakpoint_small: "960px",
  breakpoint_xsmall: "480px",
  white: "#F6F1F0",
  white_opacity: "rgba(255, 255, 255, 0.7)",
  dark: "#2C3333",
  primary: "#0E8388",
  primary_dark: "#2E4F4F",
  primary_light: "#CBE4DE",
  secondary: "#A2678A",
  secondary_dark: "#4D3C77",
  secondary_light: "#E19898",
  red: "#F05454",
  orange: "#F39F5A",
  yellow: "#F2F7A1",
  blue: "#4477CE",
  green: "#03C988",
  grey: "#404258",
  purple: "#451952",
  size1: "8px",
  size2: "12px",
  size3: "16px",
  size4: "24px",
  size5: "36px",
  size6: "54px",
  size7: "72px"
};

export const lightTheme: DefaultTheme = {
  body: themeGlobal.white,
  text: themeGlobal.dark,
  primaryColor: themeGlobal.primary,
  secondaryColor: themeGlobal.secondary
};

export const darkTheme: DefaultTheme = {
  body: themeGlobal.dark,
  text: themeGlobal.white,
  primaryColor: themeGlobal.secondary,
  secondaryColor: themeGlobal.primary
};
