import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background.standard};
    color: ${({ theme }) => theme.text.standard};
  }

  a {
    color: ${({ theme }) => theme.text.link};
  }
`;

export default GlobalStyle;
