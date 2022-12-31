import type { AppProps } from "next/app";
import Header from "../components/header";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/globalstyles";
import theme from "../styles/theme";

const Main = styled.main`
  padding: 2rem 1rem;
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Main>
          <Component {...pageProps} />
        </Main>
      </ThemeProvider>
    </>
  );
}
