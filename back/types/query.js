import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus'
import envs from '../lib/env'
import { generateToken } from '../lib/jwt'

export const queries = extendType({
  type: 'Query',
  definition(t) {
    // Get all owners
    t.field('owner', {
      type: 'Owner',
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_, { id }, ctx) => {
        const owner = await ctx.prisma.owner.findUnique({
          where: { id },
        })
        return owner
      },
    })
    t.field('ME', {
      type: 'String',
      resolve: async (_, { id }, ctx) => {
        return 'ok'
      },
    })
    // Get all projects
    t.nonNull.list.nonNull.field('projects', {
      type: 'Project',
      resolve: (_, __, ctx) => {
        return ctx.prisma.project.findMany()
      },
    })

    // Get all logos
    t.nonNull.list.nonNull.field('logos', {
      type: 'Logo',
      resolve: (_, __, ctx) => {
        return ctx.prisma.logo.findMany()
      },
    })

    // Get all experiences
    t.nonNull.list.nonNull.field('experiences', {
      type: 'Experience',
      resolve: (_, __, ctx) => {
        return ctx.prisma.experience.findMany()
      },
    })
  },
})
