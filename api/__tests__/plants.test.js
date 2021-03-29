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

describe('tests the plant endpoint',()=>{
    it('returns a plant with properly joined tables', async()=>{
        const testRes = await supertest(server).get('/api/plants')
        
        expect(testRes.status).toBe(200)
        expect(testRes.type).toBe('application/json')
        expect(testRes.body[0].nickname).toBe('Mandrake Root')
    })
    it('can add a plant',async()=>{
      const res = await supertest(server)
        .post('/api/plants')
        .send({
			nickname:"Tre-ent",
			water_frequency: "Hourly",
			species_id: 2,
			user_id: 2
		})
		expect(res.status).toBe(201);
		expect(res.type).toBe('application/json')
    })
	it('can accept a string value for species', async() => {
		const res = await supertest(server)
        .post('/api/plants')
        .send({
			nickname:"Tre-ent",
			water_frequency: "Hourly",
			species_id: "New Value",
			user_id: 2
		})
		expect(res.status).toBe(201);
		expect(res.type).toBe('application/json')
	})
})