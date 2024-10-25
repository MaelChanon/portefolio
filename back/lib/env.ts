import path from 'path'
const staticFolder = process.env.STATIC_FOLDER || 'public'

const envs = {
  DATABASE_URL:
    process.env.DATABASE_URL ||
    'postgresql://kingsman:kingsman@localhost:5437/portefolio?schema=public',
  DOMAIN: process.env.DOMAIN || 'localhost',
  PROTOCOL: process.env.PROTOCOL || 'http',
  PORT: process.env.PORT || '4000',
  STATIC_FOLDER: staticFolder,
  PUBLIC_PATH: path.join(__dirname + '/../', staticFolder),
}

export default envs
