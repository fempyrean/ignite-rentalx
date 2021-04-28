import { injectable, inject } from 'tsyringe'
import { hash } from 'bcrypt'
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository'
import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository'
import { AppError } from '@shared/errors/AppError'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UserTokenRepository')
    private readonly userTokenRepository: IUserTokenRepository,
    @inject('DateProvider') private readonly dateProvider: IDateProvider,
    @inject('UserRepository') private readonly userRepository: IUserRepository
  ) {}

  async execute({ token, password }: IRequest) {
    const userToken = await this.userTokenRepository.findByRefreshToken(token)
    if (!userToken) throw new AppError('Invalid token!')
    if (
      this.dateProvider.isBefore(
        userToken.expires_date,
        this.dateProvider.dateNow()
      )
    ) {
      throw new AppError('Expired token!')
    }

    const user = await this.userRepository.findById(userToken.user_id)
    user.password = await hash(password, 8)

    await this.userRepository.create(user)
    await this.userTokenRepository.deleteById(userToken.id)
  }
}
export { ResetPasswordUserUseCase }
