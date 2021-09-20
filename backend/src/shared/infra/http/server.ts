import 'reflect-metadata'
import 'dotenv/config'

import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'
import routes from './routes'
import '@shared/infra/typeorm'

import { AppError } from '@shared/errors/AppError'

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(cors())

app.use(routes)

app.use((req: Request, res: Response, next: NextFunction) => {
  if (!req.route) {
    throw new AppError('Route not found', 404)
  }
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    })
  }

  console.log(err)
  return res.sendStatus(500)
})

app.listen(port, () => {
  console.log(`Server running on ${port}...`)
})