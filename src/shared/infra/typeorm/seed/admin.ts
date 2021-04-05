import { createConnectionPostgres } from '../'
import { v4 as uuidV4 } from 'uuid'
import { hash } from 'bcrypt'

async function create() {
  const connection = await createConnectionPostgres('localhost')

  const id = uuidV4()
  const password = await hash('biledrogas', 8)

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values ('${id}', 'Admin', 'bile@rentalx.com.br', '${password}', true, 'NOW()', 'B1L3C0RN0')
    `
  )

  await connection.close()
}

create().then(() => console.log('Successfully created a new admin user!'))
