import fs from 'fs'
import crypto from 'crypto'
import envs from './env'
interface fileData {
  name: string
  type: string
  base64: string
}
export function uploadFile(photo: fileData): string {
  const extension = photo.type.split('/')[1]
  const imageBuffer = Buffer.from(photo.base64, 'base64')
  const filename = `${crypto.randomBytes(16).toString('hex')}.${extension}`
  const filePath = `${envs.STATIC_FOLDER}/${filename}`
  fs.writeFileSync(filePath, imageBuffer)
  return filename
}
export function removeFile(filename: string) {
  const filePath = `${envs.STATIC_FOLDER}/${filename}`
  fs.unlink(filePath, (err) => {
    if (err) throw err
    console.log('Le fichier a été supprimé')
  })
}
