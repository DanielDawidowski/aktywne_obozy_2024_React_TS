import styled from "styled-components";

export const HeaderStyles = styled.header`
  background-color: ${(props) => props.theme.fifthColor};
  padding: ${(props) => props.theme.size1};
  box-shadow: inset 1px 2px 10px ${(props) => props.theme.dark};
`;
