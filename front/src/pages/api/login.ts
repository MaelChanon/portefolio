import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '@lib/session';
import { initializeApollo } from '@lib/apolloClient';
import { LOGIN } from '@graphql';
import { ApolloQueryResult } from '@apollo/client';
import { LoginResponse } from '@types';

export default withIronSessionApiRoute(async function userRoute(req, res) {
  const apolloClient = initializeApollo();
  try {
    const login = (await apolloClient.mutate({
      mutation: LOGIN,
      variables: { password: req.query.password },
    })) as ApolloQueryResult<{ login: LoginResponse }>;
    req.session.userToken = login.data.login.token;
    // Sauvegarder la session
    await req.session.save();

    // Renvoyer la réponse
    res.status(200).json({
      message: 'Connexion réussie',
    });
  } catch (error: any) {
    res.status(401).json({
      message: "Échec de l'authentification",
      error: error.message,
    });
  }
}, ironOptions);
