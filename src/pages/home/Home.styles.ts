import styled from "styled-components";
import { motion } from "framer-motion";
import BGIcons from "../../assets/Images//home/home-icons.png";

export const HomeStyles = styled(motion.section)`
  width: 100%;
  height: 100%;
  z-index: 999;
  display: grid;
  place-items: center;
`;

export const HomeIconsStyles = styled.div`
  padding-top: ${(props) => props.theme.size4};
  background: url(${BGIcons});
  background-size: cover;
  background-position: center;
  height: 70px;
  width: 100%;
  margin: ${(props) => props.theme.size4} 0;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    height: 150px;
  }

  @media (min-width: ${(props) => props.theme.breakpoint_medium}) {
    height: 200px;
  }

  @media (min-width: ${(props) => props.theme.breakpoint_large}) {
    height: 300px;
  }

  a {
    position: absolute;
    display: grid;
    place-items: center;
    h4 {
      background: ${(props) => props.theme.thirdColor};
      border-radius: 18px;
      letter-spacing: 0.1em;
      padding: ${(props) => props.theme.size1} ${(props) => props.theme.size5};
      border: 1px solid ${(props) => props.theme.dark};
      color: ${(props) => props.theme.orange};
      text-shadow:
        -1px -1px 0 ${(props) => props.theme.dark},
        1px -1px 0 ${(props) => props.theme.dark},
        -1px 1px 0 ${(props) => props.theme.dark},
        1px 1px 0 ${(props) => props.theme.dark};
    }
  }
`;
