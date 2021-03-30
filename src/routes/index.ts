import { Router } from 'express'
import { categoryRoutes } from './categories.routes'
import { specificationRoutes } from './specifications.routes'
import { userRoutes } from './users.routes'
import { authenticationRoutes } from './authentication.routes'

const router = Router()

router.use('/category', categoryRoutes)
router.use('/specification', specificationRoutes)
router.use('/user', userRoutes)
router.use('/auth', authenticationRoutes)

export { router }
