import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // True si côté serveur
    uri: process.env.NEXT_PUBLIC_GQL_URL,
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
