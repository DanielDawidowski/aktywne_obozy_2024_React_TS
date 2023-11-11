import React, { FC, ReactElement } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { HeaderStyles } from "./HeaderStyles";
import Hamburger from "../hamburger/Hamburger";
import IHeader from "./Header.interface";

import Logo from "../../logo/Logo";
import { Container, Flex, DisplayMedia } from "../../globalStyles/globalStyles";
import Menu from "../menu/Menu";

const Header: FC<IHeader> = (props): ReactElement => {
  const { toggleMenu, setToggleMenu, toggleTheme } = props;

  return (
    <HeaderStyles>
      <Container>
        <Flex $justify="space-between" $align="center">
          <div>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <DisplayMedia $media>
            <Menu toggleTheme={toggleTheme} />
          </DisplayMedia>
          <DisplayMedia>
            <Hamburger setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} />
          </DisplayMedia>
        </Flex>
      </Container>
    </HeaderStyles>
  );
};

Header.propTypes = {
  toggleMenu: PropTypes.bool.isRequired,
  setToggleMenu: PropTypes.func.isRequired,
  toggleTheme: PropTypes.func.isRequired
};

export default Header;
