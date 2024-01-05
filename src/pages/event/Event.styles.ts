import styled from "styled-components";
import { motion } from "framer-motion";
import EventBG from "../../assets/Images/events/eventBG.png";
import { Grid } from "../../components/globalStyles/global.styles";

export const EventStyles = styled(motion.section)`
  background: url(${EventBG});
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: bottom right;
`;

export const EventInner = styled.div`
  display: grid;
  padding: ${(props) => props.theme.size1};

  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
`;

export const EventLeft = styled.div`
  width: 100%;
  padding: ${(props) => props.theme.size1};
  border-radius: 18px;
  background-color: ${(props) => props.theme.secondaryColor};
  box-shadow: 0 0 5px ${(props) => props.theme.text};
`;

export const EventLeftHeader = styled.div`
  margin-bottom: ${(props) => props.theme.size1};
  position: relative;

  img {
    border-radius: 18px;
  }
`;

export const EventLeftElement = styled.div<{ $bg?: boolean }>`
  position: relative;
  margin-top: ${(props) => props.theme.size7};
  background: ${(props) => props.$bg && props.theme.body};
  border-radius: 18px;
  img {
    border-radius: 18px;
    width: 100%;
  }

  h3 {
    text-align: center;
    margin: ${(props) => props.theme.size4} 0;
    width: 200px;
    @media (min-width: ${(props) => props.theme.breakpoint_xsmall}) {
      width: 100%;
    }
  }
  ${Grid} {
    ul {
      margin: ${(props) => props.theme.size2} ${(props) => props.theme.size1};
      li {
        margin: ${(props) => props.theme.size5} 0;
        padding: ${(props) => props.theme.size2} 0;
        svg {
          width: 70px;
          height: 70px;
          margin-right: ${(props) => props.theme.size2};
        }

        h4 {
          word-wrap: break-word;
          max-width: 150px;
          width: 100%;
          text-align: center;
          letter-spacing: 1px;
          @media (min-width: ${(props) => props.theme.breakpoint_xsmall}) {
            max-width: 400px;
            text-align: left;
          }
        }
      }
    }
  }

  h2 {
    padding: ${(props) => props.theme.size4};
    text-align: center;
  }
`;

export const EventLeftAttraction = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(50px, auto);
  grid-gap: ${(props) => props.theme.size1};
  place-items: center;
  @media (max-width: ${(props) => props.theme.breakpoint_xsmall}) {
    place-items: inherit;
  }

  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-auto-rows: minmax(100px, auto);

    place-items: inherit;
  }

  li:nth-child(n + 7) {
    @media (min-width: ${(props) => props.theme.breakpoint_small}) {
      grid-column: 1/ 2;
    }
  }

  li:nth-child(n + 9) {
    grid-column: span 1;
    grid-row: span -1;
    place-items: center;
    display: grid;
    @media (min-width: ${(props) => props.theme.breakpoint_small}) {
      grid-column: 2 /-1;
      grid-row: 3 / 5;
    }
  }

  li {
    padding: 0 ${(props) => props.theme.size1};
    margin: ${(props) => props.theme.size1};
    @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    }
  }

  img {
    width: 100px;
  }
`;

const Corner = styled.div`
  border-radius: 18px;
  background-color: ${(props) => props.theme.yellow};
  position: absolute;
  width: 80px;
  height: 10px;
  z-index: 995;
`;

export const LeftCorner = styled(Corner)`
  top: 20px;
  left: -15px;
  transform: rotate(-45deg);
`;

export const RightCorner = styled(Corner)`
  top: 20px;
  right: -15px;
  transform: rotate(45deg);
`;

export const SignUp = styled(motion.div)`
  position: fixed;
  z-index: 996;
  cursor: pointer;
  background-color: ${(props) => props.theme.fourthColor};
  border: 10px solid ${(props) => props.theme.primaryColor};
  display: grid;
  place-items: center;
  svg {
    width: 30px;
    height: 30px;
    fill: ${(props) => props.theme.secondaryColor};
  }

  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    display: none;
  }
`;

export const EventRight = styled.div`
  width: 100%;
`;

export const EventRightInner = styled.div`
  position: fixed;
  margin: 0 ${(props) => props.theme.size1};
  padding: ${(props) => props.theme.size1};
  border-radius: 18px;
  width: 30%;
  background-color: ${(props) => props.theme.secondaryColor};
  box-shadow: 0 0 10px ${(props) => props.theme.text};
  @media (min-width: ${(props) => props.theme.breakpoint_medium}) {
    width: 25%;
  }
`;

export const EventRightElement = styled.div`
  position: relative;
  margin: ${(props) => props.theme.size2} 0;
  border-radius: 18px;
  display: grid;
  place-items: center;

  @media (min-width: ${(props) => props.theme.breakpoint_xsmall}) {
    width: 100%;
  }

  svg {
    width: 30px;
    height: 30px;
    margin-right: ${(props) => props.theme.size1};
    @media (min-width: ${(props) => props.theme.breakpoint_medium}) {
      width: 50px;
      height: 50px;
      margin-right: ${(props) => props.theme.size2};
    }
  }

  h4:nth-child(1) {
    b {
      color: ${(props) => props.theme.orange};
      letter-spacing: 3px;
    }
  }
`;

export const Price = styled.h3`
  b {
    color: ${(props) => props.theme.orange};
  }
`;
