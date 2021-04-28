import { IUserRepository } from '../../repositories/IUserRepository'
import { IUserTokenRepository } from '../../repositories/IUserTokenRepository'
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'
import { IMailProvider } from '../../../../shared/container/providers/MailProvider/IMailProvider'
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory'
import { UserTokenRepositoryInMemory } from '../../repositories/in-memory/UserTokenRepositoryInMemory'
import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { EtherealMailProvider } from '../../../../shared/container/providers/MailProvider/implementations/EtherealMailProvider'
import { MailProviderInMemory } from '../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory'
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase'
import { AppError } from '../../../../shared/errors/AppError'

let sendForgotPasswordMaiUseCase: SendForgotPasswordMailUseCase
let userRepositoryInMemory: IUserRepository
let userTokenRepositoryInMemory: IUserTokenRepository
let dateProvider: IDateProvider
let mailProvider: IMailProvider

const getUser = () => ({
  driver_license: '151356633',
  email: 'tafcakko@icotoso.sz',
  name: 'Hannah Medina',
  password: 'any_password'
})

describe('Send forgot password mail', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    userTokenRepositoryInMemory = new UserTokenRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    mailProvider = new MailProviderInMemory()
    sendForgotPasswordMaiUseCase = new SendForgotPasswordMailUseCase(
      userRepositoryInMemory,
      userTokenRepositoryInMemory,
      dateProvider,
      mailProvider
    )
  })

  it('should be able to send a forgot password mail to user', async () => {
    const user = getUser()
    await userRepositoryInMemory.create(user)
    const sendMail = spyOn(mailProvider, 'sendMail')

    await sendForgotPasswordMaiUseCase.execute(user.email)

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to send an email if user doest not exist', async () => {
    await expect(
      sendForgotPasswordMaiUseCase.execute('invalid_email@mail.com')
    ).rejects.toEqual(new AppError('Could not find user'))
  })

  it('should be able to create an users token', async () => {
    const user = getUser()
    await userRepositoryInMemory.create(user)
    const generateTokenMail = spyOn(userTokenRepositoryInMemory, 'create')

    await sendForgotPasswordMaiUseCase.execute(user.email)
    expect(generateTokenMail).toHaveBeenCalled()
  })
})
