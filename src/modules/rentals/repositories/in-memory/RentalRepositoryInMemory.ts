import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalRepository } from '../IRentalRepository'

class RentalRepositoryInMemory implements IRentalRepository {
  private readonly rentals: Rental[] = []

  async findById(id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.id === id)
  }
  async findByUserId(user_id: string): Promise<Rental[]> {
    return this.rentals.filter((rental) => rental.user_id === user_id)
  }

  async create({
    user_id,
    car_id,
    expected_return_date
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental()
    Object.assign(rental, {
      car_id,
      expected_return_date,
      user_id,
      start_date: new Date(),
      end_date: null
    })

    this.rentals.push(rental)
    return rental
  }
  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && rental.end_date === null
    )
  }
  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && rental.end_date === null
    )
  }
}

export { RentalRepositoryInMemory }
