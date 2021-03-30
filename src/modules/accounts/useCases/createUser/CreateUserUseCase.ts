import { inject, injectable } from 'tsyringe'
import { ICreateUserDTO } from '../../dto/ICreateUserDTO'
import { IUserRepository } from '../../repositories/IUserRepository'
import { AppError } from '../../../../errors/AppError'
import { hash } from 'bcrypt'

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: IUserRepository
  ) {}

  async execute({
    name,
    email,
    driver_license,
    password
  }: ICreateUserDTO): Promise<void> {
    const user = await this.userRepository.findByEmail(email)
    if (user) throw new AppError('User already exists')
    const passwordHash = await hash(password, 8)

    await this.userRepository.create({
      name,
      email,
      driver_license,
      password: passwordHash
    })
  }
}

export { CreateUserUseCase }
