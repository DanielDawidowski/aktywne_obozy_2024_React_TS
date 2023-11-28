import styled from "styled-components";
import { motion } from "framer-motion";

export const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RadioButton = styled(motion.label)<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  padding: 8px;
  border-radius: 4px;
  background-color: ${(props) => (props.$checked ? "#4CAF50" : "transparent")};
  color: ${(props) => (props.$checked ? "#fff" : "#000")};
  transition:
    background-color 0.3s,
    color 0.3s;
`;

export const RadioLabel = styled.span`
  margin-left: 8px;
`;
