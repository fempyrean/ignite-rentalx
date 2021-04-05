import { CategoryRepositoryInMemory } from '../../repositories/in-memory/CategoryRepositoryInMemory'
import { CarRepositoryInMemory } from '../../repositories/in-memory/CarRepositoryInMemory'
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

let categoryRepositoryInMemory: CategoryRepositoryInMemory
let carsRepositoryInMemory: CarRepositoryInMemory
let listAvailableCarsUseCase: ListAvailableCarsUseCase

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

describe('List cars', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory()
    carsRepositoryInMemory = new CarRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    )
  })

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create(await getCar())
    const cars = await listAvailableCarsUseCase.execute({})
    expect(cars).toHaveLength(1)
    expect(cars).toEqual([car])
  })

  // it('should be able to list all available cars by category', async () => {
  //   const car = await carsRepositoryInMemory.create({
  //     ...getCar(),
  //     category_id: 'category'
  //   })
  //   const cars = await listAvailableCarsUseCase.execute({ category_id: 'category' })
  //   console.log('Cars!', cars)
  // })

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      ...(await getCar()),
      brand: 'bile_brand'
    })
    const cars = await listAvailableCarsUseCase.execute({ brand: 'bile_brand' })
    expect(cars).toHaveLength(1)
    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      ...(await getCar()),
      name: 'bile_car'
    })
    const cars = await listAvailableCarsUseCase.execute({ name: 'bile_car' })
    expect(cars).toHaveLength(1)
    expect(cars).toEqual([car])
  })
})
