import { container } from 'tsyringe'
/** Interfaces */
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository'
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository'
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
/** Repositories */
import { CategoryRepository } from '@modules/cars/infra/typeorm/repositories/CategoryRepository'
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository'
import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository'
import { CarRepository } from '@modules/cars/infra/typeorm/repositories/CarRepository'

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository
)

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository
)

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)

container.registerSingleton<ICarsRepository>('CarRepository', CarRepository)
