import styled from "styled-components";

export const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const TextAreaLabel = styled.label`
  margin-bottom: 8px;
`;

export const StyledTextArea = styled.textarea`
  padding: 8px;
  border-radius: 4px;
  resize: none;
  border: 1px solid ${(props) => props.theme.dark};

  box-shadow:
    inset 0 0 2px ${(props) => props.theme.body},
    0 0 1px ${(props) => props.theme.dark};
  &:focus {
    border-color: ${(props) => props.theme.orange};
    box-shadow:
      inset 0 0 2px ${(props) => props.theme.orange},
      1px 0 6px ${(props) => props.theme.orange};
    color: ${(props) => props.theme.primary_dark};
  }
`;
