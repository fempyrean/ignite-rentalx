import multer from 'multer'
import { Router } from 'express'
/** Controllers */
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController'
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'
import { ProfileUserController } from '@modules/accounts/useCases/profileUser/ProfileUserController'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'
import uploadConfig from '@config/upload'

const userRoutes = Router()
const uploadAvatar = multer(uploadConfig)

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()
const profileUserController = new ProfileUserController()

userRoutes.post('/', createUserController.handle)
userRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
)
userRoutes.get('/profile', ensureAuthenticated, profileUserController.handle)

export { userRoutes }
