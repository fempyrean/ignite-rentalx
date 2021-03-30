import { IUserRepository } from '../../repositories/IUserRepository'
import { AppError } from '../../../../errors/AppError'
import { inject, injectable } from 'tsyringe'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  private readonly jsonSecret

  constructor(
    @inject('UserRepository') private readonly userRepository: IUserRepository
  ) {
    this.jsonSecret = 'c352276f6ce648751ad37a0efde66ca1'
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) throw new AppError('Could not find user')
    const validPassword = await compare(password, user.password)
    if (!validPassword) throw new AppError('Email or password incorrect')
    const token = sign({}, this.jsonSecret, {
      subject: user.id,
      expiresIn: '1d'
    })

    return { user: { name: user.name, email: user.email }, token }
  }
}
export { AuthenticateUserUseCase }
