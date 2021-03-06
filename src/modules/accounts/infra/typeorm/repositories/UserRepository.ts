import { getRepository, Repository } from 'typeorm'
import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository'
import { ICreateUserDTO } from '@modules/accounts/dto/ICreateUserDTO'

class UserRepository implements IUserRepository {
  private readonly repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id)
    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { email }
    })
    return user
  }

  async create({
    name,
    email,
    driver_license,
    password,
    id,
    avatar
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      id,
      avatar
    })
    await this.repository.save(user)
  }
}

export { UserRepository }
