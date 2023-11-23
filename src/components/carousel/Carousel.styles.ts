import styled from "styled-components";
import { motion } from "framer-motion";

export const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const CarouselInner = styled(motion.div)`
  position: relative;
  width: 100%;
  height: auto;
`;

export const CarouselTitle = styled(motion.div)`
  position: absolute;
  bottom: 10%;
  left: ${(props) => props.theme.size1};
  z-index: 1;
  h3 {
    color: ${(props) => props.theme.yellow};
    text-align: center;
    letter-spacing: 3px;
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
