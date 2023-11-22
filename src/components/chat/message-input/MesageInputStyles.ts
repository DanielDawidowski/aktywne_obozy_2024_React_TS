import styled from "styled-components";
import { motion } from "framer-motion";

export const MessageInputStyles = styled(motion.div)`
  background-color: ${(props) => props.theme.secondaryColor};

  form {
    display: grid;
    grid-template-columns: 1fr 55px;
    height: 45px;
    width: 100%;

    input {
      height: 45px;
      width: 100%;
    }

    button {
      display: grid;
      place-items: center;
      height: 45px;
      width: 100%;

      svg {
        width: 23px;
        height: 23px;
      }
    }
  }
`;
