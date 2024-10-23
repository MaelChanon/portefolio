import { objectType } from 'nexus'

export const ProjectLogo = objectType({
  name: 'ProjectLogo',
  definition(t) {
    t.nonNull.int('logoId')
    t.nonNull.int('projectId')
    t.nonNull.field('logo', {
      type: 'Logo',
      resolve: (parent, _, ctx) => {
        return ctx.prisma.projectLogo
          .findUnique({ 
            where: { 
              logoId_projectId: {
                logoId: parent.logoId,
                projectId: parent.projectId
              }
            }
          })
          .logo()
      },
    })
    t.nonNull.field('project', {
      type: 'Project',
      resolve: (parent, _, ctx) => {
        return ctx.prisma.projectLogo
          .findUnique({ 
            where: { 
              logoId_projectId: {
                logoId: parent.logoId,
                projectId: parent.projectId
              }
            }
          })
          .project()
      },
    })
  },
})
