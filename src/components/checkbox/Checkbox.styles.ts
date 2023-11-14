import styled from "styled-components";
import { motion } from "framer-motion";

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: ${(props) => props.theme.size3} 0;
`;

export const StyledCheckbox = styled.div<{ $isChecked: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid ${(props) => (props.$isChecked ? props.theme.green : props.theme.purple)};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 1px 1px 1px ${(props) => (props.$isChecked ? props.theme.green : props.theme.purple)};
`;

export const CheckIcon = styled(motion.div)`
  width: 12px;
  height: 12px;
  background-color: ${(props) => props.theme.orange};
  border-radius: 2px;
  opacity: 0;
`;

export const CheckboxLabel = styled.label<{ $isChecked: boolean }>`
  margin-left: ${(props) => props.theme.size2};
  font-size: ${(props) => props.theme.size3};
  color: ${(props) => (props.$isChecked ? props.theme.green : props.theme.purple)};
  ${(props) =>
    props.$isChecked &&
    `
  font-weight: 600;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  `}
`;
