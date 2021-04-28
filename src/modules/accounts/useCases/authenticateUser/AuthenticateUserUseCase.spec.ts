import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory'
import { UserTokenRepositoryInMemory } from '../../repositories/in-memory/UserTokenRepositoryInMemory'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from '../authenticateUser/AuthenticateUserUseCase'
import { ICreateUserDTO } from '../../dto/ICreateUserDTO'
import { AppError } from '../../../../shared/errors/AppError'
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'
import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider'

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
  let userTokenRepositoryInMemory: UserTokenRepositoryInMemory
  let dateProvider: IDateProvider

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    userTokenRepositoryInMemory = new UserTokenRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
      userTokenRepositoryInMemory,
      dateProvider
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

  it('should not be able to authenticate a non-existent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'non_existent@mail.com',
        password: 'non_existent_password'
      })
    ).rejects.toEqual(new AppError('Could not find user'))
  })

  it('should not be able to authenticate an user with incorrect password', async () => {
    const user = getUserData()
    await createUserUseCase.execute(user)
    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'invalid_password'
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'))
  })
})
