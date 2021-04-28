import { container } from 'tsyringe'
import { IDateProvider } from './DateProvider/IDateProvider'
import { IMailProvider } from './MailProvider/IMailProvider'
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider'
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider'
import { IStorageProvider } from './StorageProvider/IStorageProvider'
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider'
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider'

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider)
container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider()
)

const storage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  storage[process.env.storage]
)
