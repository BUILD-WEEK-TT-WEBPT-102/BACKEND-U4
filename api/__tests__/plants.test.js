const server = require('../server')
const db = require('../data/db-config')
const supertest = require('supertest')

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW4iOiIyNGgiLCJzdWNjZXNzZnVsTG9naW4iOnRydWUsImlhdCI6MTYxNzIzNDU4OX0.BY2V1u1SeGAf5oomw5RD_MoXIS6qC9h6GJhFqOQMHY0"

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

describe('Endpoint Testing -- /API/Plants',()=>{
	
    it('returns plants joined with users and species', async()=>{
        const testRes = await supertest(server).get('/api/plants')
        expect(testRes.status).toBe(200)
        expect(testRes.type).toBe('application/json')
        expect(testRes.body[1].nickname).toBe('Gillyweed')
		expect(testRes.body[1].species_type).toBe("Conifers, cycads & Allies")
		expect(testRes.body[1].user_id).toBe(1)
    })
	it('returns plants with properly joined tables', async()=>{
        const testRes = await supertest(server).get('/api/plants/1')
        expect(testRes.status).toBe(200)
        expect(testRes.type).toBe('application/json')
        expect(testRes.body.nickname).toBe('Mandrake Root')
		expect(testRes.body.species).toBe('Flowering Plants')
    })
    it('can add a plant',async()=>{
      	const res = await supertest(server)
			.post('/api/plants')
			.send({
				nickname:"Tre-ent",
				water_frequency: "Hourly",
				species: 'dangerous',
				user_id: 2,
			})
		expect(res.status).toBe(201);
		expect(res.type).toBe('application/json')
		const res2 = await supertest(server).get(`/api/plants/9`)
		expect(res2.body.nickname).toBe('Tre-ent')
    })
	it('can add a plant with a custom species string (no species_id)', async() =>{
		const res = await supertest(server)
			.post('/api/plants')
			.send({
				nickname:"Tre-ent",
				water_frequency: "Hourly",
				user_id: 2,
				species: "dangerous"
			})
			expect(res.status).toBe(201)
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

describe('Error Testing -- /API/Plants', () => {
	it('Can successfully add a plant', async()=>{
		const res = await supertest(server)
			.post('/api/plants')
			.send({
				nickname:"Final Plant!!!!",
				water_frequency: "Once a week",
				species:"testPlant",
				user_id: 1
			})
			// .set(req.headers.Authorization, token)
		expect(res.statusCode).toBe(201)
		expect(res.type).toBe('application/json')
		expect(res.body.nickname).toBe("Final Plant!!!!")
		expect(res.body.water_frequency).toBe("Once a week")
		expect(res.body.species).toBe("testPlant")
		expect(res.body.user_id).toBe(1)
		expect(res.body.username).toBe("abcd1234")
	})
	it(`MW(plantHasContents): No nickname`, async()=>{
		const res = await supertest(server)
			.post('/api/plants')
			.send({
				// nickname:"Final Plant!!!!",
				water_frequency: "Once a week",
				species:"testPlant",
				user_id: 1
			})
		expect(res.statusCode).toBe(404)
		expect(res.type).toBe('application/json')
	})
	it(`MW(plantHasContents): No water_frequency`, async()=>{
		const res = await supertest(server)
			.post('/api/plants')
			.send({
				nickname:"Final Plant!!!!",
				// water_frequency: "Once a week",
				species:"testPlant",
				user_id: 1
			})
		expect(res.statusCode).toBe(404)
		expect(res.type).toBe('application/json')
	})
	it(`MW(plantHasContents): No species`, async()=>{
		const res = await supertest(server)
			.post('/api/plants')
			.send({
				nickname:"Final Plant!!!!",
				water_frequency: "Once a week",
				// species:"testPlant",
				user_id: 1
			})
		expect(res.statusCode).toBe(412)
		expect(res.type).toBe('application/json')
	})
	it(`MW(plantHasContents): No user_id`, async()=>{
		const res = await supertest(server)
			.post('/api/plants')
			.send({
				nickname:"Final Plant!!!!",
				water_frequency: "Once a week",
				species:"testPlant",
				// user_id: 1
			})
		expect(res.statusCode).toBe(404)
		expect(res.type).toBe('application/json')
	})
	it(`MW(typeOf): typeof user_id`, async()=>{
		const res = await supertest(server)
			.post('/api/plants')
			.send({
				nickname:"Final Plant!!!!",
				water_frequency: "Once a week",
				species:"testPlant",
				// user_id: 1
			})
		expect(res.statusCode).toBe(404)
		expect(res.type).toBe('application/json')
	})
	it(`MW(typeOf): typeof nickname`, async()=>{
		const res = await supertest(server)
			.post('/api/plants')
			.send({
				//nickname should be string
				"nickname": 3,
				"water_frequency": "Once a week",
				"species":"testPlant",
				"user_id": 1
			})
		expect(res.statusCode).toBe(409)
		expect(res.type).toBe('application/json')
	})
	it(`MW(typeOf): typeof water_frequency`, async()=>{
		const res = await supertest(server)
			.post('/api/plants')
			.send({
				"nickname": "TestPlant",
				//water_frequency should be string
				"water_frequency": 1,
				"species":"testPlant",
				"user_id": 1
			})
		expect(res.statusCode).toBe(409)
		expect(res.type).toBe('application/json')
	})
	it(`MW(typeOf): typeof species_id`, async()=>{
		const res = await supertest(server)
			.post('/api/plants')
			.send({
				"nickname": "TestPlant",
				"water_frequency": "Once a week",
				//species_id should be a number
				"species":undefined,
				"user_id": 1
			})
		expect(res.statusCode).toBe(412)
		expect(res.type).toBe('application/json')
	})
	it(`MW(typeOf): typeof user_id`, async()=>{
		const res = await supertest(server)
			.post('/api/plants')
			.send({
				"nickname": "TestPlant",
				"water_frequency": "Once a week",
				"species_id": 3,
				//user_id should be a number
				"user_id": "1"
			})
		expect(res.statusCode).toBe(412)
		expect(res.type).toBe('application/json')
	})
})