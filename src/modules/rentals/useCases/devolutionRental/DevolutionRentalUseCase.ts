import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { Rental } from '../../infra/typeorm/entities/Rental'

interface IRequest {
  id: string
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalRepository')
    private readonly rentalRepository: IRentalRepository,
    @inject('CarRepository') private readonly carRepository: ICarsRepository,
    @inject('DateProvider') private readonly dateProvider: IDateProvider
  ) {}

  async execute({ id }: IRequest): Promise<Rental> {
    const minimium_daily = 1
    const rental = await this.rentalRepository.findById(id)
    if (!rental) throw new AppError('Rental does no exist!')
    const car = await this.carRepository.findById(rental.car_id)
    if (!car) throw new AppError('Car does not exist')

    const now = this.dateProvider.dateNow()

    let daily = this.dateProvider.compareInDays(rental.start_date, now)
    if (daily <= 0) daily = minimium_daily

    const delay = this.dateProvider.compareInDays(
      now,
      rental.expected_return_date
    )
    let total = 0
    if (delay > 0) {
      const fine = delay * car.fine_amount
      total = fine
    }
    total += daily * car.daily_rate

    rental.end_date = this.dateProvider.dateNow()
    rental.total = total
    await this.rentalRepository.create(rental)
    await this.carRepository.setAvailable(car.id)
    return rental
  }
}
export { DevolutionRentalUseCase }
