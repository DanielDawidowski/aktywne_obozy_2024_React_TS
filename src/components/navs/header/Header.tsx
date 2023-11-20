import React, { FC, ReactElement } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { HeaderStyles } from "./Header.styles";
import Hamburger from "../hamburger/Hamburger";
import IHeader from "./Header.interface";
import Logo from "../../logo/Logo";
import { Container, Flex, DisplayMedia } from "../../globalStyles/global.styles";
import Menu from "../menu/Menu";

const Header: FC<IHeader> = (props): ReactElement => {
  const { toggleMenu, setToggleMenu } = props;

  return (
    <HeaderStyles>
      <Container>
        <Flex $justify="space-between" $align="center">
          <div>
            <Link to="/">
              <Logo width="45px" height="65px" />
            </Link>
          </div>
          <DisplayMedia $media>
            <Menu />
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
  setToggleMenu: PropTypes.func.isRequired
};

export default Header;
