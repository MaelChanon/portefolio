// lib/apolloClient.js
import { ApolloClient, InMemoryCache, NormalizedCacheObject, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { withIronSessionSsr } from 'iron-session/next';

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient(token = ''): ApolloClient<NormalizedCacheObject> {
  // Configure the HttpLink with the GraphQL server's URI
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GQL_URL,
  });

  // Set up context for authorization
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(token?: string): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient(token);

  // For SSG and SSR, always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;

  // Reuse the client on the client-side
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}
