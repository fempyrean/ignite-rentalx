import { getRepository, Repository } from 'typeorm'
import { Category } from '../../../../entities/Category'
import { ICategoryRepository } from '../ICategoryRepository'

class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = getRepository(Category)
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name })
    return category
  }
  async list(): Promise<Category[]> {
    const categories = await this.repository.find()
    return categories
  }
  async create(name: string, description: string): Promise<void> {
    const category = this.repository.create({ name, description })
    await this.repository.save(category)
  }
}

export { CategoryRepository }
