import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session/edge';
import { initializeApollo } from '@lib/apolloClient';
import { ApolloQueryResult, gql } from '@apollo/client';
import { ironOptions, IUser } from '@lib/session';

const pathToModel: Record<string, string> = {
  catalogues: 'Catalog',
  'domaines-specialites': 'Domain',
  formations: 'Formation',
  lieux: 'Coordinate',
  'modele-de-document': 'DocumentModel',
  nsf: 'Nsf',
  'personnes-morales': 'Company',
  'personnes-physiques': 'Person',
  programmes: 'Program',
  rome: 'Rome',
  gerer: 'Session',
  sessions: 'Session',
  subventions: 'Subvention',
  'mots-cles': 'KeyWord',
};
const EMPTY_QUERY = gql`
  query ME {
    ME
  }
`;
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const session = (await getIronSession(req, res, ironOptions)) as IUser;

  const login = session?.userToken;
  const paths = req.nextUrl.pathname?.split('/') || [];
  paths.shift();
  if (login) {
    const apolloClient = initializeApollo(login);

    try {
      const me = await apolloClient.query({
        query: EMPTY_QUERY,
        // context: {
        //   headers: {
        //     authorization: `Bearer ${login}`,
        //   },
        // },
      });
      return NextResponse.next();
    } catch (e) {}
  }

  return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
  matcher: '/edit',
};
