import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'
import { Category } from '@modules/cars/infra/typeorm/entities/Category'

interface ICreateCarDTO {
  name: string
  description: string
  daily_rate: number
  license_plate: string
  fine_amount: number
  brand: string
  category: Category
  specifications?: Specification[]
}

export { ICreateCarDTO }
