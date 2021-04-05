import { getRepository, Repository } from 'typeorm'
import { Category } from '@modules/cars/infra/typeorm/entities/Category'
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository'

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
  async create(name: string, description: string): Promise<Category> {
    const category = this.repository.create({ name, description })
    await this.repository.save(category)
    return category
  }
}

export { CategoryRepository }
