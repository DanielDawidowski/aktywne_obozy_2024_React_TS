import styled from "styled-components";

export const InformationStyles = styled.div`
  background: ${(props) => props.theme.body};
  border-radius: 18px;
  padding: ${(props) => props.theme.size1};
  border: 1px solid ${(props) => props.theme.orange};
  display: flex;
  width: 100%;
  max-width: 400px;
  h3:nth-child(1) {
    color: ${(props) => props.theme.orange};
  }
`;

export const InformationIconStyles = styled.div`
  display: grid;
  place-items: center;
  padding: ${(props) => props.theme.size2};
  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    padding: ${(props) => props.theme.size5};
  }

  svg {
    width: 38px;
    height: 38px;
    @media (min-width: ${(props) => props.theme.breakpoint_small}) {
      width: 68px;
      height: 68px;
    }
  }
`;

export const InformationBodyStyles = styled.div`
  width: 100%;
  position: relative;
  padding: var(--size-1);
  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    padding: ${(props) => props.theme.size5};
  }
`;
