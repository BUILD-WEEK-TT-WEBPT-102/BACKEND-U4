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
    it('returns plants with properly joined tables', async()=>{
        const testRes = await supertest(server).get('/api/plants')
        
        expect(testRes.status).toBe(200)
        expect(testRes.type).toBe('application/json')
        expect(testRes.body[1].nickname).toBe('Gillyweed')
    })
	it('returns plants with properly joined tables', async()=>{
        const testRes = await supertest(server).get('/api/plants/1')
        
        expect(testRes.status).toBe(200)
        expect(testRes.type).toBe('application/json')
		console.log('result.body', testRes.body)
        expect(testRes.body.nickname).toBe('Mandrake Root')
		expect(testRes.body.species).toBe('Conifers, cycads & Allies')
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
	it('can edit a plant', async()=>{
		const res = await supertest(server)
			.put('/api/plants/1')
			.send({
			nickname: "FakePlant",
			water_frequency: "Never - It's FAKE"
			})

		expect(res.status).toBe(202)
		expect(res.type).toBe('application/json')
		expect(res.body.nickname).toBe('FakePlant')
		expect(res.body.water_frequency).toBe("Never - It's FAKE")
	})
})
/*
List of Items to check
[]Returns Error on: New Plant with missing items (nickname, water_frequency, species_id, species_type)
[]Returns Error on: New Plant with wrong types (S,S,N,N)
[]Returns Error on: New plant with non-existent species ID / User ID
[]Returns Error on: Edit plant with missing items (nickname, water_frequency)
[]Returns Error on: Edit plant with wrong types (S, S)
[]Return Error on: Edit plant with non-existent User ID
*/

describe('/plants error handling', () => {
	it('doesnt break', async()=>{
		const res = await supertest(server)
			.post('/api/plants')
			.send({
				"nickname":"Final Plant!!!!",
				"water_frequency": "Once a week",
				"species_id": 3,
				"user_id": 1
			})
		expect(res.statusCode).toBe(201)
		expect(res.type).toBe('application/json')
		expect(res.body.nickname).toBe("Final Plant!!!!")
		expect(res.body.water_frequency).toBe("Once a week")
		expect(res.body.species).toBe("Ferns & Fern Allies")
		expect(res.body.species_id).toBe(3)
		expect(res.body.user_id).toBe(1)
		expect(res.body.username).toBe("abcd1234")
	})
	it(`404: No nickname`, async()=>{
		const res = await supertest(server)
			.post('/api/plants')
			.send({
				// "nickname":"TestPlant"
				"water_frequency": "Once a week",
				"species_id": 3,
				"user_id": 1
			})
		expect(res.statusCode).toBe(404)
		expect(res.type).toBe('application/json')
	})
	it(`404: No water_frequency`, async()=>{
		const res = await supertest(server)
			.post('/api/plants')
			.send({
				"nickname": "TestPlant",
				// "water_frequency": "Once a week",
				"species_id": 3,
				"user_id": 1
			})
		expect(res.statusCode).toBe(404)
		expect(res.type).toBe('application/json')
	})
	it(`404: No species_id`, async()=>{
		const res = await supertest(server)
			.post('/api/plants')
			.send({
				"nickname": "TestPlant",
				"water_frequency": "Once a week",
				// "species_id": 3,
				"user_id": 1
			})
		expect(res.statusCode).toBe(404)
		expect(res.type).toBe('application/json')
	})
	it(`404: No user_id`, async()=>{
		const res = await supertest(server)
			.post('/api/plants')
			.send({
				"nickname": "TestPlant",
				"water_frequency": "Once a week",
				"species_id": 3,
				// "user_id": 1
			})
		expect(res.statusCode).toBe(404)
		expect(res.type).toBe('application/json')
	})
	it(`404: typeof user_id`, async()=>{
		const res = await supertest(server)
			.post('/api/plants')
			.send({
				"nickname": "TestPlant",
				"water_frequency": "Once a week",
				"species_id": 3,
				// "user_id": 1
			})
		expect(res.statusCode).toBe(404)
		expect(res.type).toBe('application/json')
	})
	it(`404: typeof nickname`, async()=>{
		const res = await supertest(server)
			.post('/api/plants')
			.send({
				//nickname should be string
				"nickname": 3,
				"water_frequency": "Once a week",
				"species_id": 3,
				"user_id": 1
			})
		expect(res.statusCode).toBe(409)
		expect(res.type).toBe('application/json')
	})
	it(`404: typeof water_frequency`, async()=>{
		const res = await supertest(server)
			.post('/api/plants')
			.send({
				"nickname": "TestPlant",
				//water_frequency should be string
				"water_frequency": 1,
				"species_id": 3,
				"user_id": 1
			})
		expect(res.statusCode).toBe(409)
		expect(res.type).toBe('application/json')
	})
	it(`404: typeof species_id`, async()=>{
		const res = await supertest(server)
			.post('/api/plants')
			.send({
				"nickname": "TestPlant",
				"water_frequency": "Once a week",
				//species_id should be a number
				"species_id": "3",
				"user_id": 1
			})
		expect(res.statusCode).toBe(409)
		expect(res.type).toBe('application/json')
	})
	it(`404: typeof species_id`, async()=>{
		const res = await supertest(server)
			.post('/api/plants')
			.send({
				"nickname": "TestPlant",
				"water_frequency": "Once a week",
				"species_id": 3,
				//user_id should be a number
				"user_id": "1"
			})
		expect(res.statusCode).toBe(409)
		expect(res.type).toBe('application/json')
	})
})