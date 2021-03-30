import { ICategoryRepository } from '../../repositories/ICategoryRepository'
import { AppError } from '../../../../errors/AppError'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  name: string
  description: string
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const category = await this.categoryRepository.findByName(name)
    if (category) throw new AppError('Category already exists!')
    await this.categoryRepository.create(name, description)
  }
}

export { CreateCategoryUseCase }
