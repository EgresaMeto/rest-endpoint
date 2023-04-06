import request from 'supertest'
import { app } from './index'


describe('GET /persons', () => {
  it('should respond with a 200 status code and an array of IPerson objects when a valid search query is provided', async () => {
    const res = await request(app).get('/persons?q=luke')
    expect(res.status).toEqual(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
    expect(res.body[0]).toHaveProperty('name', 'Luke Skywalker')
  })

  it('should respond with a 404 status code and an error message when an invalid search query is provided', async () => {
    const res = await request(app).get('/persons?q=invalid')
    expect(res.status).toEqual(404)
    expect(res.body).toHaveProperty('message', 'Not Found')
  })
})

describe('GET /persons/:id', () => {
  it('should respond with a 200 status code and an IPerson object when a valid id is provided', async () => {
    const res = await request(app).get('/persons/1')
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('name', 'Luke Skywalker')
  })

  it('should respond with a 404 status code and an error message when an invalid id is provided', async () => {
    const res = await request(app).get('/persons/999')
    expect(res.status).toEqual(404)
    expect(res.body).toHaveProperty('message', 'Not Found')
  })
})

// Integration tests
describe('Integration tests', () => {
  it('should return the correct IPerson objects when a valid search query is provided', async () => {
    const res = await request(app).get('/persons?q=skywalker')
    expect(res.status).toEqual(200)
    expect(res.body.length).toBe(3)
    expect(res.body[0]).toHaveProperty('name', 'Luke Skywalker')
    expect(res.body[1]).toHaveProperty('name', 'Anakin Skywalker')
  })

  it('should return the correct IPerson object when a valid id is provided', async () => {
    const res = await request(app).get('/persons/4')
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('name', 'Darth Vader')
  })
})
