import { Router } from 'express'
import { categoryRoutes } from './categories.routes'
import { specificationRoutes } from './specifications.routes'
import { userRoutes } from './users.routes'
import { authenticationRoutes } from './authentication.routes'
import { carRoutes } from './cars.routes'
import { rentalRoutes } from './rental.routes'

const router = Router()

router.use('/category', categoryRoutes)
router.use('/specification', specificationRoutes)
router.use('/user', userRoutes)
router.use('/auth', authenticationRoutes)
router.use('/car', carRoutes)
router.use('/rental', rentalRoutes)

export { router }
