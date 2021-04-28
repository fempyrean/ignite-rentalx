import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository'
import { AppError } from '@shared/errors/AppError'
import { UserMap } from '@modules/accounts/mapper/UserMap'
import { IUserResponseDTO } from '@modules/accounts/dto/IUserResponseDTO'

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: IUserRepository
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.userRepository.findById(id)
    if (!user) throw new AppError('Could not find user')
    return UserMap.toDTO(user)
  }
}
export { ProfileUserUseCase }
