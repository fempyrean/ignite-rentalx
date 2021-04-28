import { IUserRepository } from '@modules/accounts/repositories/IUserRepository'
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  userId: string
  avatarFile: string
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: IUserRepository,
    @inject('StorageProvider')
    private readonly storageProvider: IStorageProvider
  ) {}

  async execute({ userId, avatarFile }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(userId)
    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, 'avatar')
    }
    await this.storageProvider.save(avatarFile, 'avatar')
    user.avatar = avatarFile

    await this.userRepository.create(user)
  }
}
export { UpdateUserAvatarUseCase }
