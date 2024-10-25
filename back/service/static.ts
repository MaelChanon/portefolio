import path from 'path'
import { Express } from 'express-serve-static-core'
import express from 'express'
import envs from '../lib/env'

export function staticServe(app: Express) {
  app.use(express.static(envs.PUBLIC_PATH))

  // Configuration pour servir index.html pour les routes client
  app.get('*', (req, res, next) => {
    console.log(req.path)
    if (req.path.startsWith(`/${envs.STATIC_FOLDER}`)) {
      return res.sendFile(
        path.join(
          envs.PUBLIC_PATH,
          req.path.slice(envs.STATIC_FOLDER.length + 2),
        ),
      )
    }
    return next()
  })
}
