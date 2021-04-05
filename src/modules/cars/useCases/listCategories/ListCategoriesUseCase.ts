import { ICategoryRepository } from '../../repositories/ICategoryRepository'
import { Category } from '@modules/cars/infra/typeorm/entities/Category'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoriesRepository: ICategoryRepository
  ) {}

  async execute(): Promise<Category[]> {
    const list = await this.categoriesRepository.list()
    return list
  }
}

export { ListCategoriesUseCase }
