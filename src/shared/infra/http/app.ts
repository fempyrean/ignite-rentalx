import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../../../swagger.json'
import { createConnectionPostgres } from '@shared/infra/typeorm'
import { router } from '@shared/infra/http/routes'
import '../../container'
import { AppError } from '@shared/errors/AppError'

createConnectionPostgres()
const app = express()
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(router)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  })
})

export { app }
