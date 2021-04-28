import { ICreateUserTokenDTO } from '@modules/accounts/dto/ICreateUserTokenDTO'
import { UserToken } from '@modules/accounts/infra/typeorm/entities/UserToken'
import { runInThisContext } from 'vm'
import { IUserTokenRepository } from '../IUserTokenRepository'

class UserTokenRepositoryInMemory implements IUserTokenRepository {
  private userTokens: UserToken[] = []

  async create({
    expires_date,
    refresh_token,
    user_id
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken()
    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id
    })

    this.userTokens.push(userToken)
    return userToken
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    const userToken = this.userTokens.find(
      (ut) => ut.user_id === user_id && ut.refresh_token === refresh_token
    )
    return userToken
  }
  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    const userToken = this.userTokens.find(
      (ut) => ut.refresh_token === refresh_token
    )
    return userToken
  }
  async deleteById(id: string): Promise<void> {
    const userToken = this.userTokens.find((ut) => ut.user_id === id)
    this.userTokens.splice(this.userTokens.indexOf(userToken))
  }
}
export { UserTokenRepositoryInMemory }
