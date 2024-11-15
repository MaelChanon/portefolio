import express from 'express'
import { createServer } from 'http'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { schema } from './schema'
import { Context } from './types'
import prisma from './lib/prisma'
import path from 'path'
import { staticServe } from './service/static'
import envs from './lib/env'
import { applyMiddleware } from 'graphql-middleware'
import { permissions } from './lib/gqlPermissions'

async function context(request: any): Promise<Context> {
  return {
    ...request,
    // pubsub,
    prisma,
  }
}

;(async () => {
  const app = express()
  const httpServer = createServer(app)
  //faire le bail du middleware
  staticServe(app)
  const isOnline = false
  const staticFolder = 'public'
  const publicPath = path.join(__dirname, staticFolder)
  const server = new ApolloServer({
    schema: isOnline ? applyMiddleware(schema, permissions) : schema,
    context,
    introspection: false,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    debug: true,
  })
  await server.start()
  server.applyMiddleware({
    app,
    cors: true,
    path: '/graphql',
    bodyParserConfig: {
      limit: '300mb',
    },
  })
  httpServer.listen(envs.PORT, () => {
    console.log(
      `🚀 Query/Mutation endpoint ready at http://localhost:${envs.PORT}${server.graphqlPath}`,
    )
  })
})()
