import styled from "styled-components";
import ContactBG from "../../assets/Images/contact/contactBG.png";
import { DotsContainer } from "../../components/dots/Dots.styles";
import { Grid } from "../../components/globalStyles/global.styles";

export const ContactStyles = styled.section`
  width: 100%;
  background: url(${ContactBG});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: bottom left;
`;

export const ContactContainer = styled.div`
  display: grid;
  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    grid-template-columns: 1fr 1fr;
    grid-gap: ${(props) => props.theme.size1};
    padding: ${(props) => props.theme.size1};
  }
`;

export const ContactLeft = styled.div`
  display: grid;
`;

export const ContactLeftInner = styled.div`
  position: inherit;
  margin: 0 ${(props) => props.theme.size1};
  padding: ${(props) => props.theme.size1};
  @media (min-width: ${(props) => props.theme.breakpoint_medium}) {
    position: fixed;
  }
`;

export const ContactRight = styled.div`
  width: 100%;
`;

export const ContactRightInner = styled.div``;

export const ContactOuter = styled.div`
  background-color: ${(props) => props.theme.green};
  padding: ${(props) => props.theme.size1};
  border-radius: 24px;
  margin: ${(props) => props.theme.size1};
  box-shadow: 0px 0px 4px 1px ${(props) => props.theme.text};
`;

export const ContactInner = styled.div<{ $bg?: boolean }>`
  background-color: ${(props) => (props.$bg ? props.theme.orange : props.theme.body)};
  border-radius: 24px;
  margin: ${(props) => props.theme.size1};
  padding: ${(props) => props.theme.size1};
  box-shadow: 0px 0px 4px 1px ${(props) => props.theme.body};
  h4 {
    color: ${(props) => (props.$bg ? props.theme.body : props.theme.text)};
    margin: ${(props) => props.theme.size1};
    letter-spacing: ${(props) => (props.$bg ? "4px" : "0px")};
  }
  svg {
    fill: ${(props) => (props.$bg ? props.theme.body : props.theme.fourthColor)};
    width: 35px;
    height: 35px;
  }
  p {
    color: ${(props) => props.theme.text};
    font-family: Oswald;
    font-size: 1.5rem;
    margin: ${(props) => props.theme.size1};
  }

  ${Grid} {
    position: relative;
    z-index: 2;
    ${DotsContainer} {
      position: absolute;
      right: 5%;
      bottom: 10%;
      z-index: -1;
      @media (min-width: ${(props) => props.theme.breakpoint_small}) {
        bottom: unset;
        right: 1%;
        top: 5%;
      }
    }
  }
`;

export const ContactInfo = styled.div`
  padding: ${(props) => props.theme.size1};
  position: relative;
  z-index: 2;
  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    padding: ${(props) => props.theme.size2};
  }
  h4 {
    font-family: Oswald;
    margin-top: ${(props) => props.theme.size1};
    b {
      text-shadow: 0px 2px 1px ${(props) => props.theme.body};
    }
  }

  ${DotsContainer} {
    position: absolute;
    right: 20%;
    top: 5%;
    z-index: -1;
  }
`;
