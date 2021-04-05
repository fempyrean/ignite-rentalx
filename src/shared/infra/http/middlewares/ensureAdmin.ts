import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository'
import { AppError } from '@shared/errors/AppError'
import { Request, Response, NextFunction } from 'express'

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.user
  const userRepository = new UserRepository()
  const user = await userRepository.findById(id)

  if (!user.isAdmin) throw new AppError('User is not an admin!')

  return next()
}
