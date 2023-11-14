import styled from "styled-components";

export const MenuStyles = styled.ul`
  li {
    height: 45px;
    display: grid;
    place-items: center;
    margin-right: ${(props) => props.theme.size1};
    padding: ${(props) => props.theme.size1};
    h3 {
      color: ${(props) => props.theme.white};
    }
    &:last-child {
      margin-right: 0;
      padding: ${(props) => props.theme.size1};
    }
  }

  .logout {
    fill: ${(props) => props.theme.red};
    transform: rotate(-90deg);
    width: 25px;
    height: 25px;
  }
`;
