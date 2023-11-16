import { DefaultTheme, ThemeProvider } from "styled-components";
import React, { ReactElement } from "react";
import { lightTheme, darkTheme, themeGlobal } from "./variables";
import { CurrentTheme, ThemeProviderProps } from "../../interfaces/theme/theme.interface";
import { useAppSelector } from "../../redux-toolkit/hooks";

const StyledThemeProvider: React.FC<ThemeProviderProps> = ({ children }): ReactElement => {
  const theme = useAppSelector((state) => state.theme.mode);

  const selectedTheme: DefaultTheme = theme === CurrentTheme.LIGHT ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeGlobal}>
      <ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>
    </ThemeProvider>
  );
};

export default StyledThemeProvider;
