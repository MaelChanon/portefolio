import {
  arg,
  extendInputType,
  inputObjectType,
  intArg,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'
import { uploadFile, removeFile } from '../lib/files'
import { kMaxLength } from 'buffer'
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

    t.field('updateProject', {
      type: 'Project',
      args: {
        id: nonNull(intArg()),
        data: arg({ type: 'UpdateProjectInput' }),
      },
      resolve: async (_, args, ctx) => {
        let project = undefined
        const { id, data } = args
        if (data.videoLink) {
          project = await ctx.prisma.project.findUnique({
            where: {
              id,
            },
          })
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
        return ctx.prisma.project
          .update({
            where: { id: Number(id) },
            data: values,
          })
          .then(() => {
            if (data.videoLink) removeFile(project.videoLink)
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
          return generateToken({ ok: 'ok' })
        }
        throw new Error('invalid password')
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
