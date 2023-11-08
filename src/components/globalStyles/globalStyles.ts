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
    font-family: "Manrope", sans-serif;
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

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1440px;
  width: 100%;
`;

export const Flex = styled.div<{ justify?: string; align?: string }>`
  display: flex;
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
`;

export const DisplayMedia = styled.div<{ media?: boolean }>`
  ${({ media }) =>
    media
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
