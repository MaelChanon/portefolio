import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient({
  log: [
    /*'query', */ 'info',
    'warn',
    'error',
    /*{
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },*/
  ],
})

prisma.$on('beforeExit', async () => {
  await prisma.$connect()
})

export default prisma
