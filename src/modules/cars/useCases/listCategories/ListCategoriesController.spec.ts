import request from 'supertest'
import { Connection } from 'typeorm'
import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'
import { app } from '../../../../shared/infra/http/app'
import { createConnectionPostgres } from '../../../../shared/infra/typeorm'

let connection: Connection

describe('List Categories Controller', () => {
  beforeAll(async () => {
    connection = await createConnectionPostgres()
    await connection.runMigrations()

    const id = uuidV4()
    const password = await hash('biledrogas', 8)
    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values ('${id}', 'Admin', 'bile@rentalx.com.br', '${password}', true, 'NOW()', 'B1L3C0RN0')
    `
    )
  })
  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('should be able to list categories', async () => {
    const authResponse = await request(app).post('/auth/sessions').send({
      email: 'bile@rentalx.com.br',
      password: 'biledrogas'
    })
    const { token } = authResponse.body

    await request(app)
      .post('/category')
      .send({
        name: 'any_name',
        description: 'any_description'
      })
      .set({ Authorization: `Bearer ${token}` })

    const response = await request(app).get('/category')
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
  })
})
