import { Category } from '@modules/cars/infra/typeorm/entities/Category'

interface ICategoryRepository {
  findByName(name: string): Promise<Category>
  list(): Promise<Category[]>
  create(name: string, description: string): Promise<Category>
}

export { ICategoryRepository }
