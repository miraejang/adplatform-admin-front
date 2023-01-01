import type { AppProps } from "next/app";
import Header from "../components/header";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/globalstyles";
import theme from "../styles/theme";
import { RecoilRoot } from "recoil";

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
          <Component {...pageProps} />
        </Main>
      </ThemeProvider>
    </RecoilRoot>
  );
}
