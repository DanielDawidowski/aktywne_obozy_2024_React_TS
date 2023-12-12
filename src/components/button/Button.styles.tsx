import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import IButton from "./Button.interface";

const COLOR = {
  PRIMARY: css`
    color: ${(props) => props.theme.secondary_dark};
    background: ${(props) => props.theme.primary_light};
    border: 2px solid ${(props) => props.theme.primary_dark};
    box-shadow: 1px 2px 1px ${(props) => props.theme.secondary};
    border-radius: 8px;
  `,
  SECONDARY: css`
    color: ${(props) => props.theme.orange};
    background: ${(props) => props.theme.secondary};
    border: 2px solid ${(props) => props.theme.orange};
    box-shadow: 1px 2px 1px ${(props) => props.theme.secondary};
    border-radius: 8px;
  `,
  AUTH: css`
    color: ${(props) => props.theme.white};
    background: ${(props) => props.theme.orange};
    border: 2px solid ${(props) => props.theme.secondary};
    box-shadow: 0 0 3px ${(props) => props.theme.orange};
    border-radius: 6px;
  `,
  CHAT: css`
    color: ${(props) => props.theme.white};
    background: ${(props) => props.theme.green};
    border: 2px solid ${(props) => props.theme.white};
    box-shadow: 0 0 1px ${(props) => props.theme.green};
    border-radius: 8px;
  `
};

const DISABLED = css`
  cursor: not-allowed;
`;

export const ButtonStyles = styled(motion.button)<IButton>`
  padding: 10px 15px;
  cursor: pointer;
  border: none;
  border-radius: 50px;
  font-weight: 700;
  outline: none;
  transition: all 0.2s;
  letter-spacing: 1.2px;

  ${(props) => props.color && COLOR[props.color]}
  ${(props) => props.disabled && DISABLED}
`;
