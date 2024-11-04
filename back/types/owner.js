import { orderBy } from 'lodash'
import { objectType, stringArg } from 'nexus'

export const Owner = objectType({
  name: 'Owner',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('firstname')
    t.nonNull.string('lastname')
    t.nonNull.string('role')
    t.nonNull.media('photo')
    t.nonNull.string('linkedinLink')
    t.nonNull.string('githubLink')
    t.nonNull.list.nonNull.field('projects', {
      type: 'Project',
      resolve: async (parent, _, ctx) => {
        return ctx.prisma.owner
          .findUnique({ where: { id: parent.id } })
          .projects({
            orderBy: {
              order: 'asc',
            },
          })
      },
    })
    t.nonNull.list.nonNull.field('experiences', {
      type: 'Experience',
      resolve: (parent, _, ctx) => {
        return ctx.prisma.owner
          .findUnique({
            where: { id: parent.id },
          })
          .experiences({
            orderBy: {
              startDate: 'desc',
            },
          })
      },
    })
  },
})
