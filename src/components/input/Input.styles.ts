import styled from "styled-components";

export const InputContainer = styled.div`
  position: relative;
  margin-bottom: ${(props) => props.theme.size3};
`;

export const LableStyles = styled.label`
  padding: ${(props) => props.theme.size6};
  font-size: ${(props) => props.theme.size3};
  color: ${(props) => props.theme.purple};
  pointer-events: none;
  transition: all 0.2s ease-in-out;
`;

export const InputField = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.size2};
  font-size: ${(props) => props.theme.size4};
  border: 2px solid ${(props) => props.theme.green};
  border-radius: 4px;
  outline: none;
  box-shadow: 1px 1px 3px ${(props) => props.theme.green};
  color: ${(props) => props.theme.purple};

  &:focus {
    border-color: ${(props) => props.theme.orange};
    box-shadow: 3px 2px 6px ${(props) => props.theme.orange};
    color: ${(props) => props.theme.secondary_light};
  }

  @media (max-width: ${(props) => props.theme.breakpoint_small}) {
    font-size: ${(props) => props.theme.size2};
  }
`;
