import styled from "styled-components";
import { motion } from "framer-motion";

export const ChatBoxStyles = styled(motion.div)`
  padding: ${(props) => props.theme.size1};
  margin: ${(props) => props.theme.size1};
`;
