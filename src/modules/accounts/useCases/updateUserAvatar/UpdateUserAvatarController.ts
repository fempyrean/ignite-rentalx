import { UpdateUserAvatarUseCase } from '../../useCases/updateUserAvatar/UpdateUserAvatarUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user
    const avatarFile = req.file.filename
    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)
    updateUserAvatarUseCase.execute({ userId: id, avatarFile: avatarFile })

    return res.status(204).send()
  }
}
export { UpdateUserAvatarController }
