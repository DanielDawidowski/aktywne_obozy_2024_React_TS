import styled from "styled-components";
import { motion } from "framer-motion";
import { Grid } from "../globalStyles/global.styles";

export const RandomIconsContainer = styled(motion.ul)<{ $grid: boolean; $flex: boolean }>`
  width: 100%;
  padding: ${(props) => props.theme.size5} ${(props) => props.theme.size2};
  ${Grid} {
    margin: ${(props) => props.theme.size1};
  }

  svg {
    width: 100%;
    height: 100%;
    transition: all 0.3s ease-in-out;
  }

  ${(props) =>
    props.$grid &&
    `
      display: grid;
  `}

  li {
    display: none;
    margin: ${(props) => props.theme.size1};
  }

  @media (max-width: ${(props) => props.theme.breakpoint_xsmall}) {
    li:nth-child(-n + 2) {
      display: list-item;
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoint_xsmall}) and (max-width: ${(props) => props.theme.breakpoint_small}) {
    li:nth-child(-n + 4) {
      display: list-item;
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoint_small}) and (max-width: ${(props) => props.theme.breakpoint_medium}) {
    li:nth-child(-n + 6) {
      display: list-item;
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoint_medium}) {
    li:nth-child(-n + 6) {
      display: list-item;
    }
  }

  ${(props) =>
    props.$flex &&
    `
      display: flex;
  `}
`;
