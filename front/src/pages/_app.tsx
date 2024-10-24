import { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../styles/index.scss';
import 'quill/dist/quill.snow.css';
import theme from '@lib/theme';
import { initializeApollo } from '@lib/apolloClient';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { ApolloProvider } from '@apollo/client';

require('events').EventEmitter.defaultMaxListeners = 10;

config.autoAddCss = false;

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const client = initializeApollo();
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Maël Chanon</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
}
