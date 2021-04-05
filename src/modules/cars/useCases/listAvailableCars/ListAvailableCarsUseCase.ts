import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { injectable, inject } from 'tsyringe'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsFilters } from '@modules/cars/repositories/ICarsRepository'

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarRepository') private readonly carRepository: ICarsRepository
  ) {}
  async execute({ category_id, brand, name }: ICarsFilters): Promise<Car[]> {
    const cars = await this.carRepository.findAvailable({
      category_id,
      brand,
      name
    })
    return cars
  }
}
export { ListAvailableCarsUseCase }
