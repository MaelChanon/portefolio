import {
  arg,
  inputObjectType,
  intArg,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'
import { uploadFile, removeFile } from '../lib/files'
import envs from '../lib/env'
import { generateToken } from '../lib/jwt'
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
