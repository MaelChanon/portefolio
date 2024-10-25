import fs from 'fs'
import crypto from 'crypto'
import envs from './env'
interface fileData {
  name: string
  type: string
  base64: string
}
export function uploadImage(photo: fileData): string {
  const extension = photo.type.split('/')[1]
  const imageBuffer = Buffer.from(photo.base64, 'base64')
  const fileName = `${envs.STATIC_FOLDER}/${crypto
    .randomBytes(16)
    .toString('hex')}.${extension}`
  console.log(fileName)
  fs.writeFileSync(fileName, imageBuffer)
  return fileName
}
