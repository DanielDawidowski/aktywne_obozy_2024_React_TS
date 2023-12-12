import React, { ReactElement, useState, useEffect } from "react";
import type { FC } from "react";
import PropTypes from "prop-types";
import { ICookieData, ILayout } from "./Layout.interface";
import { LayoutStyles } from "./Layout.styles";
import Header from "../navs/header/Header";
import Navigation from "../navs/navigation/Navigation";
import StyledThemeProvider from "./StyledThemeProvider";
import { TypographyStyles } from "../globalStyles/typography.syles";
import { GlobalStyles } from "../globalStyles/global.styles";
import { useAppSelector } from "../../redux-toolkit/hooks";
import ChatBox from "../chat/ChatBox";
import CookieContent from "../cookie/Cookie";
import useLocalStorage from "../../hooks/useLocalStorage";

const Layout: FC<ILayout> = (props): ReactElement => {
  const { children, chat = true } = props;
  const cookieStorage = useLocalStorage<ICookieData>("cookie");
  const { isOpenChat } = useAppSelector((state) => state.chat);
  const { profile } = useAppSelector((state) => state.user);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [isCookieDrawerOpen, setIsCookieDrawerOpen] = useState<boolean>(false);

  const getCookie = cookieStorage.get();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Set isDrawerOpen to true after 8 seconds
      setIsCookieDrawerOpen(true);
    }, 1000);

    // Clear the timeout on component unmount to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <StyledThemeProvider>
      <LayoutStyles>
        <GlobalStyles />
        <TypographyStyles />
        {!getCookie ? <CookieContent isCookieDrawerOpen={isCookieDrawerOpen} setIsCookieDrawerOpen={setIsCookieDrawerOpen} /> : null}
        {profile?.role !== "admin" && chat !== false ? <ChatBox isOpenChat={isOpenChat} /> : null}
        <Header toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
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
