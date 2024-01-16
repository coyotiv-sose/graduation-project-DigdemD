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

  test('should  update status of an account', async () => {
    const charles = await request(app).post('/users').send({
      name: 'Charles',
      surname: 'Darwin',
    })
    const accountOfCharlesNo1 = await request(app).post('/accounts').send({
      ownerId: charles.body._id,
      currency: 'EUR',
    })
    const accountOfCharlesNo2 = await request(app).post('/accounts').send({
      ownerId: charles.body._id,
      currency: 'USD',
    })

    const expectedOutput = { _id: accountOfCharlesNo1.body._id, owner: charles.body, status: 'Passive' }
    const response = await request(app)
      .put(`/accounts/${accountOfCharlesNo1.body._id}`)
      .send({
        newValues: { status: 'Passive' },
      })
    expect(response.body.status).toBe(expectedOutput.status)
  })
  test('should  manage external balance  transfer', async () => {
    const charles = await request(app).post('/users').send({
      name: 'Charles',
      surname: 'Darwin',
    })
    const accountOfCharlesNo1 = await request(app).post('/accounts').send({
      ownerId: charles.body._id,
      currency: 'EUR',
    })
    const accountOfCharlesNo2 = await request(app).post('/accounts').send({
      ownerId: charles.body._id,
      currency: 'USD',
    })

    const expectedOutput = { _id: accountOfCharlesNo1.body._id, owner: charles.body, balance: 500000 }
    const response = await request(app).post(`/users/${charles.body._id}/transfers`).send({
      senderAccountId: null,
      receiverAccountId: accountOfCharlesNo1.body._id,
      amount: 500000,
    })

    expect(response.body.transferredAmount).toBe(expectedOutput.balance)
  })
  test('should  create a new Trade', async () => {
    const charles = await request(app).post('/users').send({
      name: 'Charles',
      surname: 'Darwin',
    })
    const accountOfCharlesNo1 = await request(app).post('/accounts').send({
      ownerId: charles.body._id,
      currency: 'EUR',
    })
    const accountOfCharlesNo2 = await request(app).post('/accounts').send({
      ownerId: charles.body._id,
      currency: 'USD',
    })

    const externalTransfer = await request(app).post(`/users/${charles.body._id}/transfers`).send({
      senderAccountId: null,
      receiverAccountId: accountOfCharlesNo1.body._id,
      amount: 500000,
    })
    const expectedOutput = { currencyPair: 'EURUSD', amount: 3000 }
    const response = await request(app).post(`/trades/${charles.body._id}`).send({
      currencyPair: 'EURUSD',
      buySellFlag: 'Sell',
      executionRate: '2',
      amount: 3000,
      valueDate: '01.05.2024',
      buyAccountId: accountOfCharlesNo2.body._id,
      sellAccountId: accountOfCharlesNo1.body._id,
    })
    expect(response.body).toMatchObject(expectedOutput)
  })
})
