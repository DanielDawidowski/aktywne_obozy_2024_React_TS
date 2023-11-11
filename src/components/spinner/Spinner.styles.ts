import styled from "styled-components";
import { motion } from "framer-motion";
import { SpinnerProps } from "./Spinner.interface";

export const StyledSpinner = styled(motion.div)<SpinnerProps>`
  border: 4px solid ${(props) => props.theme.yellow};
  box-shadow: 0 0 1px ${(props) => props.theme.yellow};
  border-top: 4px solid ${(props) => props.theme.orange};
  border-radius: 50%;
  width: ${(props) => props.size || 40}px;
  height: ${(props) => props.size || 40}px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
