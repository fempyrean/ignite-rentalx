import { inject, injectable } from 'tsyringe'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { AppError } from '@shared/errors/AppError'
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository'
import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository'
import auth from '@config/auth'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'

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
  refresh_token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: IUserRepository,
    @inject('UserTokenRepository')
    private readonly userTokenRepository: IUserTokenRepository,
    @inject('DateProvider') private readonly dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email)
    const {
      secret_token,
      secret_refresh_token,
      expires_in_token,
      expires_in_refresh_token,
      expires_refresh_token_days
    } = auth
    if (!user) throw new AppError('Could not find user')
    const validPassword = await compare(password, user.password)
    if (!validPassword) throw new AppError('Email or password incorrect')
    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token
    })
    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token
    })
    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days
    )

    await this.userTokenRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date
    })

    return {
      user: { name: user.name, email: user.email },
      token,
      refresh_token
    }
  }
}
export { AuthenticateUserUseCase }
