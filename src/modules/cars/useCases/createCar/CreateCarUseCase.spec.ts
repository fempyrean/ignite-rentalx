import { CategoryRepositoryInMemory } from '../../repositories/in-memory/CategoryRepositoryInMemory'
import { CarRepositoryInMemory } from '../../repositories/in-memory/CarRepositoryInMemory'
import { CreateCarUseCase } from './CreateCarUseCase'
import { AppError } from '../../../../shared/errors/AppError'

let createCarUseCase: CreateCarUseCase
let carRepositoryInMemory: CarRepositoryInMemory
let categoryRepositoryInMemory: CategoryRepositoryInMemory

const getCar = async () => {
  const category = await categoryRepositoryInMemory.create(
    'any_name',
    'any_description'
  )

  return {
    name: 'any_name',
    description: 'any_description',
    daily_rate: 10,
    license_plate: 'any_plate',
    fine_amount: 50,
    brand: 'any_brand',
    category: category
  }
}

describe('Create car', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory()
    carRepositoryInMemory = new CarRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carRepositoryInMemory)
  })

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute(await getCar())
    expect(car).toHaveProperty('id')
  })

  it('should not be able create a new car with an used licensed_plate', async () => {
    await createCarUseCase.execute(await getCar())
    await expect(createCarUseCase.execute(await getCar())).rejects.toEqual(
      new AppError('License plate already being used!')
    )
  })

  it('should have cars created with available as true by default', async () => {
    const { available } = await createCarUseCase.execute(await getCar())
    expect(available).toBe(true)
  })
})
