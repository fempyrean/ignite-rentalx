import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsFilters } from '@modules/cars/repositories/ICarsRepository'
import { v4 as uuidV4 } from 'uuid'

class CarRepositoryInMemory implements ICarsRepository {
  private readonly cars: Car[] = []

  async setUnavailable(id: string): Promise<Car> {
    const carIndex = this.cars.findIndex((car) => car.id === id)
    this.cars[carIndex].available = false
    return this.cars[carIndex]
  }

  async setAvailable(id: string): Promise<Car> {
    const carIndex = this.cars.findIndex((car) => car.id === id)
    this.cars[carIndex].available = true
    return this.cars[carIndex]
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car: Car) => car.id === id)
  }

  async findAvailable({
    brand,
    category_id,
    name
  }: ICarsFilters): Promise<Car[]> {
    return this.cars
      .filter((car: Car) => car.available === true)
      .filter(
        (car: Car) =>
          (brand && car.brand === brand) ||
          (category_id && car.category.id === category_id) ||
          (name && car.name === name) ||
          (!brand && !category_id && !name)
      )
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car: Car) => car.license_plate === license_plate)
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category,
    specifications,
    id
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car()
    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category,
      specifications,
      id: id ? id : uuidV4()
    })
    this.cars.push(car)
    return car
  }
}

export { CarRepositoryInMemory }
