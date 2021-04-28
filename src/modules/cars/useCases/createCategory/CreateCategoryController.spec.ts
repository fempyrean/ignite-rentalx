import request from 'supertest'
import { Connection } from 'typeorm'
import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'
import { app } from '../../../../shared/infra/http/app'
import { createConnectionPostgres } from '../../../../shared/infra/typeorm'

let connection: Connection

describe('Create category controller', () => {
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

  it('should be able to create a new category', async () => {
    const authResponse = await request(app).post('/auth/sessions').send({
      email: 'bile@rentalx.com.br',
      password: 'biledrogas'
    })
    const { refresh_token } = authResponse.body

    const response = await request(app)
      .post('/category')
      .send({
        name: 'any_name',
        description: 'any_description'
      })
      .set({ Authorization: `Bearer ${refresh_token}` })
    expect(response.status).toBe(201)
  })

  it('should not be able to create a duplicated category', async () => {
    const authResponse = await request(app).post('/auth/sessions').send({
      email: 'bile@rentalx.com.br',
      password: 'biledrogas'
    })
    const { refresh_token } = authResponse.body
    const response = await request(app)
      .post('/category')
      .send({ name: 'any_category_name', description: 'any_description' })
      .set({ Authorization: `Bearer ${refresh_token}` })

    const response2 = await request(app)
      .post('/category')
      .send({ name: 'any_category_name', description: 'any_description' })
      .set({ Authorization: `Bearer ${refresh_token}` })

    expect(response.status).toBe(201)
    expect(response2.status).toBe(400)
  })
})
