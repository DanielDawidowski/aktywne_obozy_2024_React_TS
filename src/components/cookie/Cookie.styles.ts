import styled from "styled-components";
import { ModalContent } from "../modal/Modal.styles";
import { DotsContainer } from "../dots/Dots.styles";

export const CookieStyles = styled.div`
  ${ModalContent} {
    width: 100%;
    @media (min-width: ${(props) => props.theme.breakpoint_small}) {
      width: 50%;
    }
  }
`;

export const CookieWrapper = styled.div`
  background: ${(props) => props.theme.fifthColor};
  border: 1px solid ${(props) => props.theme.thirdColor};
  border-radius: ${(props) => props.theme.size1};
  height: 100%;
  width: 90%;
  padding: ${(props) => props.theme.size1} ${(props) => props.theme.size2};
  box-shadow: inset 0 0 5px ${(props) => props.theme.dark};
  position: relative;
  z-index: 1;

  @media (min-width: ${(props) => props.theme.breakpoint_xsmall}) {
    width: 60%;
  }
  p {
    padding: ${(props) => props.theme.size1} 0;
  }

  svg {
    position: absolute;
    top: 5%;
    left: 1%;
    z-index: -2;
    width: 35px;
    height: 35px;
    fill: ${(props) => props.theme.fourthColor};
    transform: rotate(45deg);
    @media (min-width: ${(props) => props.theme.breakpoint_small}) {
      top: 5%;
      left: 10%;
      width: 55px;
      height: 55px;
    }
  }

  ${DotsContainer} {
    z-index: -2;
    position: absolute;
    top: 15%;
    right: 10%;
  }
`;

export const CookieContentStyles = styled.div`
  padding: ${(props) => props.theme.size1};

  h2,
  b {
    color: ${(props) => props.theme.secondaryColor};
  }

  h2 {
    text-shadow: 0 0 1px ${(props) => props.theme.text};
    text-align: center;
  }

  p {
    text-align: justify;
  }

  h3 {
    text-align: center;
  }
`;
