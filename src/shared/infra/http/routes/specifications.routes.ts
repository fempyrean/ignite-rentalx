import { Router } from 'express'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin'
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController'

const specificationRoutes = Router()
const createSpecificationController = new CreateSpecificationController()

specificationRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
)

export { specificationRoutes }
