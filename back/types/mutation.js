import {
  arg,
  inputObjectType,
  intArg,
  list,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'
import { uploadFile, removeFile } from '../lib/files'
import envs from '../lib/env'
import { generateToken } from '../lib/jwt'
import { includes } from 'lodash'
const fs = require('fs')
export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('updateOwner', {
      type: 'Owner',
      args: {
        id: nonNull(intArg()),
        data: arg({ type: 'UpdateOwnerInput' }),
      },
      resolve: (_, args, ctx) => {
        const { id, data } = args
        data.photo = uploadFile(data.photo)
        const values = {
          ...Object.entries(data).reduce((acc, [key, value]) => {
            if (value) {
              acc[key] = value
            }
            return acc
          }, {}),
        }
        return ctx.prisma.owner.update({
          where: { id: Number(id) },
          data: values,
        })
      },
    })
    t.field('createProject', {
      type: 'Project',
      args: {
        data: arg({ type: 'UpdateProjectInput' }),
      },
      resolve: async (_, args, ctx) => {
        const { data } = args
        delete data.order
        if (data.videoLink) {
          data.videoLink = uploadFile(data.videoLink)
        }
        if (data.logos) {
          await ctx.prisma.projectLogo.deleteMany({
            where: {
              projectId: id,
            },
          })

          await ctx.prisma.projectLogo.createMany({
            data: data.logos.map((logoId) => {
              return {
                projectId: id,
                logoId,
              }
            }),
          })
          delete data.logos
        }

        const values = {
          ...Object.entries(data).reduce((acc, [key, value]) => {
            if (value) {
              acc[key] = value
            }
            return acc
          }, {}),
        }
        values.ownerId = 1
        return ctx.prisma.project.create({
          data: values,
        })
      },
    })
    t.field('updateProject', {
      type: 'Project',
      args: {
        id: nonNull(intArg()),
        data: arg({ type: 'UpdateProjectInput' }),
      },
      resolve: async (_, args, ctx) => {
        const { id, data } = args
        let project = await ctx.prisma.project.findUnique({
          where: {
            id,
          },
        })

        if (data.videoLink) {
          data.videoLink = uploadFile(data.videoLink)
        }

        if (project.order !== data.order) {
          await ctx.prisma.project.updateMany({
            where: { order: data.order },
            data: {
              order: project.order,
            },
          })
        }
        if (data.logos) {
          await ctx.prisma.projectLogo.deleteMany({
            where: {
              projectId: id,
            },
          })

          await ctx.prisma.projectLogo.createMany({
            data: data.logos.map((logoId) => {
              return {
                projectId: id,
                logoId,
              }
            }),
          })
          delete data.logos
        }
        const values = {
          ...Object.entries(data).reduce((acc, [key, value]) => {
            if (value) {
              acc[key] = value
            }
            return acc
          }, {}),
        }
        return ctx.prisma.project
          .updateMany({
            where: { id: Number(id) },
            data: values,
          })
          .then(() => {
            if (data.videoLink && project) removeFile(project.videoLink)
          })
      },
    })

    t.field('login', {
      type: objectType({
        name: 'LoginResponse',
        definition(t) {
          t.boolean('success')
          t.string('token')
          t.string('expiresIn')
        },
      }),
      args: {
        password: stringArg(),
      },
      resolve: (_, { password }, ctx) => {
        if (envs.BACKEND_PASSWORD === password) {
          console.log('bh oui')
          return generateToken({ ok: 'ok' })
        }
        throw new Error('invalid password')
      },
    })

    t.field('updateLogo', {
      type: 'Logo',
      args: {
        id: intArg(),
        data: arg({ type: 'UpdateLogoInput' }),
      },
      resolve: async (_, args, ctx) => {
        const { id, data } = args
        if (data.photo) {
          data.photo = uploadFile(data.photo)
        }
        const values = {
          ...Object.entries(data).reduce((acc, [key, value]) => {
            if (value) {
              acc[key] = value
            }
            return acc
          }, {}),
        }

        const existingLogo = id
          ? await ctx.prisma.logo.findUnique({
              where: { id: Number(id) },
            })
          : undefined

        if (existingLogo) {
          // If it exists, only prepare the fields that need to be updated
          return ctx.prisma.logo
            .update({
              where: { id: Number(id) },
              data: values,
            })
            .then(() => {
              if (data.photo && project) removeFile(existingLogo.photo)
            })
        } else {
          // If it doesn't exist, create a new logo
          return ctx.prisma.logo.create({
            data: values,
          })
        }
      },
    })
    t.crud.deleteOneLogo()

    t.field('updateProjectLogo', {
      type: 'Boolean',
      args: {
        id: nonNull(intArg()),
        data: nonNull(list('Int')),
      },
      resolve: async (_, args, ctx) => {
        const { id, data } = args

        return true
        // return await prisma.user.update({
        //   where: { id },
        //   data: {
        //     ProjectLogo: {
        //       create: data.map((data) => ({
        //         logoId: id,
        //         projectId: data,
        //       })),
        //     },
        //   },
        //   include: {
        //     UserRole: {
        //       include: {
        //         role: true,
        //       },
        //     },
        //   },
        // })
      },
    })
  },
})

export const UpdateOwnerInput = inputObjectType({
  name: 'UpdateOwnerInput',
  definition(t) {
    t.string('firstname')
    t.string('lastname')
    t.string('role')
    t.string('base64')
    t.field('photo', { type: 'fileInput' })
    t.string('linkedinLink')
    t.string('githubLink')
  },
})

export const UpdateProjectInput = inputObjectType({
  name: 'UpdateProjectInput',
  definition(t) {
    t.string('name')
    t.string('description')
    t.string('githubLink')
    t.string('logos')
    t.field('videoLink', { type: 'fileInput' })
    t.int('order')
    t.list.int('logos')
  },
})

export const fileInput = inputObjectType({
  name: 'fileInput',
  definition(t) {
    t.string('type')
    t.string('name')
    t.string('base64')
  },
})

export const UpdateLogoInput = inputObjectType({
  name: 'UpdateLogoInput',
  definition(t) {
    t.field('photo', { type: 'fileInput' })
    t.string('alt')
    t.string('link')
    t.string('color')
  },
})
export const DeleteWhereInput = inputObjectType({
  name: 'DeleteWhereInput',
  definition(t) {
    t.int('id')
  },
})
