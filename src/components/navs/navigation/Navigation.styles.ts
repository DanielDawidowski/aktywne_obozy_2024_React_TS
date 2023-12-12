import styled from "styled-components";
import { motion } from "framer-motion";

export const NavStyles = styled(motion.section)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.secondaryColor};
  z-index: 9999;
`;

export const NavHeader = styled.div`
  padding: ${(props) => props.theme.size1};
  box-shadow: inset 1px 2px 10px ${(props) => props.theme.dark};
`;

export const NavBody = styled.div`
  width: 100%;
  height: 100%;
  padding: ${(props) => props.theme.size4};
  background: ${(props) => props.theme.body};
`;
