import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *,
  ::after,
  ::before {
    box-sizing: inherit;
  }

  .root {
    font-size: 16px;
  }

  body {
    background-color: ${({theme}) => theme.colors.white};
  }
`;