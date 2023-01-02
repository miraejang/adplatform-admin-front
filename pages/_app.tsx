import type { AppProps } from "next/app";
import Header from "../components/header";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/globalstyles";
import theme from "../styles/theme";
import { RecoilRoot } from "recoil";
import ErrorBoundary from "../components/errorBoundary";

const Main = styled.main`
  padding: 2rem 1rem;
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Main>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </Main>
      </ThemeProvider>
    </RecoilRoot>
  );
}
