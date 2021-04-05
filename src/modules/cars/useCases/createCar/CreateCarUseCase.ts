import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { inject, injectable } from 'tsyringe'
import { AppError } from '@shared/errors/AppError'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { Category } from '@modules/cars/infra/typeorm/entities/Category'

interface IRequest {
  name: string
  description: string
  daily_rate: number
  license_plate: string
  fine_amount: number
  brand: string
  category: Category
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarRepository') private readonly carRepository: ICarsRepository
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category
  }: IRequest): Promise<Car> {
    const car = await this.carRepository.findByLicensePlate(license_plate)
    if (car) throw new AppError('License plate already being used!')

    const newCar = await this.carRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category
    })

    return newCar
  }
}
export { CreateCarUseCase }
