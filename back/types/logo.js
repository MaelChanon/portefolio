import { objectType } from 'nexus'

export const Logo = objectType({
  name: 'Logo',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.media('photo')
    t.nonNull.string('color')
    t.nonNull.string('link')
    t.nonNull.string('alt')
    t.nonNull.list.nonNull.field('projects', {
      type: 'Project',
      resolve: (parent, _, ctx) => {
        return ctx.prisma.projectLogo.findMany({
          where: { logoId: parent.id },
        })
      },
    })
  },
})
