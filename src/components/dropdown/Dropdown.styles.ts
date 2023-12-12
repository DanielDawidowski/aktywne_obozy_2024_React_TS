import styled from "styled-components";
import { motion } from "framer-motion";

export const DropdownContainer = styled.div`
  position: relative;
`;

export const DropdownButton = styled.h3<{ $active?: boolean }>`
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.text};
  box-shadow: inset 0 0 3px ${(props) => props.theme.text};
  background: ${(props) => (props.$active ? props.theme.text : props.theme.fifthColor)};
  color: ${(props) => (props.$active ? props.theme.fifthColor : props.theme.text)};
  border-radius: 8px;
  padding: ${(props) => props.theme.size1};
`;

export const DropdownContent = styled(motion.div)`
  position: absolute;
  top: 120%;
  right: 0;
  width: 250px;
  background-color: ${(props) => props.theme.primary_light};
  box-shadow: 0 2px 2px ${(props) => props.theme.dark};
  padding: ${(props) => props.theme.size2};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${(props) => props.theme.primary};
  z-index: 99999;
`;

export const DropdownElementStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.primary};
  width: 100%;
  a {
    h4 {
      margin: ${(props) => props.theme.size2} 0;
      color: ${(props) => props.theme.primary_dark};
    }
  }

  &:first-child {
    a {
      h2 {
        margin-top: 0;
      }
    }
  }

  &:last-child {
    border-bottom: none;
    a {
      h2 {
        margin-bottom: 0;
      }
    }
  }
`;
