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
  height: 150px;
  width: 110%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;

  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    font-size: ${(props) => props.theme.size6};
  }
`;

export const ScrollTextTitleStyles = styled(motion.h3)`
  letter-spacing: ${(props) => props.theme.size1};
  word-spacing: 0.08em;
  font-size: ${(props) => props.theme.size7};
  text-transform: uppercase;
  font-weight: bold;
  margin: ${(props) => props.theme.size1} 0;
  white-space: nowrap;
  color: ${(props) => props.theme.orange};
  text-shadow:
    1px 1px 0 ${(props) => props.theme.dark},
    1px -1px 0 ${(props) => props.theme.dark},
    -1px 1px 0 ${(props) => props.theme.dark},
    1px 1px 0 ${(props) => props.theme.dark};
  @media (max-width: ${(props) => props.theme.breakpoint_small}) {
    font-size: ${(props) => props.theme.size6};
  }
`;
