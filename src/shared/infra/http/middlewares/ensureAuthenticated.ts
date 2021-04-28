import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository'
import { AppError } from '@shared/errors/AppError'
import auth from '@config/auth'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization
  if (!authHeader) throw new AppError('Token not found', 401)
  const [, token] = authHeader.split(' ')
  try {
    const { sub: userId } = verify(token, auth.secret_token) as IPayload
    req.user = {
      id: userId
    }
    next()
  } catch (err) {
    throw new AppError('Invalid token', 401)
  }
}
