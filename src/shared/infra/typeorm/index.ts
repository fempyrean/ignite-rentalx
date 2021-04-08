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

export const createConnectionPostgres = async (
  host = 'localhost'
): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()
  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
      database:
        process.env.NODE_ENV === 'test'
          ? 'rentalx_test'
          : defaultOptions.database
    })
  )
}
