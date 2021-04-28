import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { RentalRepositoryInMemory } from '../../repositories/in-memory/RentalRepositoryInMemory'
import { CarRepositoryInMemory } from '../../../cars/repositories/in-memory/CarRepositoryInMemory'
import { CategoryRepositoryInMemory } from '../../../cars/repositories/in-memory/CategoryRepositoryInMemory'
import { CreateRentalUseCase } from './CreateRentalUseCase'
import { AppError } from '../../../../shared/errors/AppError'
import dayjs from 'dayjs'

let rentalRepositoryInMemory: RentalRepositoryInMemory
let carRepositoryInMemory: CarRepositoryInMemory
let categoryRepositoryInMemory: CategoryRepositoryInMemory
let createRentalUseCase: CreateRentalUseCase
let dayjsDateProvider: DayjsDateProvider

const date = dayjs().add(2, 'day').toDate()
const getRental = () => ({
  user_id: 'any_user',
  car_id: 'any_car',
  expected_return_date: date
})
const getCar = () => ({
  name: 'any_car',
  description: 'any_description',
  daily_rate: 100,
  license_plate: 'any_plate',
  fine_amount: 40,
  // category: 'any_category',
  brand: 'any_brand'
})

describe('Create rental', () => {
  beforeEach(() => {
    dayjsDateProvider = new DayjsDateProvider()
    rentalRepositoryInMemory = new RentalRepositoryInMemory()
    carRepositoryInMemory = new CarRepositoryInMemory()
    categoryRepositoryInMemory = new CategoryRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dayjsDateProvider,
      carRepositoryInMemory
    )
  })

  it('should be able to create a new rental', async () => {
    const category = await categoryRepositoryInMemory.create(
      'any_category',
      'any_description'
    )
    const car = await carRepositoryInMemory.create({ ...getCar(), category })
    const rental = await createRentalUseCase.execute({
      user_id: 'any_user',
      car_id: car.id,
      expected_return_date: date
    })
    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
    expect(rental).toHaveProperty('end_date')
  })

  it('should not be able to rent an already rented car', async () => {
    const category = await categoryRepositoryInMemory.create(
      'any_category',
      'any_description'
    )
    const car = await carRepositoryInMemory.create({ ...getCar(), category })
    await createRentalUseCase.execute({
      user_id: 'any_user',
      car_id: car.id,
      expected_return_date: date
    })
    await expect(
      createRentalUseCase.execute({
        user_id: 'new_user',
        car_id: car.id,
        expected_return_date: date
      })
    ).rejects.toEqual(new AppError('This car is already rented!'))
  })

  it('should not be able to rent a car to an user with a pending rental', async () => {
    const category = await categoryRepositoryInMemory.create(
      'any_category',
      'any_description'
    )
    const car = await carRepositoryInMemory.create({ ...getCar(), category })
    await createRentalUseCase.execute({
      user_id: 'any_user',
      car_id: car.id,
      expected_return_date: date
    })

    const car2 = await carRepositoryInMemory.create({
      ...getCar(),
      category,
      license_plate: 'new_plate'
    })
    await expect(
      createRentalUseCase.execute({
        user_id: 'any_user',
        car_id: car2.id,
        expected_return_date: date
      })
    ).rejects.toEqual(new AppError('This user already has an open rental!'))
  })

  it('should not be able to rent a car for less than 24 hours', async () => {
    await expect(
      createRentalUseCase.execute({
        ...getRental(),
        expected_return_date: new Date()
      })
    ).rejects.toEqual(
      new AppError('A car cannot be rented for less than 24 hours')
    )
  })
})
