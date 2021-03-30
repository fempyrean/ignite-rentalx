import { AuthenticateUserUseCase } from '../authenticateUser/AuthenticateUserUseCase'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory'
import { ICreateUserDTO } from '../../dto/ICreateUserDTO'

describe('Authenticate user', () => {
  let authenticateUserUseCase: AuthenticateUserUseCase
  let createUserUseCase: CreateUserUseCase
  let userRepositoryInMemory: UserRepositoryInMemory

  beforeEach(() => {
    const userRepositoryInMemory = new UserRepositoryInMemory()
    const authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory
    )
    const createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
  })

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      driver_license: 'any_license'
    }
    await createUserUseCase.execute(user)
    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })
    console.log(response)
  })
})
