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
import { OwnerProvider } from '@providers/ownerProvider';
import { withIronSessionSsr } from 'iron-session/next';
import { ironOptions } from '@lib/session';
import { getIronSession } from 'iron-session';
import { GetServerSidePropsContext } from 'next';

require('events').EventEmitter.defaultMaxListeners = 10;

config.autoAddCss = false;

interface AppInitialProps {}
interface InitialAppProps extends AppProps {
  token: string;
}

export default function MyApp(props: InitialAppProps) {
  const { Component, pageProps } = props;
  // onst session = (await getIronSession(req, res, ironOptions)) as IUser;
  // const login = session?.userToken;
  const client = initializeApollo(props.token);
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
          <OwnerProvider>
            <Component {...pageProps} />
          </OwnerProvider>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
}

MyApp.getInitialProps = async ({ ctx }: { ctx: GetServerSidePropsContext }) => {
  const { req, res } = ctx;

  if (req && res) {
    const session = await getIronSession(req, res, ironOptions);
    return {
      token: session.userToken,
    };
  }

  return;
};
