import { AppError } from '../../../../shared/errors/AppError'
import { CategoryRepositoryInMemory } from '../../repositories/in-memory/CategoryRepositoryInMemory'
import { CarRepositoryInMemory } from '../../repositories/in-memory/CarRepositoryInMemory'
import { SpecificationRepositoryInMemory } from '../../repositories/in-memory/SpecificationRepositoryInMemory'
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

let categoryRepositoryInMemory: CategoryRepositoryInMemory
let carRepositoryInMemory: CarRepositoryInMemory
let specificationRepositoryInMemory: SpecificationRepositoryInMemory
let createCarSpecificationUseCase: CreateCarSpecificationUseCase

const getSpecification = () => ({
  name: 'any_name',
  description: 'any_description'
})

const getCar = async () => {
  const category = await categoryRepositoryInMemory.create(
    'any_category',
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

describe('Create car specification', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory()
    carRepositoryInMemory = new CarRepositoryInMemory()
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carRepositoryInMemory,
      specificationRepositoryInMemory
    )
  })

  it('should not be able to add a new specification to a non-existent car', () => {
    expect(async () => {
      const car_id = 'invalid_id'
      const specifications_id = [
        'invalid_spec1',
        'invalid_spec2',
        'invalid_spec3'
      ]
      await createCarSpecificationUseCase.execute({ car_id, specifications_id })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to add a new specification to a car', async () => {
    const car = await carRepositoryInMemory.create(await getCar())
    const specifications_id = [
      'invalid_spec1',
      'invalid_spec2',
      'invalid_spec3'
    ]
    const specification = await specificationRepositoryInMemory.create(
      getSpecification()
    )
    const specification2 = await specificationRepositoryInMemory.create({
      ...getSpecification(),
      name: 'any_specification_2'
    })
    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [String(specification.id), String(specification2.id)]
    })
  })
})
