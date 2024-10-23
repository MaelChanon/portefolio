import {extendType, intArg, nonNull, stringArg } from "nexus";

export const queries = extendType({
    type: 'Query',
    definition(t) {
      // Get all owners
      t.field('owner', {
        type: 'Owner',
        args: {
          id: nonNull(intArg()),
        },
        resolve: (_, { id }, ctx) => {
          return ctx.prisma.owner.findUnique({
            where: {
              id: 1// Assurons-nous que l'ID est bien une chaîne
            }
          })
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
  