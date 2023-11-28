import React, { ReactElement } from "react";
import type { FC } from "react";
import { useScroll, useTransform } from "framer-motion";
import { ScrollTextContainer, ScrollTextSectionContainer, ScrollTextTitleStyles } from "./ScrollText.styles";
import useWindowSize from "../../hooks/useWindowSize";
import { BreakPoint } from "../layout/Layout.interface";

const ScrollText: FC = (): ReactElement => {
  const size = useWindowSize();
  const { scrollYProgress } = useScroll();
  const forwardX = useTransform(scrollYProgress, [0, 1], [size.width < BreakPoint.xsmall ? "30%" : "100%", "-200%"]);
  return (
    <ScrollTextContainer>
      <ScrollTextSectionContainer>
        <ScrollTextTitleStyles style={{ x: forwardX }}>Wakacje ferie wakacje</ScrollTextTitleStyles>
      </ScrollTextSectionContainer>
    </ScrollTextContainer>
  );
};

export default ScrollText;
