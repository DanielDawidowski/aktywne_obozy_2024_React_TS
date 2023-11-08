import React, { FC, ReactElement, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ILayout, CurrentThemes, CurrentTheme } from "./Layout.interface";
import { LayoutStyles } from "./LayoutStyles";
import Header from "../navs/header/Header";
import Navigation from "../navs/navigation/Navigation";
import StyledThemeProvider from "./StyledThemeProvider";
import { TypographyStyles } from "../globalStyles/typographyStyles";
import { GlobalStyles } from "../globalStyles/globalStyles";
import useLocalStorage from "../../hooks/useLocalStorage";

const Layout: FC<ILayout> = ({ children, chat = true }): ReactElement => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [theme, setTheme] = useState<CurrentThemes>(CurrentTheme.LIGHT);
  const themeStorage = useLocalStorage<CurrentThemes | null>("theme");

  const toggleTheme = (): void => {
    setTheme((prevTheme): CurrentThemes => {
      return prevTheme === CurrentTheme.DARK ? CurrentTheme.LIGHT : CurrentTheme.DARK;
    });
    themeStorage.set(theme);
  };

  useEffect(() => {
    const getTheme: CurrentThemes | null = themeStorage.get();
    console.log(getTheme);
    if (getTheme) {
      setTheme(getTheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledThemeProvider theme={theme}>
      <LayoutStyles>
        <GlobalStyles />
        <TypographyStyles />
        {/* {(profile?.role !== "admin" || chat) && (
        <div className="chat">
          <ChatBox isOpenChat={isOpenChat} />
        </div>
      )} */}
        <Header toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} toggleTheme={toggleTheme} />
        <Navigation toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
        <main>{children}</main>
      </LayoutStyles>
    </StyledThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  chat: PropTypes.bool
};

export default Layout;
