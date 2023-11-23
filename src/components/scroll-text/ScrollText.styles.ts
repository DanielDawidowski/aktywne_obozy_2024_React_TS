import styled from "styled-components";
import { motion } from "framer-motion";

export const ScrollTextContainer = styled(motion.div)`
  overflow-x: hidden;
  height: 20vh;
  width: 100%;
`;

export const ScrollTextSectionContainer = styled(motion.div)`
  position: sticky;
  top: 0;
  height: 15vh;
  width: 110%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;

  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    height: 20vh;
    font-size: ${(props) => props.theme.size6};
  }
`;

export const ScrollTextTitleStyles = styled(motion.h3)`
  letter-spacing: var(--size-1);
  word-spacing: 0.08em;
  font-size: var(--size-7);
  text-transform: uppercase;
  font-weight: bold;
  margin: var(--size-1) 0;
  white-space: nowrap;
  color: var(--yellow-1);
  text-shadow:
    1px 1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    font-size: ${(props) => props.theme.size6};
  }
`;
