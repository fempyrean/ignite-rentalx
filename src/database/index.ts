import { create } from 'domain'
import {
  Connection,
  createConnection,
  getConnection,
  getConnectionOptions
} from 'typeorm'

export const createConnectionSQLite = async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()
  return createConnection(
    Object.assign(defaultOptions, {
      database:
        process.env.NODE_ENV === 'test'
          ? './src/database/database.test.sqlite'
          : defaultOptions.database
    })
  )
}

export const createConnectionPostgres = async (): Promise<Connection> => {
  return createConnection()
}
