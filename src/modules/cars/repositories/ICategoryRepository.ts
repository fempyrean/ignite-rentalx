import { Category } from '../../../entities/Category'

interface ICategoryRepository {
  findByName(name: string): Promise<Category>
  list(): Promise<Category[]>
  create(name: string, description: string): Promise<void>
}

export { ICategoryRepository }
