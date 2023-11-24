import styled from "styled-components";
import { motion } from "framer-motion";

export const RandomIconsContainer = styled(motion.div)`
  width: 100%;
  padding: ${(props) => props.theme.size5} ${(props) => props.theme.size2};
  display: grid;

  div {
    margin: ${(props) => props.theme.size1};
  }
`;
