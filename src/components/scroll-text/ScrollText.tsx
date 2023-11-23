import React, { ReactElement } from "react";
import type { FC } from "react";
import { useScroll, useTransform } from "framer-motion";
import { ScrollTextContainer, ScrollTextSectionContainer, ScrollTextTitleStyles } from "./ScrollText.styles";

const ScrollText: FC = (): ReactElement => {
  const { scrollYProgress } = useScroll();
  const forwardX = useTransform(scrollYProgress, [0, 1], ["10%", "-80%"]);
  return (
    <ScrollTextContainer>
      <ScrollTextSectionContainer>
        <ScrollTextTitleStyles style={{ x: forwardX }}>Wakacje ferie wakacje</ScrollTextTitleStyles>
      </ScrollTextSectionContainer>
    </ScrollTextContainer>
  );
};

export default ScrollText;
