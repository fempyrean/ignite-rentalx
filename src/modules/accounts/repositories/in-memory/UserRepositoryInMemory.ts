import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { ICreateUserDTO } from '../../dto/ICreateUserDTO'
import { IUserRepository } from '../IUserRepository'

class UserRepositoryInMemory implements IUserRepository {
  users: User[] = []

  async create(data: ICreateUserDTO): Promise<void> {
    const user = new User()
    Object.assign(user, { ...data })
    this.users.push(user)
  }
  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email)
    return user
  }
  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id)
    return user
  }
}

export { UserRepositoryInMemory }
