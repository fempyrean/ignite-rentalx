import { inject, injectable } from 'tsyringe'
import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository'
import { Rental } from '../../infra/typeorm/entities/Rental'

interface IRequest {
  user_id: string
}

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalRepository')
    private readonly rentalRepository: IRentalRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<Rental[]> {
    const rentals = await this.rentalRepository.findByUserId(user_id)
    return rentals
  }
}
export { ListRentalsByUserUseCase }
