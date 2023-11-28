import styled from "styled-components";
import { motion } from "framer-motion";

export const GoBackStyles = styled(motion.div)`
  display: none;
  @media (max-width: ${(props) => props.theme.breakpoint_small}) {
    display: block;
  }
`;
