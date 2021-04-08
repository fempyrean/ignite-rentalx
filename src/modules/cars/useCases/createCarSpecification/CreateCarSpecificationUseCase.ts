import { injectable, inject } from 'tsyringe'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository'
import { AppError } from '@shared/errors/AppError'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'

interface IRequest {
  car_id: string
  specifications_id: string[]
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarRepository') private readonly carRepository: ICarsRepository,
    @inject('SpecificationRepository')
    private readonly specificationRepository: ISpecificationRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const car = await this.carRepository.findById(car_id)
    if (!car) throw new AppError('Could not find car')
    const specifications = await this.specificationRepository.findByIds(
      specifications_id
    )
    car.specifications = specifications
    await this.carRepository.create(car)
    return car
  }
}
export { CreateCarSpecificationUseCase }
