import path from 'path'
import { Express } from 'express-serve-static-core'
import express from 'express'
export const staticFolder = process.env.STATIC_FOLDER || 'public'
const publicPath = path.join(__dirname + '/../', staticFolder)

export function staticServe(app: Express) {
  app.use(express.static(publicPath))

  // Configuration pour servir index.html pour les routes client
  app.get('*', (req, res, next) => {
    console.log(req.path)
    if (req.path.startsWith(`/${staticFolder}`)) {
      return res.sendFile(
        path.join(publicPath, req.path.slice(staticFolder.length + 2)),
      )
    }
    return next()
  })
}
