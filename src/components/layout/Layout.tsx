import React, { FC, ReactElement, useState } from "react";
import PropTypes from "prop-types";
import { ILayout } from "./Layout.interface";
import { LayoutStyles } from "./Layout.styles";
import Header from "../navs/header/Header";
import Navigation from "../navs/navigation/Navigation";
import StyledThemeProvider from "./StyledThemeProvider";
import { TypographyStyles } from "../globalStyles/typography.syles";
import { GlobalStyles } from "../globalStyles/global.styles";
import { useAppSelector } from "../../redux-toolkit/hooks";
import ChatBox from "../chat/ChatBox";

const Layout: FC<ILayout> = (props): ReactElement => {
  const { children, chat = true } = props;
  const { isOpenChat } = useAppSelector((state) => state.chat);
  const { profile } = useAppSelector((state) => state.user);

  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <StyledThemeProvider>
      <LayoutStyles>
        <GlobalStyles />
        <TypographyStyles />
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
