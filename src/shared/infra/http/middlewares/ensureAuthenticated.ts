import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository'
import { AppError } from '@shared/errors/AppError'

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
    const { sub: userId } = verify(
      token,
      'c352276f6ce648751ad37a0efde66ca1'
    ) as IPayload

    const userRepository = new UserRepository()
    const user = await userRepository.findById(userId)
    if (!user) throw new AppError('User does not exist', 401)
    req.user = {
      id: userId
    }
    next()
  } catch (err) {
    throw new AppError('Invalid token', 401)
  }
}
