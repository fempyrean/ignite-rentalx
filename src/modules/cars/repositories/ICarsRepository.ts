import { ICreateCarDTO } from '../dtos/ICreateCarDTO'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'

export interface ICarsFilters {
  brand?: string
  category_id?: string
  name?: string
}

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>
  findByLicensePlate(license_plate: string): Promise<Car>
  findById(id: string): Promise<Car>
  findAvailable(data: ICarsFilters): Promise<Car[]>
}

export { ICarsRepository }
