import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository'
import { Repository, getRepository, IsNull } from 'typeorm'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'

class RentalRepository implements IRentalRepository {
  private readonly repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { car_id: car_id, total: IsNull() }
    })
    return rental
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { user_id: user_id, total: IsNull() }
    })
    return rental
  }

  async create({
    user_id,
    car_id,
    expected_return_date
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      user_id,
      car_id,
      expected_return_date
    })
    await this.repository.save(rental)
    return rental
  }
}

export { RentalRepository }
