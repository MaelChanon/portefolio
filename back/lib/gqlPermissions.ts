import { allow, rule, shield } from 'graphql-shield'
import process from 'process'
import { unsealData } from 'iron-session'
import envs from './env'
import { verifyToken } from './jwt'

const isAuthenticated = rule()(async (parent, args, ctx) => {
  const token = ctx.req.get('authorization')
  const jwt = token.replace('Bearer ', '')

  const result = verifyToken(jwt, envs.JSON_PASSWORD)
  if (result.error) {
    console.log('error', result.error)
    throw result.error
  }
  return true
  // try {
  // console.log('console.log')
  // const token = ctx.req.get('authorization')
  // const jwt = token.replace('Bearer ', '')
  // const result = verifyToken(jwt, envs.JSON_PASSWORD)
  //   if (ctx.req.body.operationName === 'Me') {
  //     return true
  //   }
  //   const token = ctx.req.get('authorization')
  //   const jwt = token.replace('Bearer ', '')
  //   const session = await unsealData(jwt, {
  //     password: process.env.TOKEN_SECRET,
  //   })
  //   if (!session['cas_user']) {
  //     throw new Error('Session invalide')
  //   }
  //   const user = await ctx.prisma.user.findUnique({
  //     where: { login: session.cas_user },
  //   })
  //   return Boolean(user)
  // } catch (err) {
  //   console.error(err)
  //   throw new Error(err)
  // }
})

export const permissions = shield(
  {
    Query: {
      ME: isAuthenticated,
      '*': allow,
    },
    // Mutation: {
    //   '*': isAuthenticated,
    //   login: allow,
    // },
  },
  {
    fallbackRule: allow, //for Subscription
  },
)
