import styled from "styled-components";
import { motion } from "framer-motion";

export const LogoStyles = styled(motion.div)`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: ${(props) => props.theme.size4};
  border: 1px solid ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.white};
  padding: ${(props) => props.theme.size1};
`;
