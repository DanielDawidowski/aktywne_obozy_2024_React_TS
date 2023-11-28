import styled from "styled-components";

export const InputContainer = styled.div`
  position: relative;
  margin-bottom: ${(props) => props.theme.size3};
`;

export const LableStyles = styled.label`
  padding: ${(props) => props.theme.size6};
  font-size: ${(props) => props.theme.size3};
  color: ${(props) => props.theme.dark};
  pointer-events: none;
  transition: all 0.2s ease-in-out;
`;

export const InputField = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.size2};
  font-size: ${(props) => props.theme.size4};
  border: 2px solid ${(props) => props.theme.white};
  border-radius: 4px;
  outline: none;
  color: ${(props) => props.theme.purple};

  &:focus {
    border-color: ${(props) => props.theme.orange};
    box-shadow: 0 0 1px ${(props) => props.theme.orange};
    color: ${(props) => props.theme.primary_dark};
  }

  @media (max-width: ${(props) => props.theme.breakpoint_small}) {
    font-size: ${(props) => props.theme.size2};
  }
`;
