import { objectType } from 'nexus'

export const Project = objectType({
  name: 'Project',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.string('description')
    t.nonNull.string('githubLink')
    t.nonNull.string('videoLink')
    t.nonNull.int('ownerId')
    t.nonNull.field('owner', {
      type: 'Owner',
      resolve: (parent, _, ctx) => {
        return ctx.prisma.project
          .findUnique({
            where: { id: parent.id },
          })
          .owner()
      },
    })
    t.nonNull.list.nonNull.field('logos', {
      type: 'Logo',
      resolve: async (parent, _, ctx) => {
        const projectLogos = await ctx.prisma.project
          .findUnique({ where: { id: parent.id } })
          .logos({
            include: { logo: true },
          })
        return projectLogos.map((pl) => pl.logo)
      },
    })
  },
})
