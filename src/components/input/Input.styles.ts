import styled from "styled-components";

export const InputContainer = styled.div`
  position: relative;
  margin-bottom: ${(props) => props.theme.size3};
`;

export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #3498db;
  }
`;
