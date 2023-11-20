import React, { ReactElement } from "react";
import type { FC } from "react";
import { AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { NavBody, NavHeader, NavStyles } from "./Navigation.styles";
import IHeader from "../header/Header.interface";
import Menu from "../menu/Menu";
import Logo from "../../logo/Logo";
import Hamburger from "../hamburger/Hamburger";
import { DisplayMedia, Flex } from "../../globalStyles/global.styles";

const Navigation: FC<IHeader> = (props): ReactElement => {
  const { toggleMenu, setToggleMenu } = props;
  return (
    <AnimatePresence>
      {toggleMenu && (
        <>
          <NavStyles
            initial={{ x: "-100%" }}
            animate={{ x: toggleMenu ? 0 : "-100%" }}
            transition={{
              duration: 0.5,
              ease: [0.6, 0.05, -0.01, 0.9]
            }}
            exit={{ x: "-100%" }}
          >
            <NavHeader>
              <Flex $justify="space-between" $align="center">
                <Logo width="45px" height="65px" />
                <Hamburger setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} />
              </Flex>
            </NavHeader>
            <NavBody>
              <DisplayMedia>
                <Menu />
              </DisplayMedia>
            </NavBody>
          </NavStyles>
        </>
      )}
    </AnimatePresence>
  );
};

Navigation.propTypes = {
  toggleMenu: PropTypes.bool.isRequired,
  setToggleMenu: PropTypes.func.isRequired
};

export default Navigation;
