import React, { ReactElement } from "react";
import type { FC, ComponentType } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import BG from "../assets/Images/transitionBG.jpg";

const SlideIn = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: url(${BG});
  background-position: center;
  background-size: cover;
  transform-origin: bottom;
  z-index: 999999;
`;

const SlideOut = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: url(${BG});
  background-position: center;
  background-size: cover;
  transform-origin: top;
  z-index: 999999;
`;

const transition = (OgComponent: ComponentType): FC => {
  // eslint-disable-next-line react/display-name
  return (): ReactElement => (
    <>
      <OgComponent />
      <SlideIn initial={{ scaleY: 0 }} animate={{ scaleY: 0 }} exit={{ scaleY: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} />
      <SlideOut initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} exit={{ scaleY: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} />
    </>
  );
};

export default transition;
