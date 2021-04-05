import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { getRepository, Repository } from 'typeorm'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsFilters } from '@modules/cars/repositories/ICarsRepository'

class CarRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async findById(id: string): Promise<Car> {
    const car = this.repository.findOne(id)
    return car
  }
  async findAvailable({
    brand,
    category_id,
    name
  }: ICarsFilters): Promise<Car[]> {
    const query = this.repository
      .createQueryBuilder('car')
      .leftJoinAndSelect('car.category', 'category')
      .where('car.available = :available', { available: true })

    if (brand || name || category_id) {
      query.andWhere(
        '(car.brand ILIKE :brand OR car.category_id = :category_id OR car.name ILIKE :name)',
        {
          brand: `%${brand}%`,
          category_id,
          name: `%${name}%`
        }
      )
    }
    return await query.getMany()
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    return await this.repository.findOne({ license_plate })
  }
  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category,
    specifications
  }: ICreateCarDTO): Promise<Car> {
    const car = await this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category,
      specifications
    })

    await this.repository.save(car)

    return car
  }
}

export { CarRepository }
