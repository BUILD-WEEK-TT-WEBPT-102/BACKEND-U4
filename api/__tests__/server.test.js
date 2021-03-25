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
})
describe('users endpoint testing',()=>{
  it('get all users', async ()=>{
    const res = await supertest(server).get('/api/users')
      expect(res.statusCode).toBe(200)
      expect(res.type).toBe('application/json')
  })
  it('get specific user', async() =>{
    const res = await supertest(server).get('/api/users/1')
      expect(res.statusCode).toBe(200)
      expect(res.type).toBe('application/json')
  })
  it('add new user', async()=>{
    const res = await supertest(server)
    .post('/api/users')
    .send({
      username: "testman",
      password: "abc123",
      phoneNumber: "8008675309"
    })
  })
  it('add new user & return new resource', async()=>{
    const res = await supertest(server)
      .post('/api/users')
      .send({
        username: "machoMan",
        password: "abc123",
        phoneNumber: "8008675309"
      })
    expect(res.status).toBe(201)
    expect(res.type).toBe('application/json')
    expect(res.body.username).toBe('machoMan')
    expect(res.body.phoneNumber).toBe("8008675309")
  })
  it('delete a user', async ()=>{
    const res = await supertest(server).delete('/api/users/1')
    expect(res.statusCode).toBe(204)
    // const res2 = await supertest(server).get('/users/3')
    // expect(res2.statusCode).toBe(404)
  })
})
  
describe('auth endpoint', ()=>{
  it('register adds a user',async ()=>{
    const res = await supertest(server)
      .post('/api/auth/register')
      .send({
        username: "sirTinkles",
        password: "abc123",
        phoneNumber: "8008675309"
      })
    expect(res.statusCode).toBe(201)
    expect(res.type).toBe('application/json')
    expect(res.body.username).toBe('sirTinkles')
    expect(res.body.phoneNumber).toBe('8008675309')
    expect(res.body.user_id).toBeDefined()
  })
  it('registration fails with bad username', async()=>{
    const res = await supertest(server)
      .post('/api/auth/register')
      .send({
        username:123456,
        password: "abc123",
        phoneNumber: "7026817945"
      })
      expect(res.status).toBe(400)
  })
  it('registration fails with bad password', async()=>{
    const res = await supertest(server)
      .post('/api/auth/register')
      .send({
        username:"workingName",
        password: 123456,
        phoneNumber: "workingNumber"
      })
      expect(res.status).toBe(400)
  })
  it('registration fails with bad phoneNumber', async()=>{
    const res = await supertest(server)
      .post('/api/auth/register')
      .send({
        username:"workingName",
        password: "workingPassword",
        phoneNumber:123456,
      })
      expect(res.status).toBe(400)
  })
  it('login passes with fresh user', async()=>{
    const newGuy = await supertest(server)
      .post('/api/auth/register')
      .send({
        username: "sirTinkles",
        password: "abc123",
        phoneNumber: "8008675309"
      })
    expect(newGuy.statusCode).toBe(201)
    expect(newGuy.type).toBe('application/json')
    expect(newGuy.body.username).toBe('sirTinkles')
    expect(newGuy.body.phoneNumber).toBe('8008675309')
    expect(newGuy.body.user_id).toBeDefined()

    const res = await supertest(server)
      .post('/api/auth/login')
      .send({
        username:'sirTinkles',
        password:'abc123'
      })
      expect(res.status).toBe(200)
      expect(res.type).toBe('application/json')
      // expect(res.token).toBeDefined()   
  })
})
  

