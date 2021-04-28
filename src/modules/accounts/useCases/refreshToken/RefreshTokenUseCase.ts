import { verify, sign } from 'jsonwebtoken'
import { inject } from 'tsyringe'
import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository'
import auth from '@config/auth'
import { AppError } from '@shared/errors/AppError'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'

interface IPayload {
  sub: string
  email: string
}

interface ITokenResponse {
  token: string
  refresh_token: string
}

class RefreshTokenUseCase {
  constructor(
    @inject('UserTokenRepository')
    private readonly userTokenRepository: IUserTokenRepository,
    @inject('DateProvider') private readonly dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { secret_refresh_token } = auth
    const { sub: user_id, email } = verify(
      token,
      secret_refresh_token
    ) as IPayload
    const userToken = await this.userTokenRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    )
    if (!userToken) {
      throw new AppError('Refresh Token not found')
    }

    await this.userTokenRepository.deleteById(userToken.id)

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token
    })

    const expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days
    )

    await this.userTokenRepository.create({
      user_id,
      refresh_token,
      expires_date
    })

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token
    })

    return { refresh_token, token: newToken }
  }
}
export { RefreshTokenUseCase }
