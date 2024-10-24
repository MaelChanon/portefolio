import { GraphQLDateTime } from 'graphql-iso-date'
import { asNexusMethod, scalarType } from 'nexus'

export const mediaField = scalarType({
  name: 'mediaField',
  asNexusMethod: 'media',
  description: 'media fied',

  serialize(value) {
    const env = process.env
    return `${env.PROTOCOL}://${env.DOMAIN}:${env.PORT}/${env.STATIC_FOLDER}/${value}`
  },
  parseValue(value) {
    return value.split('/').pop() || value
  },
  parseLiteral(ast) {
    if (ast.kind === 'StringValue') {
      return ast.value.split('/').pop() || ast.value
    }
    return null
  },
})
export const GQLDateTime = asNexusMethod(GraphQLDateTime, 'dateTime')
export * from './experiences'
export * from './logo'
export * from './owner'
export * from './project'
export * from './query'
