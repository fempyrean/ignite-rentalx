import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { RentalRepositoryInMemory } from '../../repositories/in-memory/RentalRepositoryInMemory'
import { CreateRentalUseCase } from './CreateRentalUseCase'
import { AppError } from '../../../../shared/errors/AppError'
import dayjs from 'dayjs'

let rentalRepositoryInMemory: RentalRepositoryInMemory
let createRentalUseCase: CreateRentalUseCase
let dayjsDateProvider: DayjsDateProvider

const date = dayjs().add(2, 'day').toDate()
const getRental = () => ({
  user_id: 'any_user',
  car_id: 'any_car',
  expected_return_date: date
})

describe('Create rental', () => {
  beforeEach(() => {
    dayjsDateProvider = new DayjsDateProvider()
    rentalRepositoryInMemory = new RentalRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dayjsDateProvider
    )
  })

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute(getRental())
    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
    expect(rental).toHaveProperty('end_date')
  })

  it('should not be able to rent an already rented car', () => {
    expect(async () => {
      await createRentalUseCase.execute(getRental())
      await createRentalUseCase.execute({
        ...getRental(),
        user_id: 'new_id'
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to rent a car to an user with a pending car', () => {
    expect(async () => {
      await createRentalUseCase.execute(getRental())
      await createRentalUseCase.execute({
        ...getRental(),
        car_id: 'new_id'
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to rent a car for less than 24 hours', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        ...getRental(),
        expected_return_date: new Date()
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
