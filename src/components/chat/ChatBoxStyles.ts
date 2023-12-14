import styled from "styled-components";
import { motion } from "framer-motion";
import { LogoStyles } from "../logo/Logo.styles";

export const ChatBoxStyles = styled(motion.div)`
  height: 100%;
  width: 100%;
`;

export const ChatBoxSmallStyles = styled(motion.div)`
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
  padding: ${(props) => props.theme.size1};
  span {
    font-size: ${(props) => props.theme.size4};
    color: ${(props) => props.theme.text};
  }
  svg {
    width: 20px;
    height: 20px;
    fill: ${(props) => props.theme.text};
  }
`;

export const ChatBoxHeaderConfirm = styled(motion.div)`
  span {
    color: ${(props) => props.theme.white};
  }
  svg {
    width: 35px;
    height: 35px;
    padding: 4px;
    border-radius: 4px;
    &:first-child {
      fill: ${(props) => props.theme.green};
      margin-right: ${(props) => props.theme.size4};
    }
    &:last-child {
      fill: ${(props) => props.theme.red};
    }
    &:hover {
      transform: scale(1.2);
      background: ${(props) => props.theme.white};
    }
  }
`;

export const ChatBoxBodyStyles = styled.div`
  border-radius: 8px;
  height: 90%;
  background-color: ${(props) => props.theme.primaryColor};
  box-shadow:
    inset 0 0 2px ${(props) => props.theme.body},
    1px 0 2px ${(props) => props.theme.dark};
`;

export const ChatWindowStyles = styled.div`
  background: ${(props) => props.theme.thirdColor};
  border-radius: 8px 8px 0 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 40px 1fr 30px;
  grid-template-areas:
    "header"
    "display"
    "input";
`;

export const ChatWindowHeaderStyles = styled.div`
  padding: ${(props) => props.theme.size1};
  border: 1px solid ${(props) => props.theme.text};
  border-radius: 8px 8px 0 0;
  grid-area: header;
`;

export const ChatRegisterStyles = styled.div`
  height: 100%;
  ${LogoStyles} {
    margin: ${(props) => props.theme.size6} 0;
  }
`;
