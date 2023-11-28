import styled, { css, createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    -webkit-font-smoothing: antialiased; 
    -webkit-tap-highlight-color: transparent;
}

body {
    background: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
     font-family: "Oswald", serif;
}

a {
    text-decoration: none
}

a:focus {
    outline: none;
} 

ul {
    list-style: none
}

li {
    list-style-type: none
}

img {
    max-width: 100%;
}
`;

export const Container = styled.div<{ $small?: boolean }>`
  margin: 0 auto;
  max-width: ${(props) => props.theme.breakpoint_small};
  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    max-width: ${(props) => (props.$small ? props.theme.breakpoint_small : props.theme.breakpoint_medium)};
  }
`;

export const Flex = styled.div<{ $justify?: string; $align?: string; $direction?: string }>`
  display: flex;
  justify-content: ${(props) => props.$justify || "flex-start"};
  align-items: ${(props) => props.$align || "flex-start"};
  flex-direction: ${(props) => props.$direction || ""};
`;

export const Grid = styled.div`
  display: grid;
  place-items: center;
`;

export const DisplayMedia = styled.div<{ $media?: boolean }>`
  ${({ $media }) =>
    $media
      ? css`
          display: none;
          @media (min-width: ${(props) => props.theme.breakpoint_small}) {
            display: block;
          }
        `
      : css`
          display: block;
          @media (min-width: ${(props) => props.theme.breakpoint_small}) {
            display: none;
          }
        `}
`;

export const TextDecoration = styled.span`
  position: relative;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    bottom: 10%;
    left: -5%;
    width: 110%;
    height: ${(props) => props.theme.size2};
    background: ${(props) => props.theme.fourthColor};
    z-index: -1;
    border-radius: 18px;
  }
`;

export const Dot = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: ${(props) => props.theme.orange};
  margin-right: ${(props) => props.theme.size2};
  padding: ${(props) => props.theme.size1};
`;
