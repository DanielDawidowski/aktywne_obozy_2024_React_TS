import { ThemeProvider } from "styled-components";
import React, { ReactElement } from "react";
import { lightTheme, darkTheme, themeGlobal } from "./variables";
import { CurrentTheme, Theme, ThemeProviderProps } from "./Layout.interface";

const StyledThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme }): ReactElement => {
  const selectedTheme: Theme = theme === CurrentTheme.LIGHT ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={themeGlobal}>
      <ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>
    </ThemeProvider>
  );
};

export default StyledThemeProvider;
