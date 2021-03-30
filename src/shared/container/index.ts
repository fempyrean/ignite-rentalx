import { container } from 'tsyringe'
import { ICategoryRepository } from '../../modules/cars/repositories/ICategoryRepository'
import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository'
import { IUserRepository } from '../../modules/accounts/repositories/IUserRepository'
import { CategoryRepository } from '../../modules/cars/repositories/implementations/CategoryRepository'
import { SpecificationRepository } from '../../modules/cars/repositories/implementations/SpecificationRepository'
import { UserRepository } from '../../modules/accounts/repositories/implementations/UserRepository'

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository
)

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository
)

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
