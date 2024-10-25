import {
  arg,
  extendInputType,
  inputObjectType,
  intArg,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'
import { uploadImage } from '../lib/uploadImage'
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
        data.photo = uploadImage(data.photo)
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
  },
})

export const UpdateOwnerInput = inputObjectType({
  name: 'UpdateOwnerInput',
  definition(t) {
    t.string('firstname')
    t.string('lastname')
    t.string('role')
    t.string('base64')
    t.field('photo', { type: 'ImageInput' })
    t.string('linkedinLink')
    t.string('githubLink')
  },
})

export const ImageInput = inputObjectType({
  name: 'ImageInput',
  definition(t) {
    t.string('type')
    t.string('name')
    t.string('base64')
  },
})
