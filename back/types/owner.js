import { objectType } from 'nexus'

export const Owner = objectType({
  name: 'Owner',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('firstname')
    t.nonNull.string('lastName')
    t.nonNull.string('role')
    t.nonNull.string('photo')
    t.nonNull.string('linkedinLink')
    t.nonNull.string('githubLink')
    t.nonNull.list.nonNull.field('projects', {
      type: 'Project',
      resolve: (parent, _, ctx) => {
        return ctx.prisma.owner
          .findUnique({ where: { id: parent.id } })
          .projects()
      },
    })
    t.nonNull.list.nonNull.field('experiences', {
      type: 'Experience',
      resolve: (parent, _, ctx) => {
        return ctx.prisma.owner
          .findUnique({ where: { id: parent.id } })
          .experiences()
      },
    })
  },
})