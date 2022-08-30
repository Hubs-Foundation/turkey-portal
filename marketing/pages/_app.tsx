import "../styles/globals.scss"
import type { AppProps } from "next/app"
import Head from "next/head"
import ThemeProvider from "contexts/ThemeProvider"
import LayoutWrapper from "layouts/LayoutWrapper/LayoutWrapper"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>

      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
      
    </ThemeProvider>
  )
}

export default MyApp
