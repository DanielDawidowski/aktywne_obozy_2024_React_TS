import styled from "styled-components";
import { motion } from "framer-motion";

export const FormImageStyles = styled(motion.div)`
  position: relative;
  height: 200px;
  margin: ${(props) => props.theme.size1} 0;
  background-color: ${(props) => props.theme.secondary_light};
  border: 1px solid ${(props) => props.theme.dark};
  border-radius: 24px;
  outline: none;
  overflow: hidden;

  @media (max-width: ${(props) => props.theme.breakpoint_small}) {
    height: 150px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const FormStyles = styled.form`
  display: grid;
  margin: ${(props) => props.theme.size1};
  padding: ${(props) => props.theme.size4} ${(props) => props.theme.size1};
  background-color: ${(props) => props.theme.primary_light};
  border: 1px solid ${(props) => props.theme.dark};
  border-radius: 24px;
  outline: none;
  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    margin: ${(props) => props.theme.size6} 0;
    padding: ${(props) => props.theme.size6};
  }
`;

export const FormItemStyles = styled.div<{ $attracion?: boolean }>`
  margin-bottom: ${(props) => props.theme.size1};
  display: ${(props) => (props.$attracion ? "flex" : "block")};
  justify-content: center;
  align-items: center;
  width: 100%;

  h4 {
    letter-spacing: 1.3px;
    font-style: italic;
    color: ${(props) => props.theme.secondary};
  }

  p {
    text-align: justify;
  }
`;

export const FormAttractionStyles = styled.li`
  margin: ${(props) => props.theme.size4} 0;
  padding: ${(props) => props.theme.size1};
  border: 1px solid ${(props) => props.theme.secondary_light};
  border-radius: 4px;
  outline: none;
  box-shadow: 1px 1px 4px ${(props) => props.theme.secondary_light};
  background-color: ${(props) => props.theme.yellow};

  h4 {
    color: ${(props) => props.theme.secondary};
    letter-spacing: 1px;
  }

  svg {
    width: 28px;
    height: 28px;
    cursor: pointer;
  }
`;

export const EventInfoStyles = styled(motion.div)`
  padding: ${(props) => props.theme.size2};
  max-width: 600px;
  display: grid;
  /* @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    margin: ${(props) => props.theme.size6} 0;
    padding: ${(props) => props.theme.size6};
  } */
  svg {
    width: 25px;
    height: 25px;
  }
  p {
    color: ${(props) => props.theme.red};
    font-size: ${(props) => props.theme.size3};
    margin-top: ${(props) => props.theme.size1};
    padding: ${(props) => props.theme.size2};
    text-align: justify;
    border: 1px solid ${(props) => props.theme.red};
    border-radius: 4px;
    float: left;
  }
`;
