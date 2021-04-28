import { ICreateUserTokenDTO } from '@modules/accounts/dto/ICreateUserTokenDTO'
import { UserToken } from '@modules/accounts/infra/typeorm/entities/UserToken'

interface IUserTokenRepository {
  create({
    expires_date,
    refresh_token,
    user_id
  }: ICreateUserTokenDTO): Promise<UserToken>
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken>
  findByRefreshToken(refresh_token: string): Promise<UserToken>
  deleteById(id: string): Promise<void>
}

export { IUserTokenRepository }
