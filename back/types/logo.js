import { objectType } from 'nexus'

export const Logo = objectType({
  name: 'Logo',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('photo')
    t.nonNull.string('color')
    t.nonNull.string('link')
    t.nonNull.string('alt')
    t.nonNull.list.nonNull.field('projects', {
      type: 'ProjectLogo',
      resolve: (parent, _, ctx) => {
        return ctx.prisma.logo
          .findUnique({ where: { id: parent.id } })
          .projects()
      },
    })
  },
})