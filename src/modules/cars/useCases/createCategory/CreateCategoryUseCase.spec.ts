import { CategoryRepositoryInMemory } from '../../repositories/in-memory/CategoryRepositoryInMemory'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'
import { AppError } from '../../../../shared/errors/AppError'

let createCategoryUseCase: CreateCategoryUseCase
let categoryRepositoryInMemory: CategoryRepositoryInMemory

describe('Create category', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(
      categoryRepositoryInMemory
    )
  })

  it('should be able to create a new category', async () => {
    const newCategory = {
      name: 'any_name',
      description: 'any_description'
    }
    await createCategoryUseCase.execute(newCategory)
    const category = await categoryRepositoryInMemory.findByName('any_name')
    expect(category).toHaveProperty('id')
  })

  it('should not be able create a new category with an existing name', async () => {
    expect(async () => {
      const newCategory = {
        name: 'any_name',
        description: 'any_description'
      }

      await createCategoryUseCase.execute(newCategory)
      await createCategoryUseCase.execute(newCategory)
    }).rejects.toBeInstanceOf(AppError)
  })
})
