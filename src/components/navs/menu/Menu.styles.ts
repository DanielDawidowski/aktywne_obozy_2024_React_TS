import styled from "styled-components";

export const MenuStyles = styled.ul`
  background: none;
  border-radius: 8px;

  @media (max-width: ${(props) => props.theme.breakpoint_small}) {
    background-color: ${(props) => props.theme.primaryColor};
    padding: ${(props) => props.theme.size2};
  }
  .first-element {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 26px;
    @media (max-width: ${(props) => props.theme.breakpoint_small}) {
      border: 1px solid ${(props) => props.theme.text};
    }
  }
  li {
    display: grid;
    place-items: center;
    padding: ${(props) => props.theme.size1};
    h3 {
      color: ${(props) => props.theme.text};
      @media (max-width: ${(props) => props.theme.breakpoint_small}) {
        color: ${(props) => props.theme.text};
      }
    }

    &:last-child {
      margin-right: 0;
    }
    @media (max-width: ${(props) => props.theme.breakpoint_small}) {
      width: 100%;
      padding: ${(props) => props.theme.size2};
      margin: ${(props) => props.theme.size1} 0;
    }
  }
`;

export const MenuThemeStyles = styled.div`
  display: grid;
  place-items: center;
  padding: ${(props) => props.theme.size2};
  background-color: ${(props) => props.theme.text};
  border: 0.5 solid ${(props) => props.theme.body};
  width: 70px;
  border-radius: 26px;
  box-shadow:
    inset 0 0 2px ${(props) => props.theme.body},
    1px 0 2px ${(props) => props.theme.dark};

  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    padding: ${(props) => props.theme.size1};
    width: 60px;
    border-radius: 14px;
    background-color: ${(props) => props.theme.text};
  }
  svg {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

export const LogoutStyles = styled.div`
  cursor: pointer;
  display: grid;
  place-items: center;
  background-color: ${(props) => props.theme.white};
  border-radius: 26px;
  height: 30px;
  width: 30px;
  margin-right: ${(props) => props.theme.size6};
  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    margin-right: ${(props) => props.theme.size4};
  }
  svg {
    fill: ${(props) => props.theme.red};
    transform: rotate(-90deg);
    width: 25px;
    height: 25px;
  }
`;
