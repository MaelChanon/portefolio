// @ts-check
import path from 'path'

import { makeSchema } from 'nexus'

import * as types from './types/index'

export const schema = makeSchema({
  types,
  // plugins: [
  //   nexusPrisma({ experimentalCRUD: true, paginationStrategy: 'prisma' }),
  //   declarativeWrappingPlugin(),
  //   PubSubMutation,
  //   PubSubPage,
  //   LogTimePlugin,
  // ],
  outputs: {
    typegen: path.join(process.cwd(), 'types/generated/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'types/generated/schema.graphql'),
  },
  // sourceTypes: {
  //   modules: [
  //     {
  //       module: '@prisma/client',
  //       alias: 'prisma',
  //     },
  //   ],
  // },
})
