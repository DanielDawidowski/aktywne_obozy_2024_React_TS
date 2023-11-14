import styled from "styled-components";
import { motion } from "framer-motion";

export const AccordionContainer = styled.div`
  width: 100%;
`;

export const AccordionItem = styled.div`
  margin-bottom: 10px;
`;

export const AccordionHeader = styled.h3`
  width: 100%;
  padding: ${(props) => props.theme.size2};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AccordionContent = styled(motion.div)`
  overflow: hidden;
  background-color: ${(props) => props.theme.primary};
  border-radius: 4px;
  padding: ${(props) => props.theme.size2} 0;

  h2 {
    color: ${(props) => props.theme.white};
  }
`;
