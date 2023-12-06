import styled from "styled-components";
import { motion } from "framer-motion";
import { LogoStyles } from "../logo/Logo.styles";

export const ChatBoxStyles = styled(motion.div)`
  height: 100%;
  width: 100%;
`;

export const ChatBoxSmallStyles = styled(motion.div)`
  position: fixed;
  z-index: 99999;
  cursor: pointer;
  background-color: ${(props) => props.theme.body};
  border: 10px solid ${(props) => props.theme.secondaryColor};
  display: grid;
  place-items: center;
  box-shadow:
    inset 0 0 2px ${(props) => props.theme.body},
    1px 0 6px ${(props) => props.theme.dark};
  svg {
    width: 40px;
    height: 40px;
    fill: ${(props) => props.theme.primaryColor};
  }
`;

export const ChatBoxBigStyles = styled(motion.div)`
  position: fixed;
  bottom: 20;
  right: 20;
  z-index: 99999;
  cursor: pointer;
  background-color: ${(props) => props.theme.secondaryColor};
  border: 10px solid ${(props) => props.theme.secondaryColor};
  box-shadow: 1px 0 2px ${(props) => props.theme.text};
  height: 100%;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  span {
    color: ${(props) => props.theme.dark};
  }
`;

export const ChatBoxHeaderStyles = styled(motion.div)`
  border-radius: 8px 8px 0 0;
  background-color: ${(props) => props.theme.secondaryColor};
  padding: ${(props) => props.theme.size1};
  height: ${(props) => props.theme.size6};
  width: 100%;

  span {
    font-size: ${(props) => props.theme.size4};
  }
  svg {
    width: 20px;
    height: 20px;
    fill: ${(props) => props.theme.text};
  }
`;

export const ChatBoxBodyStyles = styled(motion.div)`
  border-radius: 8px;
  height: 90%;

  background-color: ${(props) => props.theme.primaryColor};
  box-shadow:
    inset 0 0 2px ${(props) => props.theme.body},
    1px 0 2px ${(props) => props.theme.dark};
`;

export const ChatWindowStyles = styled(motion.div)`
  background-color: ${(props) => props.theme.thirdColor};
  border-radius: 8px 8px 0 0;
  width: 100%;
`;

export const ChatWindowHeaderStyles = styled(motion.div)`
  padding: ${(props) => props.theme.size1};
  border: 1px solid ${(props) => props.theme.text};
  border-radius: 8px 8px 0 0;
`;

export const ChatRegisterStyles = styled(motion.div)`
  padding: ${(props) => props.theme.size3};
  width: 100%;
  height: 100%;

  ${LogoStyles} {
    margin: ${(props) => props.theme.size5} 0;
  }
`;
