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

export const FormStyles = styled(motion.form)`
  display: grid;
  margin: ${(props) => props.theme.size1};
  background-color: ${(props) => props.theme.primary_light};
  padding: ${(props) => props.theme.size3} ${(props) => props.theme.size1};
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
