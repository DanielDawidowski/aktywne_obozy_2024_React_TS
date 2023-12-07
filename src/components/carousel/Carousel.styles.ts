import styled from "styled-components";
import { motion } from "framer-motion";

export const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
  height: 100%;
`;

export const CarouselInner = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 170px;
  @media (min-width: ${(props) => props.theme.breakpoint_xsmall}) {
    height: 270px;
  }
  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    height: 450px;
  }
  @media (min-width: ${(props) => props.theme.breakpoint_medium}) {
    height: 650px;
  }
`;

export const CarouselTitle = styled(motion.div)`
  position: absolute;
  top: 10%;
  left: 7%;
  z-index: 1;
  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    top: 10%;
    left: 10%;
  }

  h3 {
    color: ${(props) => props.theme.yellow};
    letter-spacing: 1px;
    text-align: center;
    font-size: 1rem;
    text-shadow:
      -1px -1px 0 ${(props) => props.theme.dark},
      1px -1px 0 ${(props) => props.theme.dark},
      -1px 1px 0 ${(props) => props.theme.dark},
      1px 1px 0 ${(props) => props.theme.dark};
    @media (min-width: ${(props) => props.theme.breakpoint_small}) {
      font-size: 2rem;
    }
  }
`;

export const CarouselSlider = styled.div`
  position: relative;
  img {
    width: 100%;
  }
`;

export const CarouselSlide = styled(motion.img)`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-position: top;
  object-fit: cover;
  overflow: hidden;
  cursor: grab;
`;
