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
      surname: 'Ercumen',
    })
    const expectedOutput = [mete.body, sahika.body]

    const response = await request(app).get('/users').expect(200)

    expect(response.body.length).toBe(2)

    expect(response.body).toMatchObject(expectedOutput)
  })
  //user create
  test('Test of user creation', async () => {
    const response = await request(app).post('/users').send({
      name: 'Mete',
      surname: 'Gazoz',
    })

    expect(response.body.name).toBe('Mete')
  })
  //account create
  test('should create an account', async () => {
    const mete = await request(app).post('/users').send({
      name: 'Mete',
      surname: 'Gazoz',
    })
    const expectedOutput = { owner: mete.body, currency: 'EUR', balance: 0 }

    const response = await request(app).post('/accounts').send({
      ownerId: mete.body._id,
      currency: 'EUR',
    })

    expect(response.body).toMatchObject(expectedOutput)
  })

  // test('Test of update account', async () => {
  //   const response = await request(app).put('/accounts').send({
  //     status: 'Passive',
  //     name: 'Hedge Account',
  //   })

  //   expect(response.body.name).toBe('Mete')
  // })
})
