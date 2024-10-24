import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import getConfig from 'next/config';

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // True si côté serveur
    uri:
      typeof window === 'undefined'
        ? serverRuntimeConfig.graphqlUrl // URL serveur
        : publicRuntimeConfig.graphqlUrl, // URL client
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(): ApolloClient<NormalizedCacheObject> {
  // Créer une nouvelle instance pour chaque requête SSR
  const _apolloClient = apolloClient ?? createApolloClient();

  // Pour SSG et SSR, créer toujours un nouveau client
  if (typeof window === 'undefined') return _apolloClient;

  // Créer le client une seule fois côté client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}
