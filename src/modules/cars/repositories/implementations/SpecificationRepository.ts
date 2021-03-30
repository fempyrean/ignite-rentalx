import { getRepository } from 'typeorm'
import { Specification } from '../../../../entities/Specification'
import {
  ICreateSpecificationDTO,
  ISpecificationRepository
} from '../ISpecificationRepository'

class SpecificationRepository implements ISpecificationRepository {
  async findByName(name: string): Promise<Specification> {
    const specRepo = getRepository(Specification)
    const specification = await specRepo.findOne({ name })
    return specification
  }
  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specRepo = getRepository(Specification)
    const specification = specRepo.create({ name, description })
    await specRepo.save(specification)
  }
}

export { SpecificationRepository }
