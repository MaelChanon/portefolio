import { objectType } from 'nexus'

export const Experience = objectType({
  name: 'Experience',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.field('startDate', { type: 'DateTime' })
    t.nonNull.field('endDate', { type: 'DateTime' })
    t.nonNull.string('logo')
    t.nonNull.string('compagny')
    t.nonNull.string('title')
    t.nonNull.string('description')
    t.nonNull.int('ownerId')
    t.nonNull.field('owner', {
      type: 'Owner',
      resolve: (parent, _, ctx) => {
        return ctx.prisma.experience
          .findUnique({ where: { id: parent.id } })
          .owner()
      },
    })
  },
})
