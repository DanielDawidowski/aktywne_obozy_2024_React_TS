import React, { FC, ReactElement, useState } from "react";
import PropTypes from "prop-types";
import { ILayout } from "./Layout.interface";
import { LayoutStyles } from "./LayoutStyles";
import Header from "../navs/header/Header";
import Navigation from "../navs/navigation/Navigation";
import StyledThemeProvider from "./StyledThemeProvider";
import { TypographyStyles } from "../globalStyles/typography.syles";
import { GlobalStyles } from "../globalStyles/global.styles";

const Layout: FC<ILayout> = ({ children, chat = true }): ReactElement => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <StyledThemeProvider>
      <LayoutStyles>
        <GlobalStyles />
        <TypographyStyles />
        {/* {(profile?.role !== "admin" || chat) && (
        <div className="chat">
          <ChatBox isOpenChat={isOpenChat} />
        </div>
      )} */}
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
