import { createGlobalStyle } from "styled-components";

export const TypographyStyles = createGlobalStyle`
h1, h2, h3, h4, h5, h6, b { 
    color: ${(props) => props.theme.text};
    font-weight: 300;
    /* font-family: "Lora", serif; */
    font-family: 'Lora',  sans-serif;
}

h1 {
    font-size: ${(props) => props.theme.size7};
    @media (max-width: ${(props) => props.theme.breakpoint_small}) {
        font-size: ${(props) => props.theme.size6};
    }
}

h2 {
    font-size: ${(props) => props.theme.size6};
     @media (max-width: ${(props) => props.theme.breakpoint_small}) {
        font-size: ${(props) => props.theme.size5};
    }
}

h3 {
    font-size: ${(props) => props.theme.size5};
     @media (max-width: ${(props) => props.theme.breakpoint_small}) {
        font-size: ${(props) => props.theme.size4};
    }
}

h4 {
    font-size: ${(props) => props.theme.size4};
     @media (max-width: ${(props) => props.theme.breakpoint_small}) {
        font-size: ${(props) => props.theme.size3};
    }
}

h5 {
    font-size: ${(props) => props.theme.size3};
     @media (max-width: ${(props) => props.theme.breakpoint_small}) {
        font-size: ${(props) => props.theme.size2};
    }
}

h6 {
    font-size: ${(props) => props.theme.size2};
     @media (max-width: ${(props) => props.theme.breakpoint_small}) {
        font-size: ${(props) => props.theme.size1};
    }
}

b {
    font-weight: 700;
}


`;
