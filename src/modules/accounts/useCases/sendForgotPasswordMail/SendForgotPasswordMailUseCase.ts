import { injectable, inject } from 'tsyringe'
import { v4 as uuidV4 } from 'uuid'
import { resolve } from 'path'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider'
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository'
import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: IUserRepository,
    @inject('UserTokenRepository')
    private readonly userTokenRepository: IUserTokenRepository,
    @inject('DateProvider') private readonly dateProvider: IDateProvider,
    @inject('MailProvider') private readonly mailProvider: IMailProvider
  ) {}

  async execute(email: string) {
    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs'
    )
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new AppError('Could not find user')
    }

    const token = uuidV4()
    const expires_date = this.dateProvider.addHours(3)
    await this.userTokenRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date
    })

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`
    }

    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha',
      variables,
      templatePath
    )
  }
}
export { SendForgotPasswordMailUseCase }
