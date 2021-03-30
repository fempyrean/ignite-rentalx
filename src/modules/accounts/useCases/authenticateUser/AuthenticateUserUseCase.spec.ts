import { AuthenticateUserUseCase } from '../authenticateUser/AuthenticateUserUseCase'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory'
import { ICreateUserDTO } from '../../dto/ICreateUserDTO'
import { AppError } from '../../../../errors/AppError'

const getUserData = () => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  driver_license: 'any_license'
})

describe('Authenticate user', () => {
  let authenticateUserUseCase: AuthenticateUserUseCase
  let createUserUseCase: CreateUserUseCase
  let userRepositoryInMemory: UserRepositoryInMemory

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory
    )
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
  })

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = getUserData()
    await createUserUseCase.execute(user)
    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })
    expect(response).toHaveProperty('token')
  })

  it('should not be able to authenticate a non-existent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'non_existent@mail.com',
        password: 'non_existent_password'
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate an user with incorrect password', () => {
    expect(async () => {
      const user = getUserData()
      await createUserUseCase.execute(user)
      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'invalid_password'
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
