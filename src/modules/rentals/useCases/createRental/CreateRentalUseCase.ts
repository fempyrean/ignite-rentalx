import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { injectable, inject } from 'tsyringe'
import { AppError } from '@shared/errors/AppError'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalRepository')
    private readonly rentalRepository: IRentalRepository,
    @inject('DateProvider')
    private readonly dateProvider: IDateProvider,
    @inject('CarRepository') private readonly carRepository: ICarsRepository
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date
  }: IRequest): Promise<Rental> {
    const carRental = await this.rentalRepository.findOpenRentalByCarId(car_id)
    if (carRental) throw new AppError('This car is already rented!')
    const userRental = await this.rentalRepository.findOpenRentalByUserId(
      user_id
    )
    if (userRental) throw new AppError('This user already has an open rental!')

    /** Rent should have a minimum duration of 24 hours */
    const minimumRentalTime = 24
    const hourDiff = this.dateProvider.compareInHours(
      this.dateProvider.dateNow(),
      expected_return_date
    )
    if (hourDiff < minimumRentalTime)
      throw new AppError(
        `A car cannot be rented for less than ${minimumRentalTime} hours`
      )

    const rental = await this.rentalRepository.create({
      user_id,
      car_id,
      expected_return_date
    })

    const car = await this.carRepository.setUnavailable(car_id)

    return rental
  }
}
export { CreateRentalUseCase }
