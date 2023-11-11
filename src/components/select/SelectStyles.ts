import styled from "styled-components";
import { motion } from "framer-motion";

export const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const SelectLabel = styled.label`
  display: block;
  margin-bottom: ${(props) => props.theme.size3};
`;

export const SelectButton = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
`;

export const SelectMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 1;
`;

export const SelectOption = styled.div`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
