import express from 'express'
import { createServer } from 'http'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { schema } from './schema'
import { Context } from './types'
import prisma from './lib/prisma'
async function context(request: any): Promise<Context> {
  return {
    ...request,
    // pubsub,
    prisma,
  }
}

;(async () => {
  const PORT = 4000
  const app = express()
  const httpServer = createServer(app)
  //faire le bail du middleware
  const isOnline = false

  const server = new ApolloServer({
    schema,
    context,
    introspection: false,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  await server.start()
  server.applyMiddleware({
    app,
    cors: true,
    path: '/',
    bodyParserConfig: {
      limit: '300mb',
    },
  })
  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Query/Mutation endpoint ready at http://localhost:${PORT}${server.graphqlPath}`,
    )
  })
})()
