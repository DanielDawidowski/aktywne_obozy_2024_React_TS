import { createGlobalStyle } from "styled-components";

export const TypographyStyles = createGlobalStyle`
h1, h2, h3, h4, h5, h6 { 
    color: ${(props) => props.theme.text};
    font-weight: 300;
}

h1 {
    font-size: ${(props) => props.theme.size6};
    @media (max-width: ${(props) => props.theme.breakpoint_small}) {
        font-size: ${(props) => props.theme.size5};
    }
}

h2 {
    font-size: ${(props) => props.theme.size4};
}

h3 {
    font-size: ${(props) => props.theme.size3};
}

h4 {
    font-size: ${(props) => props.theme.size2};
}

h5 {
    font-size: ${(props) => props.theme.size1};
}

h6 {
    font-size: calc(${(props) => props.theme.size1} / 1.5);
}

b {
    font-weight: 700;
}

small {
    font-style: italic;
}
`;
