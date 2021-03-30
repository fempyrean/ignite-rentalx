import { IUserRepository } from '../../repositories/IUserRepository'
import { deleteFile } from '../../../../utils/file'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  userId: string
  avatarFile: string
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: IUserRepository
  ) {}

  async execute({ userId, avatarFile }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(userId)
    if (user.avatar) await deleteFile(`./tmp/avatar/${user.avatar}`)
    user.avatar = avatarFile
    await this.userRepository.create(user)
  }
}
export { UpdateUserAvatarUseCase }
