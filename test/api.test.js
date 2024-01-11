const request = require('supertest')
const app = require('../src/app')

describe('Test the api', () => {
  beforeEach(async () => {
    await request(app).delete('/db')
  })

  test('Return all users from my app successfully', async () => {
    const mete = await request(app).post('/users').send({
      name: 'Mete',
      surname: 'Gazoz',
    })
    const sahika = await request(app).post('/users').send({
      name: 'Sahika',
      surname: 'Gazoz',
    })
    const expectedOutput = [mete.body, sahika.body]

    const response = await request(app).get('/users').expect(200)

    expect(response.body.length).toBe(2)

    expect(response.body).toMatchObject(expectedOutput)
  })

  test('Test of user creation', async () => {
    const response = await request(app).post('/users').send({
      name: 'Mete',
      surname: 'Gazoz',
    })

    expect(response.body.name).toBe('Mete')
  })
})
