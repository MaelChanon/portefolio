import express from 'express'
import { createServer } from 'http'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { schema } from './schema'
import { Context } from './types'
import prisma from './lib/prisma'
import path from 'path'
import { staticServe } from './service/static'
async function context(request: any): Promise<Context> {
  return {
    ...request,
    // pubsub,
    prisma,
  }
}

;(async () => {
  const PORT = process.env.PORT || 4000
  const app = express()
  const httpServer = createServer(app)
  //faire le bail du middleware
  const isOnline = false
  const staticFolder = 'public'
  const publicPath = path.join(__dirname, staticFolder)
  console.log(publicPath)
  staticServe(app)
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
    path: '/graphql',
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
