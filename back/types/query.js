import { extendType, intArg, nonNull, stringArg } from 'nexus'

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
