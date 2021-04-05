import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'
import {
  ICreateSpecificationDTO,
  ISpecificationRepository
} from '../ISpecificationRepository'

class SpecificationRepositoryInMemory implements ISpecificationRepository {
  private readonly specifications: Specification[] = []

  async create({
    name,
    description
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification()
    specification.name = name
    specification.description = description
    this.specifications.push(specification)
    return specification
  }
  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name
    )
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    return (
      this,
      this.specifications.filter((specification) =>
        ids.includes(specification.id)
      )
    )
  }
}
export { SpecificationRepositoryInMemory }
