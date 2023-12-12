import styled from "styled-components";
import { motion } from "framer-motion";

export const DrawerWrapper = styled(motion.div)<{ position: string }>`
  position: fixed;
  ${({ position }) => `${position}: 0`};
  ${({ position }) => (["top", "bottom"].includes(position) ? "left: 0; right: 0;" : "top: 0; bottom: 0;")}
  width: ${({ position }) => (["left", "right"].includes(position) ? "300px" : "100%")};
  height: ${({ position }) => (["top", "bottom"].includes(position) ? "170px" : "100%")};
  z-index: 997;
`;
