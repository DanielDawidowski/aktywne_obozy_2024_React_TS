import styled from "styled-components";
import { motion } from "framer-motion";
import { FormStyles } from "../form/Form.styles";

export const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 997;
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 998;
  overflow-y: scroll;
  scroll-behavior: smooth;
  display: grid;
  place-items: center;

  /* Webkit (Safari, Chrome) */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.thirdColor};
    border: 1px solid ${(props) => props.theme.text};
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.text};
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;

  /* IE */
  & {
    -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
  }

  &::-ms-scrollbar-thumb {
    background-color: #888;
    border-radius: 6px;
  }

  &::-ms-scrollbar-track {
    background-color: #f1f1f1;
  }
`;

export const ModalContent = styled(motion.div)`
  position: relative;
  background: ${(props) => props.theme.body};
  border-radius: 8px;
  box-shadow: 0 0 10px ${(props) => props.theme.dark};
  z-index: 99999;
  padding: ${(props) => props.theme.size1};

  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    padding: ${(props) => props.theme.size3} ${(props) => props.theme.size1};
  }

  ${FormStyles} {
    margin: ${(props) => props.theme.size4}0;
    padding: ${(props) => props.theme.size4} ${(props) => props.theme.size1};
  }

  svg {
    width: 30px;
    height: 30px;
    fill: ${(props) => props.theme.text};
  }
`;

export const CloseModalStyles = styled.div`
  svg {
    width: 30px;
    height: 30px;
    fill: ${(props) => props.theme.text};
    margin: ${(props) => props.theme.size3};
  }
`;
