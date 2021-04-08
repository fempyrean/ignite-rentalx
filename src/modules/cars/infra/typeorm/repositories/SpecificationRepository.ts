import { getRepository, Repository } from 'typeorm'
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'
import {
  ICreateSpecificationDTO,
  ISpecificationRepository
} from '@modules/cars/repositories/ISpecificationRepository'

class SpecificationRepository implements ISpecificationRepository {
  private readonly repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return await this.repository.findByIds(ids)
  }
  async findByName(name: string): Promise<Specification> {
    const specRepo = getRepository(Specification)
    const specification = await specRepo.findOne({ name })
    return specification
  }
  async create({
    name,
    description
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specRepo = getRepository(Specification)
    const specification = specRepo.create({ name, description })
    await specRepo.save(specification)
    return specification
  }
}

export { SpecificationRepository }
