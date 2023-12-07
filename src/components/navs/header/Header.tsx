import React, { FC, ReactElement } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 1 } }}>
            <Link to="/">
              <Logo width="45px" height="65px" />
            </Link>
          </motion.div>
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
