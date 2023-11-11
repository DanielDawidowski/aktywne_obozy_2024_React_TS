import styled from "styled-components";
import { motion } from "framer-motion";

export const DropdownContainer = styled.div`
  position: relative;
`;

export const DropdownButton = styled.h3`
  border: none;
  cursor: pointer;
`;

export const DropdownContent = styled(motion.div)`
  position: absolute;
  top: 120%;
  right: 0;
  width: 250px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 4px;
`;
