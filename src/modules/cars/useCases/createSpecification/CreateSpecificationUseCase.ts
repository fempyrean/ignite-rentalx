import { ISpecificationRepository } from '../../repositories/ISpecificationRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  name: string
  description: string
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specification = await this.specificationRepository.findByName(name)
    if (specification) throw new AppError('Specification already exists')
    await this.specificationRepository.create({ name, description })
  }
}

export { CreateSpecificationUseCase }
