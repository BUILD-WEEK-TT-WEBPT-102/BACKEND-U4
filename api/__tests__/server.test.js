const server = require('../server')
const db = require('../data/db-config')
const supertest = require('supertest')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async (done) => {
  await db.destroy()
  done()
})

it('sanity check', () => {
  expect(true).not.toBe(false)
})

describe('server.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
  it('can make a successful request for users', async ()=>{
    const res = await supertest(server).get('/users')
      expect(res.statusCode).toBe(200)
      expect(res.type).toBe('application/json')
  })
  it('can grab a specific user', async() =>{
    const res = await supertest(server).get('/users/1')
      expect(res.statusCode).toBe(200)
      expect(res.type).toBe('application/json')
  })
  it('can add a new user', async()=>{
    const res = await supertest(server)
    .post('/users')
    .send({
      username: "testman",
      password: "abc123",
      phoneNumber: "8008675309"
    })
  })
  it('can add a new user & return new user', async()=>{
    const res = await supertest(server)
    .post('/users')
    .send({
      username: "testman",
      password: "abc123",
      phoneNumber: "8008675309"
    })
    expect(res.statusCode).toBe(201)
    expect(res.type).toBe('application/json')
    expect(res.body.username).toBe('testman')
    expect(res.body.password).toBe('abc123')
    expect(res.body.phoneNumber).toBe("8008675309")
  })
})
