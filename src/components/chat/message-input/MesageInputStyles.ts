import styled from "styled-components";

export const MessageInputStyles = styled.div`
  background-color: ${(props) => props.theme.secondaryColor};
  grid-area: input;

  form {
    display: grid;
    grid-template-columns: 1fr 55px;
    height: 45px;
    width: 100%;

    input {
      height: 45px;
      width: 100%;
    }

    button {
      display: grid;
      place-items: center;
      height: 45px;
      width: 100%;

      svg {
        width: 23px;
        height: 23px;
      }
    }
  }
`;
