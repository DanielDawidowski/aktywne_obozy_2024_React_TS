import styled from "styled-components";
import { motion } from "framer-motion";
import HomeSVG from "../../../assets/SVG/home.svg";
import HomeSmallSVG from "../../../assets/SVG/hero-small.svg";
import { Flex } from "../../../components/globalStyles/global.styles";

export const HeroStyles = styled.div`
  padding: 4px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    display: flex;
    padding: ${(props) => props.theme.size4};
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  position: relative;

  @media (min-width: ${(props) => props.theme.breakpoint_xsmall}) {
    align-items: center;
  }

  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    align-items: flex-start;
    margin-top: ${(props) => props.theme.size5};
  }
`;

export const Left = styled.div`
  padding: ${(props) => props.theme.size1};
  width: 100%;
  height: 500px;
  background: url(${HomeSmallSVG});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    height: 600px;
    background: url(${HomeSVG});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

export const ListItem = styled(motion.li)`
  padding: ${(props) => props.theme.size1};
  margin-top: ${(props) => props.theme.size1};
  h2 {
    position: relative;
    text-transform: uppercase;
    font-size: ${(props) => props.theme.size6};
    @media (min-width: ${(props) => props.theme.breakpoint_medium}) {
      font-size: ${(props) => props.theme.size7};
    }
    b {
      &:hover {
        color: ${(props) => props.theme.thirdColor};
        text-shadow:
          -1px -1px 0 ${(props) => props.theme.text},
          1px -1px 0 ${(props) => props.theme.text},
          -1px 1px 0 ${(props) => props.theme.text},
          1px 1px 0 ${(props) => props.theme.text};
      }
    }
    span {
      position: absolute;
      height: 15px;
      top: 45%;
      left: -5%;
      z-index: -1;
      border-radius: 4px;
      background-color: ${(props) => props.theme.yellow};
    }
  }
  h4 {
    b {
      color: ${(props) => props.theme.red};
      font-size: ${(props) => props.theme.size4};
    }
  }
`;

export const Right = styled.div`
  padding: ${(props) => props.theme.size1};
  width: 100%;
  display: grid;
  place-items: center;
  position: relative;
`;

const Icon = styled(motion.div)`
  border-radius: 50%;
  border: 5px solid ${(props) => props.theme.body};
  width: 75px;
  height: 75px;
  display: grid;
  place-items: center;
  position: absolute;
  @media (min-width: ${(props) => props.theme.breakpoint_xsmall}) {
    width: 100px;
    height: 100px;
    border: 10px solid ${(props) => props.theme.body};
  }
`;

export const TopIcon = styled(Icon)`
  background-color: ${(props) => props.theme.green};
  top: 20%;
  left: 5%;
  @media (min-width: ${(props) => props.theme.breakpoint_xsmall}) and (max-width: ${(props) => props.theme.breakpoint_small}) {
    top: 5%;
    left: 25%;
  }

  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    top: 10%;
    left: 15%;
  }
`;

export const BottomIcon = styled(Icon)`
  background-color: ${(props) => props.theme.orange};
  top: 20%;
  right: 5%;
  @media (min-width: ${(props) => props.theme.breakpoint_xsmall}) and (max-width: ${(props) => props.theme.breakpoint_small}) {
    top: 5%;
    right: 25%;
  }

  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    top: unset;
    bottom: 10%;
    right: 15%;
  }
  img {
    width: 30px;
    height: 30px;
    @media (min-width: ${(props) => props.theme.breakpoint_xsmall}) {
      width: 50px;
      height: 50px;
    }
  }
`;

export const Info = styled(motion.div)`
  position: absolute;
  box-shadow: 1px 2px 5px ${(props) => props.theme.dark};
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.text};
  background: ${(props) => props.theme.body};
  padding: ${(props) => props.theme.size2};
  display: flex;
  bottom: 10%;
  left: 0%;
  box-shadow: 1px 2px 6px ${(props) => props.theme.text};
  @media (min-width: ${(props) => props.theme.breakpoint_xsmall}) and (max-width: ${(props) => props.theme.breakpoint_small}) {
    left: 15%;
  }
  @media (min-width: ${(props) => props.theme.breakpoint_small}) and (max-width: ${(props) => props.theme.breakpoint_medium}) {
    left: -15%;
  }
  @media (min-width: ${(props) => props.theme.breakpoint_medium}) {
    left: 5%;
  }

  ${Flex} {
    margin-left: ${(props) => props.theme.size1};
    h4 {
      &:nth-child(1) {
        color: ${(props) => props.theme.red};
      }
      &:nth-child(2) {
        color: ${(props) => props.theme.yellow};
      }
    }
  }
`;

export const Face = styled.div`
  background: ${(props) => props.theme.primary};
  padding: ${(props) => props.theme.size2};
  margin-right: ${(props) => props.theme.size2};
  border-radius: 8px;
  display: grid;
  place-items: center;
`;
